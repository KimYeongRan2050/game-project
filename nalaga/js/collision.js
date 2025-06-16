//collision.js


import { bullets, enemies, addScore, enemyBullets, player, lives, setLives, setGameState } from "./gameState.js";
import { audioFiles } from "./audioManager.js";

export function detectBulletCollisions() {
  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (b.x < e.x + e.width &&
          b.x + b.width > e.x &&
          b.y < e.y + e.height &&
          b.y + b.height > e.y) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        addScore(100);
        audioFiles.enemyHit.currentTime = 0;
        audioFiles.enemyHit.play();
      }
    });
  });
}

export function detectEnemyBulletHit() {
  enemyBullets.forEach((b, bi) => {
    if (b.x < player.x + player.width &&
        b.x + b.width > player.x &&
        b.y < player.y + player.height &&
        b.y + b.height > player.y) {
      enemyBullets.splice(bi, 1);
      audioFiles.playerHit.currentTime = 0;
      audioFiles.playerHit.play();
      setLives(lives - 1);
      if (lives <= 1) {
        audioFiles.gameBGM.pause();
        audioFiles.gameOver.play();
        setGameState("gameover");
      }
    }
  });
}