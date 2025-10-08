// Redux
import { useSelector } from "react-redux";
// Interfaces
import { AppState, Card, LangCardsSettings } from "../Interfaces";
// Utilities
import { translate } from "../utilites/translate";
// Constants
import { COMMON_WORDS_IN_ENGLISH } from "../constants/common-words";

export function useGenerateRandomCard(): () => Promise<Card> {
  const settings = useSelector((state: AppState) => state.settings.settings);
  return async () => {
    const randomCard = await generateRandomCard(settings);
    return randomCard;
  };
}

async function generateRandomCard(settings: LangCardsSettings): Promise<Card> {
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
