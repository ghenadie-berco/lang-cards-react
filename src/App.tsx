import "./App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PlusLg, GearFill } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import Cards from "./components/Cards/Cards";
import { Card } from "./Interfaces";
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
        <Cards cards={cards}></Cards>
      </section>

      {/* Modal */}
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
