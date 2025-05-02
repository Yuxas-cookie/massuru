import React, { useState } from 'react';
import { WorkoutPlan, DailyWorkout } from '../types';
import { Calendar, Download, Printer, Share2 } from 'lucide-react';
import { ExerciseCard } from './ExerciseCard';

interface WorkoutPlanViewProps {
  plan: WorkoutPlan;
}

export const WorkoutPlanView: React.FC<WorkoutPlanViewProps> = ({ plan }) => {
  const [selectedDay, setSelectedDay] = useState<string>(plan.weeklySchedule[0]?.day || '');

  const selectedDayWorkout = plan.weeklySchedule.find(
    (day) => day.day === selectedDay
  );

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-sm border border-cyan-800/40 rounded-lg overflow-hidden shadow-glow shadow-cyan-900/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 p-4 border-b border-cyan-800/40">
        <h3 className="text-xl font-bold text-cyan-200 flex items-center">
          <Calendar size={20} className="mr-2 text-cyan-400" />
          {plan.title}
        </h3>
        <p className="text-sm text-cyan-300 mt-1">{plan.description}</p>
      </div>

      {/* Weekly Calendar */}
      <div className="p-4 border-b border-cyan-900/40 bg-gray-900/40">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-900">
          {plan.weeklySchedule.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`flex-shrink-0 px-4 py-2 rounded-md text-sm transition-all ${
                selectedDay === day.day
                  ? 'bg-cyan-700/30 border border-cyan-500/50 text-cyan-200 shadow-glow shadow-cyan-900/30'
                  : 'bg-gray-800/50 border border-cyan-900/30 text-gray-300 hover:bg-gray-800 hover:text-cyan-300'
              }`}
            >
              <div className="font-medium">{day.day}</div>
              <div className="text-xs opacity-80">{day.focus}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Details */}
      {selectedDayWorkout && (
        <div className="p-4">
          <h4 className="text-lg font-medium text-purple-300 mb-3">
            {selectedDayWorkout.day}: {selectedDayWorkout.focus}
          </h4>
          
          <div className="space-y-4">
            {selectedDayWorkout.exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-3 bg-gray-900/70 border-t border-cyan-900/40 flex justify-end space-x-2">
        <button className="p-2 rounded-md text-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-300 transition-colors">
          <Download size={18} />
        </button>
        <button className="p-2 rounded-md text-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-300 transition-colors">
          <Share2 size={18} />
        </button>
        <button className="p-2 rounded-md text-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-300 transition-colors">
          <Printer size={18} />
        </button>
      </div>
    </div>
  );
};