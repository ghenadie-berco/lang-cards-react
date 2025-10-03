// Interfaces
import { Card, LangCardsSettings } from "../Interfaces";
// Constants
const CARDS_KEY = "cards";
const SETTINGS_KEY = "lang-cards-settings";

export function getCards(): Card[] {
  const data = localStorage.getItem(CARDS_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

export function saveCards(cards: Card[]): void {
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}

export function getSettings(): LangCardsSettings {
  const data = localStorage.getItem(SETTINGS_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    return {
      originalLang: "fr",
      translatedLang: "ru",
    };
  }
}

export function saveSettings(settings: LangCardsSettings): void {
  console.log(settings);
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
