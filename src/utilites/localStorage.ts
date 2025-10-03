// Interfaces
import { DEFAULT_SETTINGS } from "../constants/language-options";
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
    const obj = JSON.parse(data);
    if (isValidSettingsInterface(obj)) {
      return obj;
    }
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: LangCardsSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidSettingsInterface(obj: any): boolean {
  return (
    "originalLang" in obj &&
    "translatedLang" in obj &&
    typeof obj.originalLang === "object" &&
    typeof obj.translatedLang === "object" &&
    "isoLang" in obj.originalLang &&
    "label" in obj.originalLang &&
    "isoLang" in obj.translatedLang &&
    "label" in obj.translatedLang
  );
}
