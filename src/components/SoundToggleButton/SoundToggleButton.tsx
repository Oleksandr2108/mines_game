import { useState } from "react";
import soundBtnIcon from "../../assets/soundBtn.svg";
import {
  getSoundEnabled,
  toggleSoundEnabled,
} from "../../shared/lib/useGameSounds";

export default function SoundToggleButton() {
  const [enabled, setEnabled] = useState(getSoundEnabled());

  const onToggle = () => {
    const next = toggleSoundEnabled();
    setEnabled(next);
  };

  return (
    <div
      onClick={onToggle}
      className="flex items-center justify-center relative z-50 h-11 w-11 ml-auto  mb-4 cursor-pointer"
    >
      <img
        src={soundBtnIcon}
        alt=""
        aria-hidden="true"
        className={`mx-auto h-5 w-5 ${enabled ? "opacity-100" : "opacity-45"}`}
      />
      {!enabled && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-30deg] rounded bg-(--errorColor)" />
      )}
    </div>
  );
}
