interface InfoActiveGameProps {
  currentMultiplier: number;
  profit: string;
  gemsFound: number;
  nextMultiplier: number;
  minesCount: number;
}

const InfoActiveGame = ({
  currentMultiplier,
  profit,
  gemsFound,
  nextMultiplier,
  minesCount,
}: InfoActiveGameProps) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Current Multiplier</p>
        <p className=" text-[20px] text-(--successColor) font-(--font-family)">
          {currentMultiplier}x
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Profit</p>
        <p className=" text-[14px] text-(--successColor) font-(--font-family)">
          {profit}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Gems Found</p>
        <p className=" text-[14px] text-white font-(--font-family)">
          {gemsFound} / {25 - minesCount}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Next Multiplier</p>
        <p className=" text-[14px]  font-(--font-family)">{nextMultiplier}x</p>
      </div>
    </div>
  );
};

export default InfoActiveGame;
