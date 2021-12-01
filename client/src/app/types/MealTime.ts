import { User } from './User';

export interface MealTime {
  _id: string;
  name: string;
  order: number;
  calories: number;
  user: User;
}
