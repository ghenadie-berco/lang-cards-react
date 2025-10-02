import "./App.css";
import Button from "react-bootstrap/Button";
import { PlusLg, GearFill } from "react-bootstrap-icons";

function App() {
  return (
    <main className="h-100 d-flex flex-column align-items-center p-3">
      <h1>Lang-Cards</h1>
      <GearFill className="settings-icon"></GearFill>
      <section className="d-flex flex-column p-3 rounded-4">
        <Button variant="primary" className="add-card-btn">
          <PlusLg className="add-card-icon"></PlusLg>
          <span>Add Card</span>
        </Button>
      </section>
    </main>
  );
}

export default App;
