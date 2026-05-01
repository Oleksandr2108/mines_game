import { cn } from "../../../utils/styleUtils";

export type CellVisual =
  | "inactive"
  | "hidden"
  | "loading"
  | "gem"
  | "mine"
  | "mine-hit"
  | "gem-faded";

interface CellProps {
  visual: CellVisual;
  onClick?: () => void;
  disabled?: boolean;
  index?: number; // for stagger
}

const Cell = ({ visual, onClick, disabled, index = 0 }: CellProps) => {
  const interactive = visual === "hidden" && !disabled;

  const base =
    "aspect-square w-full select-none rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all duration-150 border";

  const styles: Record<CellVisual, string> = {
    inactive: "bg-(--tabBg) ",
    hidden: cn(
      "bg-(--tabBg) cursor-pointer text-transparent",
      "  hover:scale-105 hover:-translate-y-0.5",
      "active:scale-95",
    ),
    loading: "bg-(--tabBg) cursor-wait border-(--tabBg)",
    gem: "bg-(--winCell) border-(--successColor)  shadow-[0_0_20px_0_rgb(34_197_94/0.3)] anim-pop",
    mine: "bg-(--loseCell)  anim-flip-in",
    "mine-hit":
      "bg-(--loseCell) border-(--errorColor)  shadow-[0_0_50px_0_rgb(239_68_68/0.4)] anim-shake anim-mine-flash",
    "gem-faded":
      "bg-(--winCell) border-(--successColor)  shadow-[0_0_20px_0_rgb(34_197_94/0.3)] anim-flip-in",
  };

  return (
    <button
      type="button"
      onClick={interactive ? onClick : undefined}
      disabled={!interactive}
      aria-label={
        visual === "gem" || visual === "gem-faded"
          ? "Gem"
          : visual === "mine" || visual === "mine-hit"
            ? "Mine"
            : "Hidden cell"
      }
      style={
        visual === "mine" || visual === "gem-faded"
          ? { animationDelay: `${index * 0.04}s` }
          : undefined
      }
      className={cn(base, styles[visual])}
    >
      {visual === "gem" || visual === "gem-faded" ? (
        <span className="drop-shadow">💎</span>
      ) : visual === "mine" || visual === "mine-hit" ? (
        <span>💣</span>
      ) : visual === "loading" ? (
        <svg
          className="h-6 w-6 animate-spin text-white/60"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : null}
    </button>
  );
};

export default Cell;
