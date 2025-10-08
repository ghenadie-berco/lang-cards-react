// React
import { useEffect, useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import { PlusLg, GearFill, Magic } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Store
import { addNewCard, deleteCard } from "./store/slices/cards-slice";
// Components
import CardsList from "./components/CardsList/CardsList";
import AddCardModal from "./modals/AddCardModal";
import SettingsModal from "./modals/SettingsModal";
import Player from "./components/Player/Player";
// Custom Hooks
import { useGenerateRandomCard } from "./custom hooks/useGenerateRandomCard";
// Styles
import "./App.css";
// Interfaces
import { AppState } from "./Interfaces";
// Utilities
import { saveCards } from "./utilites/localStorage";

export default function App() {
  const cards = useSelector((state: AppState) => state.cards.cards);
  const dispatch = useDispatch();
  const generateRandomCard = useGenerateRandomCard();
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentPlayingCardId, setCurrentPlayingCardId] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteCard = (id: number) => dispatch(deleteCard(id));

  const onGenerateCard = async () => {
    setIsLoading(true);
    const randomCard = await generateRandomCard();
    setIsLoading(false);
    dispatch(addNewCard(randomCard));
  };

  // Save Cards on changes
  useEffect(() => saveCards(cards), [cards]);

  return (
    <main className="h-100 d-flex flex-column align-items-center p-3">
      <h1>Lang-Cards</h1>
      {/* Settings Icon */}
      <GearFill
        className="settings-icon"
        onClick={() => setShowSettingsModal(true)}
      ></GearFill>
      {/* Main Section */}
      <section className="main-section d-flex flex-column p-3 rounded-4 gap-3">
        {/* Top Actions */}
        <div className="d-flex justify-content-between gap-2">
          {/* Add Card Action */}
          <Button
            variant="primary"
            className="add-card-btn"
            onClick={() => setShowAddCardModal(true)}
          >
            <PlusLg className="add-card-icon"></PlusLg>
            <span>Add Card</span>
          </Button>
          {/* Auto Generate Card Action */}
          <Button
            variant="success"
            className="auto-generate-card-btn"
            onClick={onGenerateCard}
          >
            <Magic className="generate-card-icon"></Magic>
            <span>Generate</span>
          </Button>
        </div>
        {/* Cards List */}
        <CardsList
          cards={cards}
          currentlyPlayingCardId={currentPlayingCardId}
          onDelete={onDeleteCard}
        ></CardsList>
        {/* Loading Indicator */}
        {isLoading && (
          <Spinner animation="border" variant="warning" className="spinner" />
        )}
      </section>
      {/* Player */}
      <div className="player">
        <Player setCurrentPlayingCardId={setCurrentPlayingCardId}></Player>
      </div>
      {/* Add Card Modal */}
      <AddCardModal
        show={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
      ></AddCardModal>
      <SettingsModal
        show={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      ></SettingsModal>
    </main>
  );
}
