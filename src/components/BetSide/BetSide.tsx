import BetAmountBox from "./BetAmountBox/BetAmountBox";
import MinesCountsBox from "./MinesCountsBox/MinesCountsBox";
import BetButton from "./BetButton/BetButton";
import InfoActiveGame from "./InfoActiveGame/InfoActiveGame";
import BetBalance from "./BetBalance/BetBalance";
import Loader from "../Loader/Loader";
import { useGameSession } from "./useGameSession";

const BetSide = () => {
  const {
    isGameInProgress,
    isStartGamePending,
    profit,
    profitFormatted,
    lastGemResponse,
    minesCount,
    balance,
    onStartGame,
    onCashOut,
  } = useGameSession();

  return (
    <>
      {isStartGamePending && <Loader variant="start" />}
      <div
        className="w-full lg:w-70 flex flex-col lg:h-171 gap-6 
      bg-(--secondaryBg) p-6 rounded-[14px] border border-(--tabBg)
      order-2 lg:order-1 "
      >
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
            profit={profitFormatted}
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
