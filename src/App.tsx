import BetSide from "./components/BetSide/BetSide";
import MinesGrid from "./components/MinesGrid/MinesGrid";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <BetSide />
      <MinesGrid />
    </div>
  );
}
