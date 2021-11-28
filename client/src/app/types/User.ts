export interface RegisterUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  weight: number;
  height: number;
  dateOfBirth: Date;
  goalWeight: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  weight: number;
  height: number;
  dateOfBirth: Date;
  goalWeight: number;
}
