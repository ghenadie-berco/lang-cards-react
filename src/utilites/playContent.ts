export const playContent = (content: string, language: string, rate: number = 1): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 1. Check if the Web Speech API is available in the browser.
    if (!('speechSynthesis' in window)) {
      console.error("Sorry, your browser doesn't support the Web Speech API.");
      // If not available, reject the promise immediately.
      reject(new Error("Speech Synthesis API not supported."));
      return;
    }

    // 2. Create a new utterance object.
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = rate; // Set the speech rate

    // Attach event listeners to the utterance to resolve/reject the promise.
    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
      reject(event);
    };

    /**
     * Finds the appropriate voice, sets it on the utterance, and speaks.
     */
    const setVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      // 3. Find a voice that matches the requested language.
      // We use `startsWith` to be more flexible (e.g., 'en' matches 'en-US', 'en-GB').
      const desiredVoice = voices.find(voice => voice.lang.startsWith(language));

      if (desiredVoice) {
        utterance.voice = desiredVoice;
      } else {
        console.warn(`No specific voice found for language "${language}". Using browser default.`);
      }

      // 4. Set language on the utterance itself as a fallback.
      utterance.lang = language;
      
      // 5. Cancel any speech that is currently active to prevent overlap.
      window.speechSynthesis.cancel();
      
      // 6. Speak the new utterance. The promise will resolve/reject based on the onend/onerror handlers.
      window.speechSynthesis.speak(utterance);
    };

    // The list of voices is often loaded asynchronously.
    // If the voices are already loaded, we can set the voice and speak immediately.
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      // If they aren't loaded yet, we must wait for the 'voiceschanged' event.
      // This is crucial for browsers that load voices on demand.
      window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
    }
  });
};
