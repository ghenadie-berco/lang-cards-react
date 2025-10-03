import { playContent } from "./playContent.ts";

/**
 * Interface for the content of a single card.
 */
export interface CardContent {
  original: string;
  translated: string;
  originalLang: string;
  translatedLang: string;
}

/**
 * Manages the playback of a list of flashcards with text-to-speech.
 */
export class PlaylistPlayer {
  private cards: CardContent[] = [];
  private currentIndex: number = 0;
  private isPlaying: boolean = false;
  private currentDelayCancel: (() => void) | null = null;
  private onPlaybackFinish: () => void = () => {};

  public initialize(cards: CardContent[], onFinish: () => void): void {
    this.stop(false); // Stop without triggering callback
    this.cards = cards;
    this.onPlaybackFinish = onFinish;
  }

  private delay = (ms: number) => {
    let timeoutId: number;
    const promise = new Promise<void>((resolve) => {
      timeoutId = window.setTimeout(resolve, ms);
    });
    const cancel = () => clearTimeout(timeoutId);
    return { promise, cancel };
  };

  public async play(): Promise<void> {
    if (this.isPlaying || this.cards.length === 0) return;
    this.isPlaying = true;
    while (this.isPlaying && this.currentIndex < this.cards.length) {
      const card = this.cards[this.currentIndex];
      try {
        await playContent(card.original, card.originalLang);
        if (!this.isPlaying) break;
        const d1 = this.delay(3000);
        this.currentDelayCancel = d1.cancel;
        await d1.promise;
        if (!this.isPlaying) break;
        await playContent(card.translated, card.translatedLang);
        if (!this.isPlaying) break;
        const d2 = this.delay(2000);
        this.currentDelayCancel = d2.cancel;
        await d2.promise;
        this.currentIndex++;
      } catch (error) {
        console.error("Error during playback:", error);
        this.stop();
        break;
      }
    }
    if (this.currentIndex >= this.cards.length) this.stop();
  }

  public pause(): void {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    window.speechSynthesis.cancel();
    if (this.currentDelayCancel) this.currentDelayCancel();
  }

  public stop(notify: boolean = true): void {
    this.isPlaying = false;
    this.currentIndex = 0;
    window.speechSynthesis.cancel();
    if (this.currentDelayCancel) this.currentDelayCancel();
    if (notify) this.onPlaybackFinish();
  }
}
