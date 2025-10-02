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