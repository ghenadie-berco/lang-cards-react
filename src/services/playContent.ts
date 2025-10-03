export const playContent = (content: string, language: string): void => {
  if (!("speechSynthesis" in window)) {
    console.error("Sorry, your browser doesn't support the Web Speech API.");
    // TODO: throw error and show notification to user
    return;
  }

  const utterance = new SpeechSynthesisUtterance(content);
  utterance.rate = 0.9;

  const setVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const desiredVoice = voices.find((voice) =>
      voice.lang.toLowerCase().startsWith(language.toLowerCase())
    );

    if (desiredVoice) {
      utterance.voice = desiredVoice;
    } else {
      console.warn(
        `No specific voice found for language "${language}". Using browser default.`
      );
    }

    utterance.lang = language;

    // Cancel any speech that is currently active to prevent overlap.
    window.speechSynthesis.cancel();

    // Speak the new utterance.
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    setVoiceAndSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
  }
};
