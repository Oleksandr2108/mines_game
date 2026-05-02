import startSound from "../../assets/sound/mines-start.wav";
import gemSound from "../../assets/sound/mines-gem.wav";
import revealSound from "../../assets/sound/mines-reveal.wav";
import cashOutSound from "../../assets/sound/mines-cashout.wav";
import mineSound from "../../assets/sound/mines-mine.wav";
import tickSound from "../../assets/sound/mines-tick.wav";

function playSound(src: string) {
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
