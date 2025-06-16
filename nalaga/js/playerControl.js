// playerControl.js
import { player } from "./gameState.js";

export function updatePlayer() {
  player.speedX = 0;
  if (myGameArea.keys && myGameArea.keys[37]) player.speedX = -2.5;
  if (myGameArea.keys && myGameArea.keys[39]) player.speedX = 2.5;
  player.newPos();
  player.update();
}
