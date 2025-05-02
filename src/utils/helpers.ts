import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = (): string => {
  return uuidv4();
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Calculate the next workout date
export const getNextWorkoutDate = (day: string): Date => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const dayIndex = days.findIndex(d => d === day);
  const todayIndex = today.getDay();
  
  let daysToAdd = dayIndex - todayIndex;
  if (daysToAdd <= 0) {
    daysToAdd += 7;
  }
  
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToAdd);
  return nextDate;
};

// Format a date to display in a user-friendly way
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
};