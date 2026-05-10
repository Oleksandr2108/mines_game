interface BoxTagProps {
  text: string | number;
  onClick?: () => void;
  textSize?: "small" | "large";
  active?: boolean;
}

const BoxTag: React.FC<BoxTagProps> = ({
  text,
  onClick,
  textSize = "small",
  active = false,
}) => {
  return (
    <div
      className={`flex items-center justify-center py-2 w-full bg-(--tabBg) rounded-[10px] cursor-pointer ${
        textSize === "small" ? "text-[11px]" : "text-[14px]"
      }  text-(--textColor) ${active ? "bg-(--tabFocusBg) text-white" : "bg-(--tabBg)"} `}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default BoxTag;
