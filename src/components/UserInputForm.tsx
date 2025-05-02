import React, { useState } from 'react';
import { ChevronDown, Dumbbell, Target } from 'lucide-react';

export const UserInputForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fitnessGoal: '',
    experienceLevel: '',
    weeklyFrequency: 3,
    sessionDuration: 45,
    targetMuscleGroups: [] as string[],
    availableEquipment: [] as string[],
  });

  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Abs', 'Legs', 'Glutes'
  ];

  const equipment = [
    'Dumbbells', 'Barbell', 'Kettlebells', 'Resistance Bands', 
    'Pull-up Bar', 'Bench', 'Cable Machine', 'Smith Machine', 'None'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, array: string[]) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({ 
        ...prev, 
        [array]: [...prev[array as keyof typeof prev] as string[], value] 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [array]: (prev[array as keyof typeof prev] as string[]).filter(item => item !== value) 
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full max-w-xl bg-gray-900/70 border border-cyan-800/50 rounded-lg overflow-hidden shadow-glow shadow-cyan-900/20">
      <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 p-3 border-b border-cyan-800/40">
        <h3 className="text-lg font-bold text-cyan-200">Personalize Your Workout Plan</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Fitness Goal */}
        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-1">
            Fitness Goal
          </label>
          <div className="relative">
            <select 
              name="fitnessGoal" 
              value={formData.fitnessGoal}
              onChange={handleChange}
              className="w-full p-2 pr-8 bg-gray-800/70 border border-cyan-900/50 rounded text-cyan-100
                        focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                        appearance-none"
              required
            >
              <option value="" disabled>Select your goal</option>
              <option value="build-muscle">Build Muscle</option>
              <option value="lose-weight">Lose Weight</option>
              <option value="improve-strength">Improve Strength</option>
              <option value="increase-endurance">Increase Endurance</option>
              <option value="general-fitness">General Fitness</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-1">
            Experience Level
          </label>
          <div className="relative">
            <select 
              name="experienceLevel" 
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full p-2 pr-8 bg-gray-800/70 border border-cyan-900/50 rounded text-cyan-100
                        focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                        appearance-none"
              required
            >
              <option value="" disabled>Select your level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Frequency and Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-1">
              Days Per Week
            </label>
            <input 
              type="range" 
              name="weeklyFrequency"
              min="1" 
              max="7" 
              value={formData.weeklyFrequency}
              onChange={handleChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-cyan-400 mt-1">
              <span>1</span>
              <span>{formData.weeklyFrequency}</span>
              <span>7</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-1">
              Session Duration (min)
            </label>
            <input 
              type="range" 
              name="sessionDuration"
              min="15" 
              max="120" 
              step="5"
              value={formData.sessionDuration}
              onChange={handleChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-purple-400 mt-1">
              <span>15</span>
              <span>{formData.sessionDuration}</span>
              <span>120</span>
            </div>
          </div>
        </div>
        
        {/* Target Muscle Groups */}
        <div>
          <label className="flex items-center text-sm font-medium text-cyan-300 mb-2">
            <Target size={16} className="mr-1" />
            Target Muscle Groups
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {muscleGroups.map(muscle => (
              <label key={muscle} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-cyan-200 cursor-pointer">
                <input 
                  type="checkbox" 
                  value={muscle}
                  checked={formData.targetMuscleGroups.includes(muscle)}
                  onChange={(e) => handleCheckboxChange(e, 'targetMuscleGroups')}
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded text-cyan-600 focus:ring-cyan-600"
                />
                <span>{muscle}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Available Equipment */}
        <div>
          <label className="flex items-center text-sm font-medium text-cyan-300 mb-2">
            <Dumbbell size={16} className="mr-1" />
            Available Equipment
          </label>
          <div className="grid grid-cols-2 gap-2">
            {equipment.map(item => (
              <label key={item} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-cyan-200 cursor-pointer">
                <input 
                  type="checkbox" 
                  value={item}
                  checked={formData.availableEquipment.includes(item)}
                  onChange={(e) => handleCheckboxChange(e, 'availableEquipment')}
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-600"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-medium rounded
                   hover:from-cyan-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                   shadow-glow shadow-cyan-700/30 transition-all"
        >
          Generate Workout Plan
        </button>
      </form>
    </div>
  );
};