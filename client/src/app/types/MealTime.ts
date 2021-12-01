import { User } from './User';

export interface MealTime {
  id: number;
  name: string;
  order: number;
  user: User;
}
