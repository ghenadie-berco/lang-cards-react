import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LangCardsSettings } from "../Interfaces";
import { LANGUAGE_OPTIONS } from "../constants/language-options";
import { useState } from "react";

export default function SettingsModal(props: {
  show: boolean;
  currentSettings: LangCardsSettings;
  onCancel: () => void;
  onSave: (newSettings: LangCardsSettings) => void;
}) {
  const [translateFrom, setTranslateFrom] = useState<string>(
    props.currentSettings.originalLang
  );
  const [translateTo, setTranslateTo] = useState<string>(
    props.currentSettings.translatedLang
  );

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
      <Modal.Body className="d-flex flex-column gap-2">
        {/* Translate From Selection */}
        <div className="d-flex flex-column">
          <Form.Label htmlFor="translate-from">Translate From:</Form.Label>
          <Form.Select
            id="translate-from"
            aria-label="Default select example"
            value={translateFrom}
            onChange={(e) => setTranslateFrom(e.target.value)}
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l.isoLang} value={l.isoLang}>
                {l.label}
              </option>
            ))}
          </Form.Select>
        </div>
        {/* Translate To Selection */}
        <div className="d-flex flex-column">
          <Form.Label htmlFor="translate-to">Translate To:</Form.Label>
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
        </div>
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
