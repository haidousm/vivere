import { FoodItem } from './FoodItem';
import { MealTime } from './MealTime';

export interface FoodEntry {
  id: string;
  foodItem: FoodItem;
  numberOfServings: number;
  totalCalories: number;
  mealTime: MealTime;
  diaryId: string;
}
