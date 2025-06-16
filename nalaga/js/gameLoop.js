// 📁 js/gameLoop.js
// js/gameLoop.js
// import { gameState, setElapsedTime, startTime, nextWaveTime, setNextWaveTime, player, enemies, bullets, enemyBullets, lives, setGameState } from "./gameState.js";
// import { myGameArea } from "./gameArea.js";
// import { updateEnemies } from "./enemyBehavior.js";
// import { updateBullets, updateEnemyBullets } from "./bulletMovement.js";
// import { detectBulletCollisions, detectEnemyBulletHit } from "./collision.js";
// import { drawScore, drawTimer, drawLives, showStartText } from "./ui.js";
// import { createEnemies } from "./enemy.js";

// export function updateGameArea() {
//   myGameArea.clear();

//   if (gameState === "waiting") {
//     showStartText();
//     return;
//   }

//   if (gameState === "gameover") {
//     return;
//   }

//   const timePassed = Math.floor((Date.now() - startTime) / 1000);
//   setElapsedTime(timePassed);

//   if (timePassed >= nextWaveTime) {
//     createEnemies(1, 7);
//     setNextWaveTime(nextWaveTime + 7);
//   }

//   player.newPos();
//   player.update();
//   updateEnemies();
//   updateBullets();
//   updateEnemyBullets();
//   detectBulletCollisions();
//   detectEnemyBulletHit();
//   drawScore();
//   drawTimer();
//   drawLives();
// }

import { gameState, setElapsedTime, startTime, nextWaveTime, setNextWaveTime, player, enemies, bullets, enemyBullets, lives, setGameState } from "./gameState.js";
import { myGameArea } from "./gameArea.js";
import { updateEnemies } from "./enemyBehavior.js";
import { updateBullets, updateEnemyBullets } from "./bulletMovement.js";
import { detectBulletCollisions, detectEnemyBulletHit } from "./collision.js";
import { drawScore, drawTimer, drawLives, showStartText, showGameOver } from "./ui.js";
import { createEnemies } from "./enemy.js";

export function updateGameArea() {
  myGameArea.clear();

  if (gameState === "waiting") {
    showStartText();
    return;
  }

  if (gameState === "gameover") {
    showGameOver();
    return;
  }

  const timePassed = Math.floor((Date.now() - startTime) / 1000);
  setElapsedTime(timePassed);

  if (timePassed >= nextWaveTime) {
    createEnemies(1, 7);
    setNextWaveTime(nextWaveTime + 7);
  }

 
  player.newPos();
  player.update();


  updateEnemies();
  updateBullets();
  updateEnemyBullets();

  detectBulletCollisions();
  detectEnemyBulletHit();
  drawScore();
  drawTimer();
  drawLives();
}
