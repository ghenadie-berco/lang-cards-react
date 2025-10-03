import { COMMON_WORDS_IN_ENGLISH } from "../constants/common-words";
import { Card, LangCardsSettings } from "../Interfaces";
import { translate } from "./translate";

export async function generateRandomWordCard(settings: LangCardsSettings): Promise<Card> {
  const newWordInEnglish = getRandomWord();
  // Build new card
  let original = "";
  // Translate to original language if settings don't match
  if (settings.originalLang.isoLang !== "en") {
    original = await translate(
      newWordInEnglish,
      "en",
      settings.originalLang.isoLang
    );
  } else {
    original = newWordInEnglish;
  }
  const translated = await translate(
    original,
    settings.originalLang.isoLang,
    settings.translatedLang.isoLang
  );
  return {
    id: Date.now(),
    content: {
      original,
      translated,
      originalLang: settings.originalLang,
      translatedLang: settings.translatedLang,
    },
  };
}

function getRandomWord(): string {
  const randomNumber = Math.random();
  const scaledNumber = randomNumber * COMMON_WORDS_IN_ENGLISH.length;

  // 3. Round the number down to the nearest whole number to get a valid array index.
  //    This ensures the result is an integer between 0 and (length - 1).
  //    Example: 3456.78 becomes 3456
  const randomIndex = Math.floor(scaledNumber);

  // 4. Return the element at that randomly generated index.
  return COMMON_WORDS_IN_ENGLISH[randomIndex];
}
