import { useGameStore } from "../../../entities/game";
import DollarIcon from "../../../assets/dollar.svg";
import BoxTag from "../BoxTag/BoxTag";
import Title from "../../Title/Title";

const BetAmountBox = () => {
  const { betAmount, setBetAmount } = useGameStore();

  const handleBetChange = (value: string) => {
    if (/^-?\d*([.,]\d{0,2})?$/.test(value)) {
      setBetAmount(Number(value));
    }
  };

  return (
    <div>
      <Title text="Bet Amount" />
      <div className="relative mt-4">
        <input
          id="bet"
          type="text"
          inputMode="decimal"
          min={0}
          step={1}
          value={betAmount}
          onChange={(e) => handleBetChange(e.target.value)}
          className={
            "w-full relative border border-(--tagBg) bg-(--blockBg)/50 rounded-[10px] px-4 py-3   outline-none "
          }
        />
        <img
          src={DollarIcon}
          alt="Money Icon"
          className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2"
        />
      </div>

      <div className="flex items-center justify-between gap-2 mt-2">
        <BoxTag
          text="1/2"
          onClick={() => useGameStore.getState().halfBet()}
        />
        <BoxTag
          text="x2"
          onClick={() => useGameStore.getState().doubleBet()}
        />
        <BoxTag
          text="Max"
          onClick={() => useGameStore.getState().maxBet()}
        />
      </div>
    </div>
  );
};

export default BetAmountBox;
