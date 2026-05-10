import { formatMoney } from "../../../shared/lib/formatMoney";

interface BetButtonProps {
  clickStartGame?: () => void;
  clickCashOut?: () => void;
  isGameInProgress: boolean;
  profit?: number;
  gemsFound?: number;
}

const BetButton = ({
  clickStartGame,
  clickCashOut,
  isGameInProgress,
  profit,
  gemsFound = 0,
}: BetButtonProps) => {
  return (
    <>
      {isGameInProgress ? (
        <button
          className={`w-full rounded-[10px] uppercase py-3 text-white text-[14px] text-center 
            ${gemsFound === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
             order-4 lg:order-3
             fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]  z-10
          lg:static lg:translate-x-0 lg:w-full
             
             `}
          style={{ background: "var(--tabFocusBg)" }}
          onClick={gemsFound === 0 ? undefined : clickCashOut}
        >
          Cash Out{profit ? `-$${formatMoney(profit)}` : ""}
        </button>
      ) : (
        <button
          className=" rounded-[10px]
          uppercase py-3 text-white text-[14px] text-center cursor-pointer
          order-4 lg:order-3
          fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]  z-10
          lg:static lg:translate-x-0 lg:w-full
          "
          style={{ background: "var(--activeButtonBg)" }}
          onClick={clickStartGame}
        >
          Start Game
        </button>
      )}
    </>
  );
};

export default BetButton;
