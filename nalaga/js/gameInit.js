// js/gameInit.js
import { setPlayer } from "./gameState.js";
import { audioFiles } from "./audioManager.js";
import { createEnemies } from "./enemy.js";
import { component } from "./component.js";
import { showStartText } from "./ui.js";
import { myGameArea } from "./gameArea.js";

export function startGame() {
  myGameArea.start();
  const player = new component(64, 64, "img/player.png", 170, 616, "image");
  setPlayer(player);
  createEnemies(3, 7);
  showStartText();
  document.body.addEventListener("click", () => {
    audioFiles.beforeStart.play().catch(() => {});
  }, { once: true });
}

export function restartGame() {
  location.reload();
}