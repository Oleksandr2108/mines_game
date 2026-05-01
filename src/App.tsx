import BetHistory from "./components/BetHistory/BetHistory";
import BetSide from "./components/BetSide/BetSide";
import Loader from "./components/Loader/Loader";
import MinesGrid from "./components/MinesGrid/MinesGrid";
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
    <div className="flex flex-col lg:flex-row max-w-348 items-center justify-between min-h-screen gap-4 p-4 pb-20">
      <BetSide />
      <MinesGrid key={gameId ?? "no-game"} />
      <BetHistory />
    </div>
  );
}
