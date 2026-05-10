import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../../entities/game";
import { GAME_STATUS_ACTIVE } from "../../entities/game/model/constants";
import GameResultPopup from "../GameResultPopup/GameResultPopup";
import { useGridState } from "./useGridState";
import Cell, { type CellVisual } from "./Cell/Cell";

const TOTAL_CELLS = 25;

const MinesGrid = () => {
  const {
    gameResult,
    setGameResult,
    minesCount,
    lastRevealResponse,
    revealedCells,
    fullBoard,
    hitMineCell,
    loadingCellKey,
  } = useGameStore(
    useShallow((s) => ({
      gameResult: s.gameResult,
      setGameResult: s.setGameResult,
      minesCount: s.minesCount,
      lastRevealResponse: s.lastRevealResponse,
      revealedCells: s.revealedCells,
      fullBoard: s.fullBoard,
      hitMineCell: s.hitMineCell,
      loadingCellKey: s.loadingCellKey,
    })),
  );
  const { handleCellClick, GRID_SIZE } = useGridState();

  const isGameActive = lastRevealResponse?.status === GAME_STATUS_ACTIVE;

  const revealedSet = useMemo(() => {
    const set = new Set<string>();
    for (const cell of revealedCells) {
      set.add(`${cell.row}-${cell.col}`);
    }
    return set;
  }, [revealedCells]);

  const clickHandlers = useMemo(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;
      return () => handleCellClick(row, col);
    });
  }, [GRID_SIZE, handleCellClick]);

  const getCellVisual = (row: number, col: number): CellVisual => {
    const key = `${row}-${col}`;

    if (loadingCellKey === key) return "loading";
    if (!isGameActive) return "inactive";

    if (fullBoard) {
      const type = fullBoard[row]?.[col];
      if (type === "mine") {
        if (hitMineCell?.row === row && hitMineCell?.col === col) {
          return "mine-hit";
        }
        return "mine";
      }
      return "gem-faded";
    }

    if (revealedSet.has(key)) return "gem";
    return "hidden";
  };

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
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          const visual = getCellVisual(row, col);

          return (
            <Cell
              key={`${row}-${col}`}
              visual={visual}
              onClick={clickHandlers[index]}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MinesGrid;
