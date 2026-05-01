import { useMemo } from "react";
import { useGameStore, useRevealCellMutation } from "../../entities/game";
import Cell from "./Cell/Cell";
import GameResultPopup from "../GameResultPopup/GameResultPopup";

const GRID_SIZE = 5;

function cellKey(row: number, col: number) {
  return `${row}-${col}`;
}

const MinesGrid = () => {
  const { mutateAsync: revealCell } = useRevealCellMutation();
  const {
    gameId,
    betAmount,
    revealedCells,
    fullBoard,
    hitMineCell,
    loadingCellKey,
    gameResult,
    lastRevealResponse,
    setRevealedCells,
    setFullBoard,
    setHitMineCell,
    setLoadingCellKey,
    setLastRevealResponse,
    setGameResult,
  } = useGameStore();

  const isGameActive = lastRevealResponse?.status === "active";

  const revealedMap = useMemo(() => {
    const map = new Set<string>();
    for (const cell of revealedCells) {
      map.add(cellKey(cell.row, cell.col));
    }
    return map;
  }, [revealedCells]);

  const handleCellClick = async (row: number, col: number) => {
    if (!gameId || !isGameActive) {
      return;
    }

    if (fullBoard) {
      return;
    }

    const key = cellKey(row, col);
    if (revealedMap.has(key)) {
      return;
    }

    setLoadingCellKey(key);

    try {
      const response = await revealCell({
        gameId: gameId,
        payload: { row, col },
      });
      setLastRevealResponse(response);

      if (response.result === "gem") {
        setRevealedCells(response.revealedCells);
        setHitMineCell(null);
      } else {
        setFullBoard(response.fullBoard);
        setHitMineCell(response.revealedCell);
        setGameResult({ type: "mine", betAmount });
      }
    } catch (error) {
      console.error("Failed to reveal cell:", error);
    } finally {
      setLoadingCellKey(null);
    }
  };

  const getCellVisual = (row: number, col: number) => {
    const key = cellKey(row, col);

    if (loadingCellKey === key) {
      return "loading" as const;
    }

    if (!isGameActive) {
      return "inactive" as const;
    }

    if (fullBoard) {
      const type = fullBoard[row]?.[col];
      if (type === "mine") {
        if (hitMineCell?.row === row && hitMineCell?.col === col) {
          return "mine-hit" as const;
        }
        return "mine" as const;
      }
      return "gem-faded" as const;
    }

    if (revealedMap.has(key)) {
      return "gem" as const;
    }

    return "hidden" as const;
  };

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
              disabled={
                !isGameActive || Boolean(fullBoard) || loadingCellKey !== null
              }
              index={index}
            />
          );
        }),
      )}
    </div>
  );
};
export default MinesGrid;
