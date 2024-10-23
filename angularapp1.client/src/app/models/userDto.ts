import { Card } from "./card";

export interface UserDto {
    userId: number;
    username: string;
    token: string;
    cards: Card[] | null;
}