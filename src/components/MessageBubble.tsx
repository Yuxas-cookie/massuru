import React from 'react';
import { Message } from '../types';
import { formatTime } from '../utils/helpers';
import { Bot, Dumbbell } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <div className={`flex max-w-[80%] ${isAi ? 'items-start' : 'items-end flex-row-reverse'}`}>
      {/* アバター */}
      <div className={`flex-shrink-0 ${isAi ? 'mr-3' : 'ml-3'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isAi 
            ? 'bg-blue-100 text-blue-600 shadow-md' 
            : 'bg-purple-100 text-purple-600 shadow-md'
        }`}>
          {isAi ? <Bot size={20} /> : <Dumbbell size={20} />}
        </div>
      </div>
      
      {/* メッセージ内容 */}
      <div className={`
        relative p-4 rounded-2xl shadow-md
        ${isAi 
          ? 'bg-white border-2 border-blue-100 text-gray-800' 
          : 'bg-purple-600 text-white'
        }
      `}>
        {/* メッセージテキスト */}
        <div className="text-sm">
          {message.content.split('\n').map((text, i) => (
            <React.Fragment key={i}>
              {text}
              {i < message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        {/* タイムスタンプ */}
        <div className={`text-[10px] mt-1 ${isAi ? 'text-gray-500' : 'text-purple-200'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};