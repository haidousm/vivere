import { FoodItem } from './FoodItem';
import { User } from './User';

export interface DiaryEntry {
  _id: string;
  date: Date;
  foodEntries: FoodItem[];
  user: User;
}
