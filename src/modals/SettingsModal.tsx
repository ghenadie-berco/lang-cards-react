import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LangCardsSettings } from "../Interfaces";
import { LANGUAGE_OPTIONS } from "../constants/language-options";
import { useState } from "react";

export default function SettingsModal(props: {
  show: boolean;
  onCancel: () => void;
  onSave: (newSettings: LangCardsSettings) => void;
}) {
  const [translateFrom, setTranslateFrom] = useState<string | undefined>();
  const [translateTo, setTranslateTo] = useState<string | undefined>();

  const onSave = () => {
    if (translateFrom && translateTo) {
      props.onSave({
        originalLang: translateFrom,
        translatedLang: translateTo,
      });
    }
  };

  return (
    <Modal show={props.show} onHide={props.onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Translate From Selection */}
        <Form.Select
          id="translate-from"
          aria-label="Default select example"
          value={translateFrom}
          onChange={(e) => setTranslateFrom(e.target.value)}
        >
          <option>Translate From:</option>
          {LANGUAGE_OPTIONS.map((l) => (
            <option key={l.isoLang} value={l.isoLang}>
              {l.label}
            </option>
          ))}
        </Form.Select>
        {/* Translate To Selection */}
        <Form.Select
          id="translate-to"
          aria-label="Default select example"
          value={translateTo}
          onChange={(e) => setTranslateTo(e.target.value)}
        >
          <option>Translate To:</option>
          {LANGUAGE_OPTIONS.map((l) => (
            <option key={l.isoLang} value={l.isoLang}>
              {l.label}
            </option>
          ))}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={!translateFrom || !translateTo}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
