import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  useActiveGameQuery,
  useBalanceQuery,
  useStartGameMutation,
} from "../../entities/game";
import { useGameStore } from "../../entities/game";
import { GAME_STATUS_ACTIVE } from "../../entities/game/model/constants";
import { useGameCashOutMutation } from "../../entities/game/queries/useGameCashOutMutation";
import { formatMoney } from "../../shared/lib/formatMoney";
import {
  playStartSound,
  playCashOutSound,
} from "../../shared/lib/useGameSounds";

export function useGameSession() {
  const { data: balanceData } = useBalanceQuery();
  const { data: activeGameData } = useActiveGameQuery();
  const balance = balanceData?.balance ?? 0;

  const { mutateAsync: startGameMutate, isPending: isStartGamePending } =
    useStartGameMutation();
  const { mutateAsync: cashOutMutate } = useGameCashOutMutation();

  const {
    gameId,
    betAmount,
    minesCount,
    setGameId,
    setMinesCount,
    setBetAmount,
    setRevealedCells,
    setFullBoard,
    setHitMineCell,
    setLastRevealResponse,
    lastRevealResponse,
    setBalanceLimit,
    setGameResult,
  } = useGameStore(
    useShallow((state) => ({
      gameId: state.gameId,
      betAmount: state.betAmount,
      minesCount: state.minesCount,
      setGameId: state.setGameId,
      setMinesCount: state.setMinesCount,
      setBetAmount: state.setBetAmount,
      setRevealedCells: state.setRevealedCells,
      setFullBoard: state.setFullBoard,
      setHitMineCell: state.setHitMineCell,
      setLastRevealResponse: state.setLastRevealResponse,
      lastRevealResponse: state.lastRevealResponse,
      setBalanceLimit: state.setBalanceLimit,
      setGameResult: state.setGameResult,
    })),
  );

  const lastGemResponse =
    lastRevealResponse?.result === "gem" ? lastRevealResponse : null;

  const isGameInProgress =
    activeGameData?.status === GAME_STATUS_ACTIVE ||
    lastRevealResponse?.status === GAME_STATUS_ACTIVE;

  const profit = lastGemResponse
    ? lastGemResponse.currentMultiplier * betAmount - betAmount
    : 0;

  const profitFormatted = `$${formatMoney(profit)}`;

  useEffect(() => {
    if (typeof balanceData?.balance !== "number") return;
    setBalanceLimit(balanceData.balance);
  }, [balanceData?.balance, setBalanceLimit]);

  useEffect(() => {
    if (!activeGameData) return;
    if (gameId !== activeGameData.gameId) {
      setGameId(activeGameData.gameId);
    }
    setMinesCount(activeGameData.minesCount);
    setBetAmount(activeGameData.betAmount);
    setRevealedCells(activeGameData.revealedCells);
    setLastRevealResponse({
      result: "gem",
      currentMultiplier: activeGameData.currentMultiplier,
      gemsFound: activeGameData.gemsFound,
      nextMultiplier: activeGameData.nextMultiplier,
      revealedCells: activeGameData.revealedCells,
      status: "active",
    });
  }, [
    activeGameData,
    gameId,
    setBetAmount,
    setGameId,
    setLastRevealResponse,
    setMinesCount,
    setRevealedCells,
  ]);

  const onStartGame = async () => {
    try {
      const response = await startGameMutate({ betAmount, minesCount });
      playStartSound();
      setGameId(response.gameId);
      setLastRevealResponse({
        result: "gem",
        currentMultiplier: 0,
        gemsFound: 0,
        nextMultiplier: 0,
        revealedCells: response.revealedCells,
        status: "active",
      });
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  const onCashOut = async () => {
    if (!gameId) return;
    try {
      const response = await cashOutMutate(gameId);
      playCashOutSound();
      setFullBoard(response.fullBoard);
      setHitMineCell(null);
      setLastRevealResponse(null);
      setGameResult({
        type: "cashout",
        multiplier: response.cashedOutMultiplier,
        winAmount: response.winAmount,
        profit: response.profit,
      });
    } catch (error) {
      console.error("Failed to cash out:", error);
    }
  };

  return {
    isGameInProgress,
    isStartGamePending,
    profit,
    profitFormatted,
    lastGemResponse,
    minesCount,
    balance,
    betAmount,
    onStartGame,
    onCashOut,
  };
}
