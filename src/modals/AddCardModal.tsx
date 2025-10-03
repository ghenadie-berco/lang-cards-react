import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import { Button } from "react-bootstrap";

export function AddCardModal(props: {
  show: boolean;
  onCancel: () => void;
  onSave: (content: string) => void;
}) {
  const [cardContent, setCardContent] = useState("");
  const addCardContentInput = useRef(null);

  const onSave = () => {
    props.onSave(cardContent);
  };

  return (
    <Modal show={props.show} onHide={props.onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          ref={addCardContentInput}
          type="text"
          placeholder="Write one or a few words..."
          onChange={(e) => setCardContent(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
