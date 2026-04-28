import { MINE_COUNT_OPTIONS, useGameStore } from "../../../entities/game";
import BoxTag from "../BoxTag/BoxTag";


const MinesCountsBox = () => {
    const { minesCount, setMinesCount } = useGameStore();
  return (
    
      <div>
        <h1 className="text-(--textColor) uppercase leading-[150%] ">Mines</h1>
        <div className="flex items-center justify-between gap-2 mt-2">
          {MINE_COUNT_OPTIONS.map((option, index) => (
            <BoxTag
              key={index}
              text={option}
              onClick={() => setMinesCount(option)}
              active={minesCount === option}
              textSize="large"
            />
          ))}
        </div>
      </div>
  )

}

export default MinesCountsBox;