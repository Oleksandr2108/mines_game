import { useEffect } from "react";
import { useBalanceQuery } from "../../entities/game";
import { useGameStore } from "../../entities/game";
import moneyIcon from "../../assets/moneyBag.png";
import BetAmountBox from "./BetAmountBox/BetAmountBox";
import MinesCountsBox from "./MinesCountsBox/MinesCountsBox";

const BetSide = () => {
  const { data: balanceData, isLoading, isError } = useBalanceQuery();

  const setBalanceLimit = useGameStore((state) => state.setBalanceLimit);

  useEffect(() => {
    setBalanceLimit(balanceData?.balance ?? 0);
  }, [balanceData?.balance, setBalanceLimit]);

  if (isLoading) {
    return <div>Loading balance...</div>;
  }

  if (isError) {
    return <div>Failed to load balance</div>;
  }

  return (
    <div className="w-70 flex flex-col h-full gap-6 bg-(--secondaryBg) p-6 rounded-[14px] border border-(--tabBg) ">
      <BetAmountBox />
      <MinesCountsBox />

      <div className="flex items-center justify-between border-t border-(--tabBg) pt-6">
        <p className="font-normal text-[12px] ">Balance</p>
        <div className="h-6 leading-[150%] flex items-center gap-3">
          <img
            src={moneyIcon}
            alt="Money Icon"
            className="w-4 h-4"
          />
          <span className="font-(--font-family) text-(--textYellow) text-[16px]">{`$${balanceData?.balance}`}</span>
        </div>
      </div>
    </div>
  );
};

export default BetSide;
