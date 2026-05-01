type LoaderVariant = "page" | "start";

interface LoaderProps {
  variant: LoaderVariant;
}

const dots = ["#3b82f6", "#22c55e", "#fbbf24"];

const Loader = ({ variant }: LoaderProps) => {
  if (variant === "start") {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
        <div
          className="anim-overlay flex w-full max-w-[384px] flex-col items-center gap-9 rounded-[22px] border border-(--tabBg) py-8"
          style={{ background: "var(--secondaryBg)" }}
        >
          <div className="flex items-center gap-6">
            {dots.map((color, index) => (
              <span
                key={color}
                className="loader-dot"
                style={{
                  backgroundColor: color,
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </div>

          <p className="text-center text-[16px] leading-none font-bold tracking-[0.03em] text-white">
            STARTING GAME...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center"
      style={{ background: "#080f1f" }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-6">
          {dots.map((color, index) => (
            <span
              key={color}
              className="loader-dot"
              style={{
                backgroundColor: color,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-white text-[20px] leading-none tracking-[0.2em] font-bold">
            MINES
          </h1>
          <p className="text-[12px] leading-none">Loading game...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
