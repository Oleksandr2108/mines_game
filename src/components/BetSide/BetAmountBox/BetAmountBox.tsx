import { useGameStore } from "../../../entities/game";
import DollarIcon from "../../../assets/dollar.svg";
import BoxTag from "../BoxTag/BoxTag";
import Title from "../../Title/Title";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000, 2500];

const BetAmountBox = () => {
  const { betAmount, setBetAmount, lastRevealResponse } = useGameStore();
  const isGameActive = lastRevealResponse?.status === "active";

  const handleBetChange = (value: string) => {
    if (/^-?\d*([.,]\d{0,2})?$/.test(value)) {
      setBetAmount(Number(value));
    }
  };

  return (
    <div className="order-2 lg:order-1">
      <Title text="Bet Amount" />
      <div className="relative mt-4">
        <input
          id="bet"
          type="text"
          disabled={isGameActive}
          inputMode="decimal"
          min={0}
          step={1}
          value={betAmount}
          onChange={(e) => handleBetChange(e.target.value)}
          className="text-right lg:text-left w-full relative border border-(--tagBg) bg-(--blockBg)/50 rounded-[10px] px-4 py-3 outline-none"
        />
        <img
          src={DollarIcon}
          alt="Money Icon"
          className="w-4 h-4 absolute top-1/2 left-3 lg:left-auto lg:right-3 -translate-y-1/2"
        />
      </div>

      <div className="flex lg:hidden flex-wrap items-center justify-center gap-2 mt-2">
        {PRESET_AMOUNTS.map((amount) => (
          <div
            key={amount}
            className="w-21"
          >
            <BoxTag
              text={`$${amount}`}
              disabled={isGameActive}
              onClick={() => setBetAmount(amount)}
              active={betAmount === amount}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 mt-2">
        <BoxTag
          text="1/2"
          disabled={isGameActive}
          onClick={() => useGameStore.getState().halfBet()}
        />
        <BoxTag
          text="x2"
          disabled={isGameActive}
          onClick={() => useGameStore.getState().doubleBet()}
        />
        <BoxTag
          text="Max"
          disabled={isGameActive}
          onClick={() => useGameStore.getState().maxBet()}
        />
      </div>
    </div>
  );
};

export default BetAmountBox;
