import { useCallback } from "react";
import { useGameStore, useRevealCellMutation } from "../../entities/game";
import { playGemSound, playMineSound } from "../../shared/lib/useGameSounds";

const GRID_SIZE = 5;

export function useGridState() {
  const { mutateAsync: revealCell } = useRevealCellMutation();
  const handleCellClick = useCallback(
    async (row: number, col: number) => {
      const state = useGameStore.getState();
      const {
        gameId,
        betAmount,
        revealedCells,
        fullBoard,
        lastRevealResponse,
        setRevealedCells,
        setFullBoard,
        setHitMineCell,
        setLoadingCellKey,
        setLastRevealResponse,
        setGameResult,
      } = state;
      const isGameActive = lastRevealResponse?.status === "active";

      if (!gameId || !isGameActive) return;
      if (fullBoard) return;

      const key = `${row}-${col}`;
      const isAlreadyRevealed = revealedCells.some(
        (cell) => cell.row === row && cell.col === col,
      );
      if (isAlreadyRevealed) return;

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
    },
    [revealCell],
  );

  return { handleCellClick, GRID_SIZE };
}
