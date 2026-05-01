import moneyIcon from "../../../assets/moneyBag.png";

interface BetBalanceProps {
  balance: number;
}

const BetBalance = ({ balance }: BetBalanceProps) => {
  return (
    <div className="flex items-center justify-between lg:border-t lg:border-(--tabBg) lg:pt-6 order-1 lg:order-5">
      <p className="font-normal text-[12px] ">Balance</p>
      <div className="h-6 leading-[150%] flex items-center gap-3">
        <img
          src={moneyIcon}
          alt="Money Icon"
          className="w-4 h-4"
        />
        <span className="font-(--font-family) text-(--textYellow) text-[16px]">{`$${balance}`}</span>
      </div>
    </div>
  );
};

export default BetBalance;
