// React
import { useState } from "react";
// Bootstrap
import { Trash3, PencilFill, Soundwave, PlayFill } from "react-bootstrap-icons";
// Styles
import "./CardItem.css";
// Components
import EditCardModal from "./modals/EditCardModal";
// Interfaces
import { Card } from "../../../../Interfaces";
// Utilities
import { playContent } from "../../../../utilites/playContent";

function CardComponent(props: {
  card: Card;
  currentlyPlaying: boolean;
  bgColor: string;
  onDelete: () => void;
}) {
  const [showEditModal, setShowEditModal] = useState(false);

  const onPlayOriginal = () => {
    playContent(
      props.card.content.original,
      props.card.content.originalLang.isoLang
    );
  };

  const onPlayTranslated = () => {
    playContent(
      props.card.content.translated,
      props.card.content.translatedLang.isoLang
    );
  };

  return (
    <div
      className={
        "card d-flex flex-row align-items-center gap-2 rounded-3 p-2 " +
        (props.currentlyPlaying ? "currently-playing" : "")
      }
      style={{ background: props.bgColor }}
    >
      {/* Playing Indicator */}
      <PlayFill
        className={
          "playing-indicator " + (props.currentlyPlaying ? "visible" : "")
        }
      ></PlayFill>
      {/* Edit Action */}
      <PencilFill
        className="delete-icon"
        onClick={() => setShowEditModal(true)}
      ></PencilFill>
      {/* Mid Section */}
      <div className="flex-fill d-flex flex-column gap-2">
        {/* Original Language and Content */}
        <section className="card-section d-flex flex-column">
          <span className="card-lang-indicator">
            {props.card.content.originalLang.label}:
          </span>
          <div className="d-flex align-items-center gap-2">
            <span className="card-content">{props.card.content.original}</span>
            <Soundwave
              className="soundwave-icon"
              onClick={onPlayOriginal}
            ></Soundwave>
          </div>
        </section>
        <div className="card-divider"></div>
        {/* Translated Language and Content */}
        <section className="card-section d-flex flex-column">
          <span className="card-lang-indicator">
            {props.card.content.translatedLang.label}:
          </span>
          <div className="d-flex align-items-center gap-2">
            <span className="card-content">
              {props.card.content.translated}
            </span>
            <Soundwave
              className="soundwave-icon"
              onClick={onPlayTranslated}
            ></Soundwave>
          </div>
        </section>
      </div>
      {/* Delete Action */}
      <Trash3 className="delete-icon" onClick={props.onDelete}></Trash3>
      {/* Edit Card Modal */}
      <EditCardModal
        show={showEditModal}
        card={props.card}
        onClose={() => setShowEditModal(false)}
      ></EditCardModal>
    </div>
  );
}

export default CardComponent;
