import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../../entities/game";
import Cell from "./Cell/Cell";
import GameResultPopup from "../GameResultPopup/GameResultPopup";
import { useGridState } from "./useGridState";

const MinesGrid = () => {
  const { gameResult, setGameResult } = useGameStore(
    useShallow((s) => ({
      gameResult: s.gameResult,
      setGameResult: s.setGameResult,
    })),
  );
  const { getCellVisual, handleCellClick, isCellDisabled, GRID_SIZE } =
    useGridState();

  return (
    <div
      className="relative grid w-full max-w-125 gap-2 lg:gap-2 order-3 lg:order-2"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
    >
      {gameResult && (
        <GameResultPopup
          result={gameResult}
          onClose={() => setGameResult(null)}
        />
      )}
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => {
          const index = row * GRID_SIZE + col;
          return (
            <Cell
              key={`${row}-${col}`}
              visual={getCellVisual(row, col)}
              onClick={() => handleCellClick(row, col)}
              disabled={isCellDisabled}
              index={index}
            />
          );
        }),
      )}
    </div>
  );
};
export default MinesGrid;
