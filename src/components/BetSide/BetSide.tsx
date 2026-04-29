import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  useActiveGameQuery,
  useBalanceQuery,
  useStartGameMutation,
} from "../../entities/game";
import { useGameStore } from "../../entities/game";
import BetAmountBox from "./BetAmountBox/BetAmountBox";
import MinesCountsBox from "./MinesCountsBox/MinesCountsBox";
import BetButton from "./BetButton/BetButton";
import InfoActiveGame from "./InfoActiveGame/InfoActiveGame";
import BetBalance from "./BetBalance/BetBalance";
import { useGameCashOutMutation } from "../../entities/game/queries/useGameCashOutMutation";

const BetSide = () => {
  const { data: balanceData, isLoading, isError } = useBalanceQuery();
  const { data: activeGameData } = useActiveGameQuery();
  const { mutateAsync } = useStartGameMutation();
  const { mutateAsync: cashOutMutateAsync } = useGameCashOutMutation();
  const {
    gameId,
    betAmount,
    minesCount,
    balance,
    setGameId,
    setMinesCount,
    setBetAmount,
    setRevealedCells,
    setFullBoard,
    setHitMineCell,
    setLastRevealResponse,
    setBalance,
    lastRevealResponse,
    setBalanceLimit,
  } = useGameStore(
    useShallow((state) => ({
      gameId: state.gameId,
      betAmount: state.betAmount,
      minesCount: state.minesCount,
      balance: state.balance,
      setGameId: state.setGameId,
      setMinesCount: state.setMinesCount,
      setBetAmount: state.setBetAmount,
      setRevealedCells: state.setRevealedCells,
      setFullBoard: state.setFullBoard,
      setHitMineCell: state.setHitMineCell,
      setLastRevealResponse: state.setLastRevealResponse,
      setBalance: state.setBalance,
      lastRevealResponse: state.lastRevealResponse,
      setBalanceLimit: state.setBalanceLimit,
    })),
    );
  
  const lastGemResponse =
    lastRevealResponse?.result === "gem" ? lastRevealResponse : null;
  const isGameInProgress =
    activeGameData?.status === "active" ||
    lastRevealResponse?.status === "active";
  
  

  const onStartGame = async () => {
    try {
      const response = await mutateAsync({
        betAmount: betAmount,
        minesCount: minesCount,
      });
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
    if (!gameId) {
      return;
    }

    try {
      const response = await cashOutMutateAsync(gameId);
      setFullBoard(response.fullBoard);
      setHitMineCell(null);
      setLastRevealResponse(null);
    } catch (error) {
      console.error("Failed to cash out:", error);
    }
  };

  useEffect(() => {
    if (typeof balanceData?.balance !== "number") {
      return;
    }

    setBalance(balanceData.balance);
    setBalanceLimit(balanceData.balance);
  }, [balanceData?.balance, setBalance, setBalanceLimit]);

  useEffect(() => {
    if (!activeGameData) {
      return;
    }

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

  if (isLoading) {
    return <div>Loading balance...</div>;
  }

  if (isError) {
    return <div>Failed to load balance</div>;
  }

  return (
    <div className="w-70 flex flex-col h-171 gap-6 bg-(--secondaryBg) p-6 rounded-[14px] border border-(--tabBg) ">
      <BetAmountBox />
      <MinesCountsBox />

      <BetButton
        isGameInProgress={isGameInProgress}
        clickStartGame={onStartGame}
        clickCashOut={onCashOut}
        profit={
          lastGemResponse
            ? lastGemResponse.currentMultiplier * betAmount - betAmount
            : 0
        }
      />

      {isGameInProgress && lastGemResponse && (
        <InfoActiveGame
          currentMultiplier={lastGemResponse.currentMultiplier}
          profit={lastGemResponse.currentMultiplier * betAmount - betAmount}
          gemsFound={lastGemResponse.gemsFound}
          nextMultiplier={lastGemResponse.nextMultiplier}
        />
      )}

      <BetBalance balance={balance} />
    </div>
  );
};

export default BetSide;
