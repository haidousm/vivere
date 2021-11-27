import { FoodItem } from './FoodItem';

export interface Meal {
  name: string;
  totalCalories: number;
  foodItems: FoodItem[];
}
