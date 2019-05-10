export interface SleepOption {
  rating: number;
  description: string;
}

export interface MealTracker {
  meal: string;
  timing: boolean;
  food: boolean;
  missed: boolean;
}
