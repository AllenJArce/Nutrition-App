export interface MealPlan {
  carb: string;
  protein: string;
  fruit: string;
  fat: string;
  proteinSup: string;
}

// export interface Food {
//   category: string;
//   name: string;
//   carbs: number;
//   protein: number;
//   fat: number;
//   kCals: number;
//   serving: number;
//   measurement: string;
//   exchanges: number;
// }

export interface Carbs {
  type: string;
  food: string;
  // numCarbs: number;
  // numProtein: number;
  // fat: number;
  // kCals: number;
  // serving: string;
  // TODO: Add exchanges after understanding
  // exchanges: string;
}

export interface Proteins {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  serving: string;
}

export interface Fats {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  serving: string;
}

export interface Vegtables {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  serving: string;
}

export interface Fruits {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  serving: string;
}

export interface ProteinSups {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  serving: string;
}
