import { useEffect } from "react";
import { formatMoney } from "../../shared/lib/formatMoney";
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
import Loader from "../Loader/Loader";

const BetSide = () => {
  const { data: balanceData } = useBalanceQuery();
  const { data: activeGameData } = useActiveGameQuery();
  const { mutateAsync, isPending: isStartGamePending } = useStartGameMutation();
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
    setGameResult,
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
      setGameResult: state.setGameResult,
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

  useEffect(() => {
    if (typeof balanceData?.balance !== "number") {
      return;
    }

    setBalance(balanceData.balance);
    setBalanceLimit(balanceData.balance);
  }, [balanceData?.balance, setBalance, setBalanceLimit]);

  const profit = lastGemResponse
    ? lastGemResponse.currentMultiplier * betAmount - betAmount
    : 0;

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

  return (
    <>
      {isStartGamePending && <Loader variant="start" />}
      <div className="w-full lg:w-70 flex flex-col h-171 gap-6 bg-(--secondaryBg) p-6 rounded-[14px] border border-(--tabBg) order-2 lg:order-1 ">
        <BetAmountBox />
        <MinesCountsBox />

        <BetButton
          isGameInProgress={isGameInProgress}
          clickStartGame={onStartGame}
          clickCashOut={onCashOut}
          profit={profit}
          gemsFound={lastGemResponse?.gemsFound}
        />

        {isGameInProgress && lastGemResponse && (
          <InfoActiveGame
            minesCount={minesCount}
            currentMultiplier={lastGemResponse.currentMultiplier}
            profit={`$${formatMoney(profit)}`}
            gemsFound={lastGemResponse.gemsFound}
            nextMultiplier={lastGemResponse.nextMultiplier}
          />
        )}

        <BetBalance balance={balance} />
      </div>
    </>
  );
};

export default BetSide;
