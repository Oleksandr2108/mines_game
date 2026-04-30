import { formatMoney } from "../../../shared/lib/formatMoney";

interface BetButtonProps {
  clickStartGame?: () => void;
  clickCashOut?: () => void;
  isGameInProgress: boolean;
  profit?: number;
}

const BetButton = ({
  clickStartGame,
  clickCashOut,
  isGameInProgress,
  profit,
}: BetButtonProps) => {
  return (
    <>
      {isGameInProgress ? (
        <button
          className="w-full rounded-[10px] 
          uppercase py-3 text-white text-[14px] text-center"
          style={{ background: "var(--tabFocusBg)" }}
          onClick={clickCashOut}
        >
          Cash Out{profit ? `-$${formatMoney(profit)}` : ""}
        </button>
      ) : (
        <button
          className="w-full rounded-[10px]
          uppercase py-3 text-white text-[14px] text-center "
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
