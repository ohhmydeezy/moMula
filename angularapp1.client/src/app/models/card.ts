import { Transaction } from './transactions';

export interface Card {
  id: number;
  accountName: string;
  openingBalance: number;
  accountBalance: number;
  cardImage: string;
  transactions: Transaction[];
}
