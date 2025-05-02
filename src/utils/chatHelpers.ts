import { Message, WorkoutPlan, Exercise, DailyWorkout } from '../types';
import { generateUniqueId } from './helpers';

// Initial welcome messages
export const initialMessages: Message[] = [
  {
    id: generateUniqueId(),
    content: "Welcome to NeoFit AI! I'm your personal workout assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(),
    type: 'text'
  },
  {
    id: generateUniqueId(),
    content: "I can create personalized workout plans based on your fitness goals, available equipment, and schedule. What are you looking to achieve?",
    sender: 'ai',
    timestamp: new Date(),
    type: 'text'
  }
];

// Simulated AI response generator
export const getAIResponse = async (message: string, previousMessages: Message[]): Promise<Message> => {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Simple logic to determine response type
  if (
    lowerMessage.includes('workout plan') || 
    lowerMessage.includes('plan') || 
    lowerMessage.includes('build muscle') || 
    lowerMessage.includes('lose weight') || 
    lowerMessage.includes('get fit')
  ) {
    // If this is the first detailed request, respond with a form
    const hasForm = previousMessages.some(msg => msg.type === 'input-form');
    
    if (!hasForm) {
      return {
        id: generateUniqueId(),
        content: "Great! To create a personalized workout plan, I need some information about your fitness goals and preferences. Please fill out this form:",
        sender: 'ai',
        timestamp: new Date(),
        type: 'input-form'
      };
    } else {
      // Return a sample workout plan
      return {
        id: generateUniqueId(),
        content: "Based on your goals, I've created a personalized workout plan for you:",
        sender: 'ai',
        timestamp: new Date(),
        type: 'workout-plan',
        data: getSampleWorkoutPlan()
      };
    }
  } 
  else if (lowerMessage.includes('exercise') || lowerMessage.includes('how to do')) {
    // Return a sample exercise card
    return {
      id: generateUniqueId(),
      content: "Here's the exercise you asked about:",
      sender: 'ai',
      timestamp: new Date(),
      type: 'exercise-card',
      data: getSampleExercise()
    };
  }
  else if (lowerMessage.includes('what can you do') || lowerMessage.includes('help')) {
    // Return options
    return {
      id: generateUniqueId(),
      content: "I can help you with various fitness-related tasks. Here are some things you can ask me about:",
      sender: 'ai',
      timestamp: new Date(),
      type: 'options',
      data: [
        { id: '1', text: 'Create a workout plan', action: 'create_plan' },
        { id: '2', text: 'Explain exercises', action: 'explain_exercise' },
        { id: '3', text: 'Nutrition advice', action: 'nutrition' },
        { id: '4', text: 'Fitness tips', action: 'tips' }
      ]
    };
  }
  else {
    // Default text response
    return {
      id: generateUniqueId(),
      content: "I'm here to help with your fitness journey. You can ask me to create a workout plan, explain exercises, or provide fitness tips. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
  }
};

// Sample data generators
const getSampleExercise = (): Exercise => {
  return {
    id: generateUniqueId(),
    name: 'Barbell Bench Press',
    sets: 4,
    reps: '8-10',
    restTime: 90,
    description: 'The bench press is a compound exercise that develops the chest. Lie on a bench, grip the bar with hands just wider than shoulder-width apart, lower the bar to your chest, then press it back up.',
    targetMuscle: ['Chest', 'Shoulders', 'Triceps'],
    level: 'intermediate',
    recommendedWeight: '70% of 1RM',
    tempo: '2-0-2-0',
    videoUrl: 'https://example.com/bench-press-video'
  };
};

const getSampleWorkoutPlan = (): WorkoutPlan => {
  const days: DailyWorkout[] = [
    {
      day: 'Monday',
      focus: 'Chest & Triceps',
      exercises: [
        {
          id: generateUniqueId(),
          name: 'Barbell Bench Press',
          sets: 4,
          reps: '8-10',
          restTime: 90,
          description: 'Compound chest exercise',
          targetMuscle: ['Chest', 'Shoulders', 'Triceps'],
          level: 'intermediate'
        },
        {
          id: generateUniqueId(),
          name: 'Incline Dumbbell Press',
          sets: 3,
          reps: '10-12',
          restTime: 60,
          description: 'Focuses on upper chest',
          targetMuscle: ['Upper Chest', 'Shoulders'],
          level: 'intermediate'
        },
        {
          id: generateUniqueId(),
          name: 'Tricep Pushdowns',
          sets: 3,
          reps: '12-15',
          restTime: 60,
          description: 'Isolation exercise for triceps',
          targetMuscle: ['Triceps'],
          level: 'beginner'
        }
      ]
    },
    {
      day: 'Wednesday',
      focus: 'Back & Biceps',
      exercises: [
        {
          id: generateUniqueId(),
          name: 'Pull-ups',
          sets: 4,
          reps: '6-8',
          restTime: 90,
          description: 'Compound back exercise',
          targetMuscle: ['Back', 'Biceps'],
          level: 'intermediate'
        },
        {
          id: generateUniqueId(),
          name: 'Barbell Rows',
          sets: 3,
          reps: '8-10',
          restTime: 90,
          description: 'Targets middle back',
          targetMuscle: ['Back', 'Biceps', 'Rear Delts'],
          level: 'intermediate'
        },
        {
          id: generateUniqueId(),
          name: 'Hammer Curls',
          sets: 3,
          reps: '10-12',
          restTime: 60,
          description: 'Isolation for biceps with neutral grip',
          targetMuscle: ['Biceps', 'Forearms'],
          level: 'beginner'
        }
      ]
    },
    {
      day: 'Friday',
      focus: 'Legs & Shoulders',
      exercises: [
        {
          id: generateUniqueId(),
          name: 'Squats',
          sets: 4,
          reps: '8-10',
          restTime: 120,
          description: 'Compound lower body exercise',
          targetMuscle: ['Quads', 'Glutes', 'Hamstrings'],
          level: 'intermediate'
        },
        {
          id: generateUniqueId(),
          name: 'Romanian Deadlifts',
          sets: 3,
          reps: '10-12',
          restTime: 90,
          description: 'Focuses on hamstrings and lower back',
          targetMuscle: ['Hamstrings', 'Glutes', 'Lower Back'],
          level: 'intermediate'
        },
        {
          id: generateUniqueId(),
          name: 'Overhead Press',
          sets: 3,
          reps: '8-10',
          restTime: 90,
          description: 'Compound shoulder exercise',
          targetMuscle: ['Shoulders', 'Triceps'],
          level: 'intermediate'
        }
      ]
    }
  ];

  return {
    id: generateUniqueId(),
    title: 'Intermediate 3-Day Split Workout Plan',
    description: 'A balanced workout routine targeting all major muscle groups over 3 sessions per week',
    weeklySchedule: days,
    createdAt: new Date()
  };
};