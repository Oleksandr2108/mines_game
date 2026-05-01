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
          className={`w-full rounded-[10px] uppercase py-3 text-white text-[14px] text-center ${gemsFound === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          style={{ background: "var(--tabFocusBg)" }}
          disabled={gemsFound === 0}
          onClick={clickCashOut}
        >
          Cash Out{profit ? `-$${formatMoney(profit)}` : ""}
        </button>
      ) : (
        <button
          className="w-full rounded-[10px]
          uppercase py-3 text-white text-[14px] text-center cursor-pointer"
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
