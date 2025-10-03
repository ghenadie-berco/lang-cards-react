// React
import { useRef, useState } from "react";
// Bootstrap
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export default function EditCardModal(props: {
  show: boolean;
  content: string;
  onCancel: () => void;
  onSave: (newContent: string) => void;
}) {
  const [cardContent, setCardContent] = useState(props.content);
  const editCardContentInput = useRef(null);

  return (
    <Modal show={props.show} onHide={props.onCancel} centered>
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
        <Button variant="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => props.onSave(cardContent)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
