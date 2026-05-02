import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../../entities/game";
import Cell from "./Cell/Cell";
import GameResultPopup from "../GameResultPopup/GameResultPopup";
import { useGridState } from "./useGridState";

const TOTAL_CELLS = 25;

const MinesGrid = () => {
  const { gameResult, setGameResult, minesCount, lastRevealResponse } =
    useGameStore(
      useShallow((s) => ({
        gameResult: s.gameResult,
        setGameResult: s.setGameResult,
        minesCount: s.minesCount,
        lastRevealResponse: s.lastRevealResponse,
      })),
    );
  const { getCellVisual, handleCellClick, isCellDisabled, GRID_SIZE } =
    useGridState();

  const gemsFound =
    lastRevealResponse?.result === "gem" ? lastRevealResponse.gemsFound : 0;
  const remaining = TOTAL_CELLS - minesCount - gemsFound;

  return (
    <div className="flex flex-col w-full max-w-125 gap-3 order-3 lg:order-2">
      <div className="flex items-center justify-center gap-1.5 text-xs text-[#4a5568] mb-4">
        <span>
          {minesCount} {minesCount === 1 ? "Mine" : "Mines"}
        </span>
        <span>·</span>
        <span>
          {gemsFound} {gemsFound === 1 ? "gem" : "gems"} found
        </span>
        <span>·</span>
        <span>{remaining} remaining</span>
      </div>
      <div
        className="relative grid w-full gap-2 lg:gap-2"
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
    </div>
  );
};
export default MinesGrid;
