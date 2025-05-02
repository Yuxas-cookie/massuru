import React from 'react';
import { Dumbbell } from 'lucide-react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
      <span className="text-sm font-medium text-gray-600">
        トレーニングプランを考えています...
      </span>
      
      <div className="relative">
        <Dumbbell 
          size={20} 
          className="text-blue-500 animate-spin"
          style={{ animationDuration: '3s' }}
        />
      </div>
    </div>
  );
};