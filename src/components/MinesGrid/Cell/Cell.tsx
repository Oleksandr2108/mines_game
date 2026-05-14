import { memo } from "react";
import { cn } from "../../../utils/styleUtils";
import SpinnerIcon from "./SpinnerIcon";

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
  index?: number;
}

const Cell = ({ visual, onClick, index = 0 }: CellProps) => {
  const interactive = visual === "hidden";

  const getAriaLabel = (): string => {
    if (visual === "gem" || visual === "gem-faded") return "Gem";
    if (visual === "mine" || visual === "mine-hit") return "Mine";
    return "Hidden cell";
  };

  const getAnimationStyle = (): React.CSSProperties | undefined => {
    if (visual === "mine" || visual === "gem-faded") {
      return { animationDelay: `${index * 0.04}s` };
    }
    return undefined;
  };

  const base =
    "aspect-square w-full select-none rounded-xl flex items-center justify-center text-2xl lg:text-3xl font-bold transition-all duration-150 border";

  const styles: Record<CellVisual, string> = {
    inactive: "bg-(--tabBg) border-(--borderCell)",
    hidden: cn(
      "bg-(--tabBg) cursor-pointer text-transparent border-(--borderCell)",
      "  hover:scale-105 hover:-translate-y-0.5",
      "active:scale-95",
    ),
    loading: "bg-(--tabBg) cursor-wait border-(--borderCell)",
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
      aria-label={getAriaLabel()}
      style={getAnimationStyle()}
      className={cn(base, styles[visual])}
    >
      {visual === "gem" || visual === "gem-faded" ? (
        <span className="drop-shadow">💎</span>
      ) : visual === "mine" || visual === "mine-hit" ? (
        <span>💣</span>
      ) : visual === "loading" ? (
        <SpinnerIcon />
      ) : null}
    </button>
  );
};

export default memo(Cell);
