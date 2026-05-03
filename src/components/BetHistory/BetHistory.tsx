import type { GameHistoryItem } from "../../entities/game";
import { useGameHistoryQuery } from "../../entities/game/queries/useGameHistoryQuery";
import Title from "../Title/Title";
import BombIcon from "../../assets/bomb.png";
import { formatMoney } from "../../shared/lib/formatMoney";

const BetHistory = () => {
  const { data: historyData, isLoading, isError } = useGameHistoryQuery();

  return (
    <div className="w-full lg:w-70 lg:h-171 bg-(--secondaryBg) p-6 rounded-[14px] border border-(--tabBg) order-1 lg:order-3">
      <Title text="Recent Games" />
      {isLoading && <p>Loading history...</p>}
      {isError && <p>Failed to load history</p>}
      {historyData && historyData.games.length === 0 && (
        <p>No games played yet.</p>
      )}
      {historyData && historyData.games.length > 0 && (
        <div className="mt-4 flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[calc(100%-3rem)] lg:pr-1">
          {historyData.games.map((game: GameHistoryItem) =>
            (() => {
              const isLost = game.status === "lost";
              const isWon = game.status === "won";
              const multiplierText =
                typeof game.multiplier === "number"
                  ? `${game.multiplier}x`
                  : "-";

              return (
                <div
                  key={game.gameId}
                  className="border bg-(--blockBg) border-(--tabBg) rounded-[10px] p-3 min-w-35 lg:min-w-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[12px]">
                      ${formatMoney(game.betAmount)}
                    </p>
                    <p className="text-[14px] font-(--font-family) text-(--successColor)">
                      {isLost ? (
                        <img
                          className="w-4 h-4"
                          src={BombIcon}
                          alt="Bomb"
                        />
                      ) : (
                        multiplierText
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {isLost ? (
                      <>
                        <p className="text-[10px] uppercase">Bust</p>
                        <p className="text-[12px] text-(--errorColor) font-(--font-family)">
                          -${formatMoney(game.betAmount)}
                        </p>
                      </>
                    ) : isWon ? (
                      <>
                        <p className="text-[10px] uppercase">Win</p>
                        <p className="text-[12px] text-(--successColor) font-(--font-family)">
                          +$
                          {game.profit != null
                            ? formatMoney(game.profit)
                            : "0.00"}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[10px] uppercase">In progress</p>
                        <p className="text-[12px] text-white/70 font-(--font-family)">
                          ${formatMoney(game.betAmount)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })(),
          )}
        </div>
      )}
    </div>
  );
};

export default BetHistory;
