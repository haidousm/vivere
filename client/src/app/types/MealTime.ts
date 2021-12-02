import { User } from './User';

export interface MealTime {
  id: string;
  name: string;
  order: number;
  calories: number;
  user: User;
}
