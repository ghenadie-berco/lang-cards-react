import { Card } from "../../../../Interfaces";
import { Trash3, PencilFill } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Card.css";
import { useRef, useState } from "react";

function CardComponent(props: {
  card: Card;
  bgColor: string;
  onEdit: (newContent: string) => void;
  onDelete: () => void;
}) {
  const [cardContent, setCardContent] = useState(props.card.content.original);
  const [showModel, setShowModel] = useState(false);
  const editCardWordsInput = useRef(null);
  const closeModal = () => setShowModel(false);
  const showModal = () => setShowModel(true);

  const onSave = () => {
    closeModal();
    props.onEdit(cardContent);
  };

  return (
    <div
      className="card d-flex flex-row align-items-center gap-3 rounded-3 p-3"
      style={{ background: props.bgColor }}
    >
      {/* Edit Action */}
      <PencilFill className="delete-icon" onClick={showModal}></PencilFill>
      {/* Mid Section */}
      <div className="flex-fill d-flex flex-column gap-3">
        {/* Original Language and Content */}
        <section className="card-section d-flex flex-column">
          <span className="card-lang-indicator">
            {props.card.content.originalLang.toUpperCase()}:
          </span>
          <span className="card-content">{props.card.content.original}</span>
        </section>
        <div className="card-divider"></div>
        {/* Translated Language and Content */}
        <section className="card-section d-flex flex-column">
          <span className="card-lang-indicator">
            {props.card.content.translatedLang.toUpperCase()}:
          </span>
          <span className="card-content">{props.card.content.translated}</span>
        </section>
      </div>
      {/* Delete Action */}
      <Trash3 className="delete-icon" onClick={props.onDelete}></Trash3>
      {/* Edit Card Modal */}
      <Modal show={showModel} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            ref={editCardWordsInput}
            type="text"
            value={cardContent}
            placeholder="Write one or a few words..."
            onChange={(e) => setCardContent(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CardComponent;
