// Interfaces
import { Card } from "../Interfaces";
// Constants
const STORAGE_KEY = "cards";

export function getCards(): Card[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

export function saveCards(cards: Card[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}