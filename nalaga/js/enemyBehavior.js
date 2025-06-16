import { enemies, enemyDirection, setEnemyDirection } from "./gameState.js";
import { fireEnemyBullet } from "./bullet.js";

export function updateEnemies() {
  const step = 1; // ✅ Player.js 기준 속도 유지
  let shouldTurn = false;

  enemies.forEach(enemy => {
    enemy.x += step * enemyDirection;
    if (enemy.x < 0 || enemy.x + enemy.width > 400) {
      shouldTurn = true;
    }
  });

  if (shouldTurn) {
    setEnemyDirection(enemyDirection * -1);
    enemies.forEach(enemy => {
      enemy.y += 10;
    });
  }

  if (Math.random() < 0.02 && enemies.length > 0) {
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    fireEnemyBullet(randomEnemy);
  }
}
