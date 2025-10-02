import { Card } from "../../../../Interfaces";
import "./Card.css";

function CardComponent(props: { card: Card; bgColor: string }) {
  return (
    <div
      className="card d-flex flex-column gap-2 rounded-3 p-3"
      style={{ background: props.bgColor }}
    >
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
  );
}

export default CardComponent;
