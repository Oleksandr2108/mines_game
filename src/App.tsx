import BetHistory from "./components/BetHistory/BetHistory";
import BetSide from "./components/BetSide/BetSide";
import Loader from "./components/Loader/Loader";
import MinesGrid from "./components/MinesGrid/MinesGrid";
import SoundToggleButton from "./components/SoundToggleButton/SoundToggleButton";
import { useGameStore } from "./entities/game";
import { useBalanceQuery, useActiveGameQuery } from "./entities/game";
import { useGameHistoryQuery } from "./entities/game/queries/useGameHistoryQuery";

export default function App() {
  const gameId = useGameStore((state) => state.gameId);
  const { isLoading: isBalanceLoading } = useBalanceQuery();
  const { isLoading: isActiveGameLoading } = useActiveGameQuery();
  const { isLoading: isHistoryLoading } = useGameHistoryQuery();

  if (isBalanceLoading || isActiveGameLoading || isHistoryLoading) {
    return <Loader variant="page" />;
  }

  return (
    <div className="flex flex-col max-w-348 min-h-screen p-4 pb-20">
      <div className="self-end mb-4">
        <SoundToggleButton />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <BetSide />
        <MinesGrid key={gameId ?? "no-game"} />
        <BetHistory />
      </div>
    </div>
  );
}
