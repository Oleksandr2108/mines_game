import { MINE_COUNT_OPTIONS, useGameStore } from "../../../entities/game";
import BoxTag from "../BoxTag/BoxTag";


const MinesCountsBox = () => {
  const { minesCount, setMinesCount, lastRevealResponse } = useGameStore();
  const isGameActive = lastRevealResponse?.status === "active";

  return (
    
      <div className="order-3 lg:order-2">
        <h1 className="text-(--textColor) uppercase leading-[150%] ">Mines</h1>
        <div className="flex items-center justify-between gap-2 mt-2">
          {MINE_COUNT_OPTIONS.map((option, index) => (
            <BoxTag
              key={index}
              text={option}
              onClick={() => setMinesCount(option)}
              active={minesCount === option}
              textSize="large"
              disabled={isGameActive}
            />
          ))}
        </div>
      </div>
  )

}

export default MinesCountsBox;