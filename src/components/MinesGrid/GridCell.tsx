import { memo, useCallback, type RefObject } from "react";
import { useGameStore } from "../../entities/game";
import Cell, { type CellVisual } from "./Cell/Cell";

interface GridCellProps {
  row: number;
  col: number;
  index: number;
  onCellClickRef: RefObject<((row: number, col: number) => void) | null>;
}

function getCellVisual(
  row: number,
  col: number,
  state: ReturnType<typeof useGameStore.getState>,
): CellVisual {
  const key = `${row}-${col}`;
  const isGameActive = state.lastRevealResponse?.status === "active";

  if (state.loadingCellKey === key) return "loading";
  if (!isGameActive) return "inactive";

  if (state.fullBoard) {
    const type = state.fullBoard[row]?.[col];
    if (type === "mine") {
      if (state.hitMineCell?.row === row && state.hitMineCell?.col === col) {
        return "mine-hit";
      }
      return "mine";
    }
    return "gem-faded";
  }

  const isRevealed = state.revealedCells.some(
    (cell) => cell.row === row && cell.col === col,
  );
  if (isRevealed) return "gem";

  return "hidden";
}

const GridCell = memo(function GridCell({
  row,
  col,
  index,
  onCellClickRef,
}: GridCellProps) {
  const visual = useGameStore((state) => getCellVisual(row, col, state));

  const onClick = useCallback(() => {
    onCellClickRef.current?.(row, col);
  }, [onCellClickRef, row, col]);

  return (
    <Cell
      visual={visual}
      onClick={onClick}
      disabled={visual !== "hidden"}
      index={index}
    />
  );
});

export default GridCell;
