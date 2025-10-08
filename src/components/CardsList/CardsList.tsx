// Styles
import "./CardsList.css";
// Components
import CardComponent from "./components/CardItem/CardItem";
// Interfaces
import { Card } from "../../Interfaces";

function CardsList(props: {
  cards: Card[];
  currentlyPlayingCardId: number | null;
  onDelete: (id: number) => void;
}) {
  const colors = [
    "#fff8ce", // Color 1
    "#DCFEC7", // Color 2
    "#E0F9FF", // Color 3
    "#F2E3FF", // Color 4
  ];
  return (
    <ul className="list d-flex flex-column gap-3 overflow-auto">
      {props.cards.map((c, index) => {
        return (
          <li key={c.id}>
            <CardComponent
              card={c}
              currentlyPlaying={props.currentlyPlayingCardId === c.id}
              bgColor={colors[index % colors.length]}
              onDelete={() => props.onDelete(c.id)}
            ></CardComponent>
          </li>
        );
      })}
    </ul>
  );
}

export default CardsList;
