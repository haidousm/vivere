import { FoodEntry } from './FoodEntry';
import { User } from './User';

export interface Meal {
  id: string;
  name: string;
  foodEntries: FoodEntry[];
  user: User;
}
