import axios from 'axios';
import { Message } from '../types';

// 環境変数からAPIキーとURLを取得
const DIFY_API_KEY = import.meta.env.VITE_DIFY_API_KEY;
const DIFY_API_URL = import.meta.env.VITE_DIFY_API_URL;

// 環境変数が設定されているか確認
if (!DIFY_API_KEY) {
  console.error('❌ DIFY_API_KEYが設定されていません。環境変数を確認してください。');
  throw new Error('DIFY_API_KEYが設定されていません');
}

if (!DIFY_API_URL) {
  console.error('❌ DIFY_API_URLが設定されていません。環境変数を確認してください。');
  throw new Error('DIFY_API_URLが設定されていません');
}

// APIキーの形式を確認
if (!DIFY_API_KEY.startsWith('app-')) {
  console.error('❌ DIFY_API_KEYの形式が正しくありません。app-で始まる必要があります。');
  throw new Error('DIFY_API_KEYの形式が正しくありません');
}

interface DifyMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface DifyResponse {
  message: DifyMessage;
  conversation_id: string;
}

export const sendMessageToDify = async (
  message: string, 
  conversationId?: string,
  messages?: Message[]
): Promise<DifyResponse> => {
  try {
    // 会話履歴をDifyの形式に変換
    const history = messages?.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    // リクエストデータの準備
    const requestData = {
      inputs: {},
      query: message,
      conversation_id: conversationId,
      response_mode: 'streaming',
      user: 'user-123',
      messages: history
    };

    console.log('📤 Difyへのリクエスト:', {
      url: `${DIFY_API_URL}/chat-messages`,
      method: 'POST',
      data: requestData,
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const response = await axios.post(
      `${DIFY_API_URL}/chat-messages`, 
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'text'
      }
    );

    console.log('📥 Difyからのレスポンス:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    });

    // レスポンスデータを解析して会話IDを取得
    let conversation_id = conversationId; // 既存の会話IDを保持
    const lines = response.data.split('\n');
    let content = '';
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          
          // 会話IDを更新（最初に見つかった会話IDを使用）
          if (data.conversation_id && !conversation_id) {
            conversation_id = data.conversation_id;
            console.log('会話IDを抽出:', conversation_id);
          }
          
          if (data.event === 'agent_message' && data.answer) {
            content += data.answer;
          }
        } catch (e) {
          console.error('JSONパースエラー:', e);
        }
      }
    }

    // 会話IDが存在しない場合は、新しい会話として扱う
    if (!conversation_id) {
      console.warn('会話IDが取得できませんでした。新しい会話として扱います。');
    }

    return {
      message: {
        role: 'assistant',
        content: content
      },
      conversation_id: conversation_id || ''
    };
  } catch (error) {
    console.error('❌ Dify APIエラー:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      const errorDetails = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        message: errorMessage
      };
      console.error('エラー詳細:', errorDetails);
      throw new Error(`AIとの通信中にエラーが発生しました: ${errorMessage}`);
    }
    throw new Error('AIとの通信中にエラーが発生しました');
  }
};

export const formatDifyMessage = (difyResponse: DifyResponse): Message => {
  return {
    id: Date.now().toString(),
    content: difyResponse.message.content,
    sender: difyResponse.message.role === 'assistant' ? 'ai' : 'user',
    timestamp: new Date(),
    type: 'text'
  };
};