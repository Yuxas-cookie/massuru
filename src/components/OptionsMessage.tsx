import React from 'react';
import { QuickResponseOption } from '../types';

interface OptionsMessageProps {
  options: QuickResponseOption[];
}

export const OptionsMessage: React.FC<OptionsMessageProps> = ({ options }) => {
  return (
    <div className="w-full bg-gray-900/60 backdrop-blur-sm border border-cyan-800/40 rounded-lg p-3 shadow-glow shadow-cyan-900/20">
      <div className="text-sm text-cyan-300 mb-2">Choose an option:</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            className="px-3 py-1 text-sm bg-gray-800/70 border border-purple-800/50 rounded-md text-purple-300
                     hover:bg-purple-900/20 hover:border-purple-600/50 hover:text-purple-200 transition-all
                     hover:shadow-[0_0_5px_rgba(147,51,234,0.5)]"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};