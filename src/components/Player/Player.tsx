// React
import { useEffect, useRef, useState } from "react";
// Bootstrap
import { PauseFill, PlayFill, StopFill } from "react-bootstrap-icons";
// Styles
import "./Player.css";
// Redux
import { useSelector } from "react-redux";
// Interfaces
import { AppState } from "../../Interfaces";
// Classes
import { CardsPlayer } from "../../classes/CardsPlayer";

export default function Player(props: {
  setCurrentPlayingCardId: (id: number | null) => void;
}) {
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const cards = useSelector((state: AppState) => state.cards.cards);
  const player = useRef(new CardsPlayer());

  const handlePlay = () => {
    if (cards.length === 0) return;
    player.current.play(props.setCurrentPlayingCardId, true);
    setIsPlaylistPlaying(true);
  };

  const handlePause = () => {
    if (cards.length === 0) return;
    player.current.pause();
    setIsPlaylistPlaying(false);
  };

  const handleStop = () => {
    player.current.stop(props.setCurrentPlayingCardId);
  };

  useEffect(() => {
    player.current.initialize(cards, props.setCurrentPlayingCardId, () =>
      setIsPlaylistPlaying(false)
    );
  }, [cards, props.setCurrentPlayingCardId]);

  return (
    <section className="playlist-controls d-flex gap-3 mt-3">
      {isPlaylistPlaying ? (
        <PauseFill size={48} onClick={handlePause} />
      ) : (
        <PlayFill size={48} onClick={handlePlay} />
      )}
      <StopFill size={48} onClick={handleStop} />
    </section>
  );
}
