import { FoodItem } from './FoodItem';
import { User } from './User';

export interface DiaryEntry {
  id: number;
  date: Date;
  foodEntries: FoodItem[];
  user: User;
}
