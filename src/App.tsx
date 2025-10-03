// React
import { useEffect, useRef, useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import {
  PlusLg,
  GearFill,
  PauseFill,
  PlayFill,
  StopFill,
} from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
// Components
import Cards from "./components/Cards/Cards";
import AddCardModal from "./modals/AddCardModal";
// Styles
import "./App.css";
// Interfaces
import { Card, CardContent, LangCardsSettings } from "./Interfaces";
// Utilities
import { translate } from "./utilites/translate";
import { PlaylistPlayer } from "./utilites/PlaylistPlayer";
import {
  getCards,
  getSettings,
  saveCards,
  saveSettings,
} from "./utilites/localStorage";
import SettingsModal from "./modals/SettingsModal";

export default function App() {
  const [settings, setSettings] = useState(getSettings());
  const [cards, setCards] = useState<Card[]>(getCards());
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentPlayingCardId, setCurrentPlayingCardId] = useState<
    number | null
  >(null);
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const player = useRef(new PlaylistPlayer());

  const onAddCard = async (content: string) => {
    setShowAddCardModal(false);
    const original = content;
    const originalLang = settings.originalLang;
    const translatedLang = settings.translatedLang;
    setIsLoading(true);
    const translated = await translate(original, originalLang, translatedLang);
    setIsLoading(false);
    const card: Card = {
      id: Date.now(),
      content: {
        original: original,
        originalLang,
        translated,
        translatedLang: translatedLang,
      },
    };
    setCards((prev) => [...prev, card]);
  };

  const editCard = async (id: number, newContent: string) => {
    const original = newContent;
    const originalLang = settings.originalLang;
    const translatedLang = settings.translatedLang;
    setIsLoading(true);
    const translated = await translate(original, originalLang, translatedLang);
    setIsLoading(false);
    const updatedCardContent: CardContent = {
      original: original,
      originalLang,
      translated,
      translatedLang: translatedLang,
    };
    setCards((prev) => {
      return prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            content: updatedCardContent,
          };
        } else {
          return c;
        }
      });
    });
  };

  const deleteCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const onSaveSettings = (settings: LangCardsSettings) => {
    setShowSettingsModal(false);
    setSettings(settings);
  };

  const handlePlay = () => {
    if (cards.length === 0) return;
    player.current.play(setCurrentPlayingCardId, true);
    setIsPlaylistPlaying(true);
  };
  const handlePause = () => {
    if (cards.length === 0) return;
    player.current.pause();
    setIsPlaylistPlaying(false);
  };
  const handleStop = () => {
    player.current.stop(setCurrentPlayingCardId);
  };

  useEffect(() => {
    player.current.initialize(cards, setCurrentPlayingCardId, () =>
      setIsPlaylistPlaying(false)
    );
  }, [cards]);

  // Save Cards on changes
  useEffect(() => saveCards(cards), [cards]);

  // Save Settings on changes
  useEffect(() => saveSettings(settings), [settings]);

  return (
    <main className="h-100 d-flex flex-column align-items-center p-3">
      <h1>Lang-Cards</h1>
      {/* Settings Icon */}
      <GearFill
        className="settings-icon"
        onClick={() => setShowSettingsModal(true)}
      ></GearFill>
      {/* Main Section */}
      <section className="main-section d-flex flex-column p-3 rounded-4 gap-3 overflow-auto">
        {/* Add Card Action */}
        <Button
          variant="primary"
          className="add-card-btn"
          onClick={() => setShowAddCardModal(true)}
        >
          <PlusLg className="add-card-icon"></PlusLg>
          <span>Add Card</span>
        </Button>
        {/* Cards List */}
        <Cards
          cards={cards}
          currentlyPlayingCardId={currentPlayingCardId}
          onEdit={editCard}
          onDelete={deleteCard}
        ></Cards>
        {/* Loading Indicator */}
        {isLoading && (
          <Spinner animation="border" variant="warning" className="spinner" />
        )}
      </section>
      {/* Playlist Controls */}
      <section className="playlist-controls d-flex gap-3 mt-3">
        {isPlaylistPlaying ? (
          <PauseFill size={48} onClick={handlePause} />
        ) : (
          <PlayFill size={48} onClick={handlePlay} />
        )}
        <StopFill size={48} onClick={handleStop} />
      </section>
      {/* Add Card Modal */}
      <AddCardModal
        show={showAddCardModal}
        onCancel={() => setShowAddCardModal(false)}
        onSave={onAddCard}
      ></AddCardModal>
      <SettingsModal
        show={showSettingsModal}
        currentSettings={settings}
        onCancel={() => setShowSettingsModal(false)}
        onSave={onSaveSettings}
      ></SettingsModal>
    </main>
  );
}
