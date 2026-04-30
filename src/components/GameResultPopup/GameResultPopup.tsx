import type { GameResult } from "../../entities/game/model/types";
import BombIcon from "../../assets/bomb.png";
import { formatMoney } from "../../shared/lib/formatMoney";

interface GameResultPopupProps {
  result: GameResult;
  onClose: () => void;
}

const GameResultPopup = ({ result, onClose }: GameResultPopupProps) => {
  const isMine = result.type === "mine";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
    >
      <div
        className="relative flex flex-col items-center gap-3 rounded-2xl border p-8 w-[384px]"
        style={{
          background: "var(--secondaryBg)",
          borderColor: isMine ? "var(--errorColor)" : "var(--successColor)",
          boxShadow: isMine
            ? "0 0 24px 4px rgba(239,68,68,0.35)"
            : "0 0 24px 4px rgba(34,197,94,0.35)",
        }}
      >
        {isMine ? (
          <img
            src={BombIcon}
            alt="Bomb"
            className="w-12 h-12"
          />
        ) : (
          <span className="text-4xl">💎</span>
        )}

        <p className="text-white text-[20px]">
          {isMine ? "Busted!" : "Cashed Out!"}
        </p>

        {isMine ? (
          <p
            className="text-[18px] font-(--font-family)"
            style={{ color: "var(--errorColor)" }}
          >
            ${formatMoney(result.betAmount)} lost
          </p>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p
              className="text-[32px] font-(--font-family)"
              style={{ color: "var(--successColor)" }}
            >
              {formatMoney(result.multiplier)}x
            </p>
            <p className="text-white text-[18px]">
              ${formatMoney(result.winAmount)}
            </p>
            <p
              className="text-[14px] font-(--font-family)"
              style={{ color: "var(--successColor)" }}
            >
              +${formatMoney(result.profit)} profit
            </p>
          </div>
        )}

        <button
          className="mt-6 w-full rounded-[14px] uppercase py-3 text-white text-[14px] cursor-pointer"
          style={{
            background: isMine ? "var(--errorColor)" : "var(--activeButtonBg)",
          }}
          onClick={onClose}
        >
          {isMine ? "Try Again" : "Play Again"}
        </button>
      </div>
    </div>
  );
};

export default GameResultPopup;
