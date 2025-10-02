import { Card } from "../../Interfaces";
import "./Cards.css";
import CardComponent from "./components/Card/Card";

function Cards(props: {
  cards: Card[];
  onEdit: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}) {
  const colors = [
    "#fff8ce", // Color 1
    "#DCFEC7", // Color 2
    "#E0F9FF", // Color 3
    "#F2E3FF", // Color 4
  ];
  return (
    <ul className="d-flex flex-column gap-3">
      {props.cards.map((c, index) => {
        return (
          <li key={c.id}>
            <CardComponent
              card={c}
              bgColor={colors[index % colors.length]}
              onEdit={(newContent) => props.onEdit(c.id, newContent)}
              onDelete={() => props.onDelete(c.id)}
            ></CardComponent>
          </li>
        );
      })}
    </ul>
  );
}

export default Cards;
