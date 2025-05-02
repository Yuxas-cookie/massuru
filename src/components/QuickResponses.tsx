import React from 'react';
import { QuickResponseOption } from '../types';
import { Dumbbell, FileWarning as Running, Scale, Home } from 'lucide-react';

interface QuickResponsesProps {
  onSelectResponse: (response: string) => void;
}

export const QuickResponses: React.FC<QuickResponsesProps> = ({ onSelectResponse }) => {
  const quickResponses: (QuickResponseOption & { icon: React.ReactNode; color: string })[] = [
    { 
      id: '1', 
      text: '筋肉をつけたい', 
      action: '筋肉をつけるためのトレーニングプランを教えてください', 
      icon: <Dumbbell className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: '2', 
      text: '減量したい', 
      action: '体重を減らすためのトレーニングプランを教えてください', 
      icon: <Scale className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    },
    { 
      id: '3', 
      text: '自宅トレーニング', 
      action: '道具を使わない自宅でできるトレーニングを教えてください', 
      icon: <Home className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      id: '4', 
      text: '有酸素運動', 
      action: '効果的な有酸素運動のプランを教えてください', 
      icon: <Running className="w-5 h-5" />,
      color: 'from-red-500 to-red-600'
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {quickResponses.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelectResponse(option.action)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-full
            bg-gradient-to-r ${option.color} text-white
            transform hover:scale-105 transition-all duration-300
            shadow-md hover:shadow-lg
          `}
        >
          {option.icon}
          <span>{option.text}</span>
        </button>
      ))}
    </div>
  );
};