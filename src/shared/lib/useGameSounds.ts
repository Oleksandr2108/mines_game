import startSound from "../../assets/sound/mines-start.wav";
import gemSound from "../../assets/sound/mines-gem.wav";
import revealSound from "../../assets/sound/mines-reveal.wav";
import cashOutSound from "../../assets/sound/mines-cashout.wav";
import mineSound from "../../assets/sound/mines-mine.wav";
import tickSound from "../../assets/sound/mines-tick.wav";

const SOUND_STORAGE_KEY = "mines-game-sound-enabled";

let isSoundEnabled = true;

if (typeof window !== "undefined") {
  const saved = window.localStorage.getItem(SOUND_STORAGE_KEY);
  if (saved === "false") {
    isSoundEnabled = false;
  }
}

export function getSoundEnabled() {
  return isSoundEnabled;
}

export function setSoundEnabled(enabled: boolean) {
  isSoundEnabled = enabled;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  }
}

export function toggleSoundEnabled() {
  const next = !isSoundEnabled;
  setSoundEnabled(next);
  return next;
}

function playSound(src: string) {
  if (!isSoundEnabled) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}

export function playStartSound() {
  playSound(startSound);
}

export function playGemSound() {
  playSound(gemSound);
}

export function playRevealSound() {
  playSound(revealSound);
}

export function playCashOutSound() {
  playSound(cashOutSound);
}

export function playMineSound() {
  playSound(mineSound);
}

export function playTickSound() {
  playSound(tickSound);
}
