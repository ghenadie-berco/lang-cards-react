// React
import { useState } from "react";
// Bootstrap
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Store
import { setSettings } from "../store/slices/settings-slice";
// Interfaces
import { AppState } from "../Interfaces";
// Constants
import { LANGUAGE_OPTIONS } from "../constants/language-options";

export default function SettingsModal(props: {
  show: boolean;
  onClose: () => void;
}) {
  const settings = useSelector((state: AppState) => state.settings.settings);
  const dispatch = useDispatch();
  const [translateFrom, setTranslateFrom] = useState<string>(
    settings.originalLang.isoLang
  );
  const [translateTo, setTranslateTo] = useState<string>(
    settings.translatedLang.isoLang
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSave = () => {
    if (translateFrom && translateTo) {
      const newSettings = {
        originalLang: LANGUAGE_OPTIONS.find(
          (o) => o.isoLang === translateFrom
        )!,
        translatedLang: LANGUAGE_OPTIONS.find(
          (o) => o.isoLang === translateTo
        )!,
      };
      setIsLoading(true);
      dispatch(setSettings(newSettings));
      setIsLoading(false);
      props.onClose();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onClose} centered>
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
        <Button variant="secondary" onClick={props.onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={!translateFrom || !translateTo || isLoading}
        >
          {isLoading && <Spinner animation="border" size="sm" />}
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
