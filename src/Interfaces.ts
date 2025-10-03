export interface Card {
  id: number;
  content: CardContent;
}

export interface CardContent {
  original: string;
  translated: string;
  originalLang: string;
  translatedLang: string;
}

export interface LangCardsSettings {
  originalLang: string;
  translatedLang: string;
}

export interface LanguageOption {
  isoLang: string; // ISO standard language names
  label: string;
}
