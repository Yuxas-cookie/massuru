import React, { useState, useRef, useEffect } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { LoadingIndicator } from './LoadingIndicator';
import { Message } from '../types';
import { generateUniqueId } from '../utils/helpers';
import { sendMessageToDify } from '../utils/difyApi';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // 初期メッセージを設定
    const initialMessage: Message = {
      id: generateUniqueId(),
      content: `こんにちは！
あなたの一週間の最適なトレーニングをお答えします！
まずは以下の情報を教えて下さい！

性別と年齢を教えてください。
例）男・28歳

身長と体重を教えてください。（cm / kg）
例）175 cm・68 kg`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
    return [initialMessage];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ページ読み込み時にメッセージのみを読み込む（会話IDはリセット）
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    // 会話IDはリセット
    setConversationId(undefined);
    console.log('ページ読み込み: 会話IDをリセット');
  }, []);

  // メッセージのみをローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: generateUniqueId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      console.log('会話IDを送信:', conversationId);
      const difyResponse = await sendMessageToDify(content, conversationId, messages);
      
      // AIのメッセージを追加
      const aiMessage: Message = {
        id: generateUniqueId(),
        content: difyResponse.message.content,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // 会話IDを更新
      if (difyResponse.conversation_id) {
        setConversationId(difyResponse.conversation_id);
        console.log('会話IDを更新:', difyResponse.conversation_id);
      } else {
        console.warn('会話IDが返されませんでした');
      }
      
    } catch (error) {
      console.error('❌ AIレスポンス取得エラー:', error);
      setMessages(prev => [
        ...prev, 
        {
          id: generateUniqueId(),
          content: 'エラーが発生しました。もう一度お試しください。',
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="relative flex-1 overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-900 p-6">
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </div>
        
        {isLoading && (
          <div className="absolute bottom-24 left-6">
            <LoadingIndicator />
          </div>
        )}
        
        <div className="p-4 bg-white border-t border-gray-200">
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};