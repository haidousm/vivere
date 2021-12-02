import { FoodEntry } from './FoodEntry';
import { User } from './User';

export interface DiaryEntry {
  _id: string;
  date: Date;
  foodEntries: FoodEntry[];
  user: User;
}
