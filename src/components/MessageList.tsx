import React from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { WorkoutPlanView } from './WorkoutPlanView';
import { ExerciseCard } from './ExerciseCard';
import { UserInputForm } from './UserInputForm';
import { OptionsMessage } from './OptionsMessage';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {/* Render different message types */}
          {message.type === 'text' && (
            <MessageBubble message={message} />
          )}
          
          {message.type === 'workout-plan' && message.data && (
            <WorkoutPlanView plan={message.data} />
          )}
          
          {message.type === 'exercise-card' && message.data && (
            <ExerciseCard exercise={message.data} />
          )}
          
          {message.type === 'input-form' && (
            <UserInputForm />
          )}
          
          {message.type === 'options' && message.data && (
            <OptionsMessage options={message.data} />
          )}
        </div>
      ))}
    </div>
  );
};