import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useGameStore, useRevealCellMutation } from "../../entities/game";
import { useIsGameActive } from "../../entities/game";
import type { CellVisual } from "./Cell/Cell";
import { playGemSound, playMineSound } from "../../shared/lib/useGameSounds";

const GRID_SIZE = 5;

function cellKey(row: number, col: number) {
  return `${row}-${col}`;
}

export function useGridState() {
  const { mutateAsync: revealCell } = useRevealCellMutation();
  const {
    gameId,
    betAmount,
    revealedCells,
    fullBoard,
    hitMineCell,
    loadingCellKey,
    setRevealedCells,
    setFullBoard,
    setHitMineCell,
    setLoadingCellKey,
    setLastRevealResponse,
    setGameResult,
  } = useGameStore(
    useShallow((s) => ({
      gameId: s.gameId,
      betAmount: s.betAmount,
      revealedCells: s.revealedCells,
      fullBoard: s.fullBoard,
      hitMineCell: s.hitMineCell,
      loadingCellKey: s.loadingCellKey,
      setRevealedCells: s.setRevealedCells,
      setFullBoard: s.setFullBoard,
      setHitMineCell: s.setHitMineCell,
      setLoadingCellKey: s.setLoadingCellKey,
      setLastRevealResponse: s.setLastRevealResponse,
      setGameResult: s.setGameResult,
    })),
  );

  const isGameActive = useIsGameActive();

  const revealedMap = useMemo(() => {
    const map = new Set<string>();
    for (const cell of revealedCells) {
      map.add(cellKey(cell.row, cell.col));
    }
    return map;
  }, [revealedCells]);

  const handleCellClick = async (row: number, col: number) => {
    if (!gameId || !isGameActive) return;
    if (fullBoard) return;

    const key = cellKey(row, col);
    if (revealedMap.has(key)) return;

    setLoadingCellKey(key);

    try {
      const response = await revealCell({
        gameId,
        payload: { row, col },
      });
      setLastRevealResponse(response);

      if (response.result === "gem") {
        playGemSound();
        setRevealedCells(response.revealedCells);
        setHitMineCell(null);
      } else {
        playMineSound();
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

  const getCellVisual = (row: number, col: number): CellVisual => {
    const key = cellKey(row, col);

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

    if (revealedMap.has(key)) return "gem";
    return "hidden";
  };

  const isCellDisabled =
    !isGameActive || Boolean(fullBoard) || loadingCellKey !== null;

  return { getCellVisual, handleCellClick, isCellDisabled, GRID_SIZE };
}
