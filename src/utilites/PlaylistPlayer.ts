// Interfaces
import { Card } from "../Interfaces.ts";
// Utilities
import { playContent } from "./playContent.ts";

// Define a type for the WakeLockSentinel to avoid using 'any'
interface WakeLockSentinel {
  release: () => Promise<void>;
  type: "screen";
}

export class PlaylistPlayer {
  public playingCardId: number | null = null;

  private cards: Card[] = [];
  private currentIndex: number = 0;
  private isPlaying: boolean = false;
  private currentDelayCancel: (() => void) | null = null;
  private onPlaybackFinish: () => void = () => {};
  private wakeLockSentinel: WakeLockSentinel | null = null; // Use the specific type

  public initialize(
    cards: Card[],
    setCurrentPlayingCard: (id: number | null) => void,
    onFinish: () => void
  ): void {
    this.stop(setCurrentPlayingCard, false); // Stop without triggering callback
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

  private async _acquireWakeLock() {
    if ("wakeLock" in navigator && !this.wakeLockSentinel) {
      try {
        this.wakeLockSentinel = await (navigator as Navigator).wakeLock.request("screen");
        console.log("Screen Wake Lock is active.");
      } catch (err: unknown) { // Use 'unknown' for the error type
        if (err instanceof Error) {
          console.error(`Wake Lock request failed: ${err.name}, ${err.message}`);
        } else {
          console.error("An unknown error occurred while acquiring wake lock.");
        }
      }
    }
  }

  private _releaseWakeLock() {
    if (this.wakeLockSentinel) {
      this.wakeLockSentinel.release().then(() => {
        this.wakeLockSentinel = null;
        console.log("Screen Wake Lock released.");
      });
    }
  }

  public async play(
    setCurrentPlayingCard: (id: number | null) => void,
    shouldKeepAwake: boolean
  ): Promise<void> {
    if (this.isPlaying || this.cards.length === 0) return;

    if (shouldKeepAwake) {
      await this._acquireWakeLock();
    }

    this.isPlaying = true;
    while (this.isPlaying && this.currentIndex < this.cards.length) {
      const card = this.cards[this.currentIndex];
      setCurrentPlayingCard(card.id);
      try {
        await playContent(card.content.original, card.content.originalLang);
        if (!this.isPlaying) break;
        const d1 = this.delay(3000);
        this.currentDelayCancel = d1.cancel;
        await d1.promise;
        if (!this.isPlaying) break;
        await playContent(card.content.translated, card.content.translatedLang);
        if (!this.isPlaying) break;
        const d2 = this.delay(2000);
        this.currentDelayCancel = d2.cancel;
        await d2.promise;
        this.currentIndex++;
      } catch (error) {
        console.error("Error during playback:", error);
        this.stop(setCurrentPlayingCard);
        break;
      }
    }
    if (this.currentIndex >= this.cards.length) {
      this.stop(setCurrentPlayingCard);
    }
  }

  public pause(): void {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    window.speechSynthesis.cancel();
    if (this.currentDelayCancel) this.currentDelayCancel();
    this._releaseWakeLock(); // Release the lock on pause
  }

  public stop(
    setCurrentPlayingCard: (id: number | null) => void,
    notify: boolean = true
  ): void {
    this.isPlaying = false;
    this.currentIndex = 0;
    setCurrentPlayingCard(null);
    window.speechSynthesis.cancel();
    if (this.currentDelayCancel) this.currentDelayCancel();
    if (notify && this.onPlaybackFinish) this.onPlaybackFinish();
    this._releaseWakeLock(); // Release the lock on stop
  }
}

