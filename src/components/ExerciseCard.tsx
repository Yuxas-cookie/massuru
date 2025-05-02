import React, { useState } from 'react';
import { Exercise } from '../types';
import { Timer, ChevronDown, ChevronUp, Play } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800/70 border border-cyan-900/50 rounded-md overflow-hidden hover:shadow-glow hover:shadow-cyan-900/20 transition-all">
      {/* Basic info row */}
      <div 
        className="p-3 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 mr-3 border border-purple-500/30">
            {exercise.id.charAt(0).toUpperCase()}
          </div>
          <div>
            <h5 className="font-medium text-cyan-200">{exercise.name}</h5>
            <div className="text-xs text-cyan-400">
              {exercise.sets} sets × {exercise.reps} • Rest: {exercise.restTime}s
            </div>
          </div>
        </div>
        <div>
          {expanded ? <ChevronUp size={20} className="text-cyan-400" /> : <ChevronDown size={20} className="text-cyan-400" />}
        </div>
      </div>
      
      {/* Expanded details */}
      {expanded && (
        <div className="p-4 border-t border-cyan-900/40 bg-gray-900/30">
          <p className="text-sm text-gray-300 mb-3">{exercise.description}</p>
          
          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-800/50 p-2 rounded border border-gray-700">
              <div className="text-gray-400 mb-1">Target Muscles</div>
              <div className="text-cyan-300">{exercise.targetMuscle.join(', ')}</div>
            </div>
            <div className="bg-gray-800/50 p-2 rounded border border-gray-700">
              <div className="text-gray-400 mb-1">Level</div>
              <div className="text-cyan-300 capitalize">{exercise.level}</div>
            </div>
            {exercise.recommendedWeight && (
              <div className="bg-gray-800/50 p-2 rounded border border-gray-700">
                <div className="text-gray-400 mb-1">Recommended Weight</div>
                <div className="text-cyan-300">{exercise.recommendedWeight}</div>
              </div>
            )}
            {exercise.tempo && (
              <div className="bg-gray-800/50 p-2 rounded border border-gray-700">
                <div className="text-gray-400 mb-1">Tempo</div>
                <div className="text-cyan-300">{exercise.tempo}</div>
              </div>
            )}
          </div>
          
          {/* Video placeholder */}
          {exercise.videoUrl && (
            <div className="mt-3 relative bg-gray-900 rounded-md h-32 flex items-center justify-center border border-gray-700">
              <div className="text-cyan-500 flex flex-col items-center">
                <Play size={24} />
                <span className="text-xs mt-1">Watch Form Video</span>
              </div>
            </div>
          )}
          
          {/* Timer button */}
          <button className="mt-3 w-full py-2 flex items-center justify-center bg-purple-900/40 text-purple-300 rounded border border-purple-500/30 hover:bg-purple-800/50 transition-all">
            <Timer size={16} className="mr-2" />
            Start Rest Timer ({exercise.restTime}s)
          </button>
        </div>
      )}
    </div>
  );
};