// Message types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'workout-plan' | 'exercise-card' | 'input-form' | 'options';
  data?: any; // Additional data specific to message type
}

// User profile types
export interface UserProfile {
  fitnessGoal: string;
  experienceLevel: string;
  weeklyFrequency: number;
  sessionDuration: number;
  targetMuscleGroups: string[];
  availableEquipment: string[];
}

// Workout plan types
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // Could be a range or exact number
  restTime: number; // In seconds
  description: string;
  targetMuscle: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  recommendedWeight?: string;
  tempo?: string;
  videoUrl?: string;
}

export interface DailyWorkout {
  day: string;
  focus: string; // e.g., "Upper Body", "Lower Body", "Rest Day"
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  weeklySchedule: DailyWorkout[];
  createdAt: Date;
}

// QuickResponse types
export interface QuickResponseOption {
  id: string;
  text: string;
  action: string;
}