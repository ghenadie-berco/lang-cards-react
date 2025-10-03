import "./App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  PlusLg,
  GearFill,
  PauseFill,
  PlayFill,
  StopFill,
} from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import Cards from "./components/Cards/Cards";
import { Card, CardContent } from "./Interfaces";
import { PlaylistPlayer } from "./utilites/PlaylistPlayer";
const STORAGE_KEY = "cards";

function getCards(): Card[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

function saveCards(cards: Card[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function App() {
  const [cards, setCards] = useState<Card[]>(getCards());
  const [showModel, setShowModel] = useState(false);
  const [newCardContent, setNewCardContent] = useState("");
  const addCardWordsInput = useRef(null);
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const player = useRef(new PlaylistPlayer());

  const closeModal = () => setShowModel(false);
  const showModal = () => setShowModel(true);

  const onAddCard = () => {
    closeModal();
    const original = newCardContent;
    const originalLang = "fr";
    const translatedLang = "ru";
    fetch(
      `https://api.mymemory.translated.net/get?q=${original}&langpair=${originalLang}|${translatedLang}`
    )
      .then((response) => response.json())
      .then((data) => {
        const card: Card = {
          id: Date.now(),
          content: {
            original: original,
            originalLang,
            translated: data.responseData.translatedText,
            translatedLang: translatedLang,
          },
        };
        setCards((prev) => [...prev, card]);
      });
  };

  const deleteCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const editCard = (id: number, newContent: string) => {
    const original = newContent;
    const originalLang = "fr";
    const translatedLang = "ru";
    fetch(
      `https://api.mymemory.translated.net/get?q=${original}&langpair=${originalLang}|${translatedLang}`
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedCardContent: CardContent = {
          original: original,
          originalLang,
          translated: data.responseData.translatedText,
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
      });
  };

  const handlePlay = () => {
    if (cards.length === 0) return;
    player.current.play();
    setIsPlaylistPlaying(true);
  };

  const handlePause = () => {
    if (cards.length === 0) return;
    player.current.pause();
    setIsPlaylistPlaying(false);
  };
  const handleStop = () => player.current.stop();

  useEffect(() => {
    player.current.initialize(
      cards.map((c) => c.content),
      () => setIsPlaylistPlaying(false)
    );
  }, [cards]);

  useEffect(() => saveCards(cards), [cards]);

  return (
    <main className="h-100 d-flex flex-column align-items-center p-3">
      <h1>Lang-Cards</h1>
      <GearFill className="settings-icon"></GearFill>
      <section className="main-section d-flex flex-column p-3 rounded-4 gap-3 overflow-auto">
        <Button variant="primary" className="add-card-btn" onClick={showModal}>
          <PlusLg className="add-card-icon"></PlusLg>
          <span>Add Card</span>
        </Button>
        <Cards cards={cards} onEdit={editCard} onDelete={deleteCard}></Cards>
      </section>
      {/* Playback Controls */}
      <section className="playback-controls d-flex gap-3 mt-3">
        {isPlaylistPlaying ? (
          <PauseFill size={48} onClick={handlePause} />
        ) : (
          <PlayFill size={48} onClick={handlePlay} />
        )}
        <StopFill size={48} onClick={handleStop} />
      </section>
      {/* Add New Card Modal */}
      <Modal show={showModel} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            ref={addCardWordsInput}
            type="text"
            placeholder="Write one or a few words..."
            onChange={(e) => setNewCardContent(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onAddCard}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default App;
