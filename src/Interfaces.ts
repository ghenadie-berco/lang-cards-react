export interface Card {
  id: number;
  content: CardContent;
}

export interface CardContent {
  original: string;
  translated: string;
  originalLang: LanguageOption;
  translatedLang: LanguageOption;
}

export interface LangCardsSettings {
  originalLang: LanguageOption;
  translatedLang: LanguageOption;
}

export interface LanguageOption {
  isoLang: string; // ISO standard language names
  label: string;
}
