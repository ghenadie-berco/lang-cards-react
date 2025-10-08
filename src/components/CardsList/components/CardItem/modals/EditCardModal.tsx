// React
import { useRef, useState } from "react";
// Bootstrap
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Store
import { updateCard } from "../../../../../store/slices/cards-slice";
// Interfaces
import { AppState, Card, CardContent } from "../../../../../Interfaces";
// Utilities
import { translate } from "../../../../../utilites/translate";

export default function EditCardModal(props: {
  show: boolean;
  card: Card;
  onClose: () => void;
}) {
  const settings = useSelector((state: AppState) => state.settings.settings);
  const dispatch = useDispatch();
  const [cardContent, setCardContent] = useState(props.card.content.original);
  const [isLoading, setIsLoading] = useState(false);
  const editCardContentInput = useRef(null);

  const onSave = async () => {
    const original = cardContent;
    const originalLang = settings.originalLang;
    const translatedLang = settings.translatedLang;
    setIsLoading(true);
    const translated = await translate(
      original,
      originalLang.isoLang,
      translatedLang.isoLang
    );
    setIsLoading(false);
    const updatedCardContent: CardContent = {
      original: original,
      originalLang,
      translated,
      translatedLang: translatedLang,
    };
    dispatch(updateCard({ id: props.card.id, content: updatedCardContent }));
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          ref={editCardContentInput}
          type="text"
          value={cardContent}
          placeholder="Write one or a few words..."
          onChange={(e) => setCardContent(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave()} disabled={isLoading}>
          {isLoading && <Spinner animation="border" size="sm" />}
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
