import BetSide from "./components/BetSide/BetSide";
import MinesGrid from "./components/MinesGrid/MinesGrid";
import { useGameStore } from "./entities/game";

export default function App() {
  const gameId = useGameStore((state) => state.gameId);

  return (
    <div className="flex max-w-348 items-center justify-between min-h-screen ">
      <BetSide />
      <MinesGrid key={gameId ?? "no-game"} />
    </div>
  );
}
