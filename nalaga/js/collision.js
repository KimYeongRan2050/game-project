import { bullets, enemyBullets, enemies, player, lives, setLives, setGameState } from "./gameState.js";
import { audioFiles } from "./audioManager.js";

export function detectBulletCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      if (bullet.crashWith(enemy)) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        audioFiles.enemyDown.play();
        break;
      }
    }
  }
}

export function detectEnemyBulletHit() {
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    const bullet = enemyBullets[i];
    if (bullet.crashWith(player)) {
      enemyBullets.splice(i, 1);
      setLives(lives - 1); 
      audioFiles.playerHit.play();
      if (lives <= 0) {
        setGameState("gameover");
      }
    }
  }
}
