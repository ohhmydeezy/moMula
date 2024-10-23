import { Card } from './card';

export interface AppUser {
  id: number;
  username: string;
  email: string;
  password: string;
  monthlyIncome: number;
  savings: number;
  cards: Card[] | undefined;
  token: string;
}
