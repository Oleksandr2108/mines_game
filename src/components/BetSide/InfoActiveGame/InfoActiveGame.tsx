interface InfoActiveGameProps {
  currentMultiplier: number;
  profit: number;
  gemsFound: number;
  nextMultiplier: number;
}

const InfoActiveGame = ({
  currentMultiplier,
  profit,
  gemsFound,
  nextMultiplier,
}: InfoActiveGameProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Current Multiplier</p>
        <p className=" text-[20px] text-(--accessColor) font-(--font-family)">
          {currentMultiplier}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Profit</p>
        <p className=" text-[14px] text-(--accessColor) font-(--font-family)">
          {profit.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Gems Found</p>
        <p className=" text-[14px] text-white font-(--font-family)">
          {gemsFound}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-[12px] ">Next Multiplier</p>
        <p className=" text-[14px]  font-(--font-family)">{nextMultiplier}</p>
      </div>
    </div>
  );
};

export default InfoActiveGame;
