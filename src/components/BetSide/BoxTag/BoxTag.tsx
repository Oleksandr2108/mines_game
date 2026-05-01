interface BoxTagProps {
  text: string | number;
  onClick?: () => void;
  textSize?: "small" | "large";
  active?: boolean;
  disabled?: boolean;
}

const BoxTag: React.FC<BoxTagProps> = ({
  text,
  onClick,
  textSize = "small",
  active = false,
  disabled = false,
}) => {
  return (
    <div
      className={`flex items-center justify-center py-2 w-full bg-(--tabBg) rounded-[10px] ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${
        textSize === "small" ? "text-[11px]" : "text-[14px]"
      }  text-(--textColor) ${active ? "bg-(--tabFocusBg) text-white" : "bg-(--tabBg)"} `}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </div>
  );
};

export default BoxTag;
