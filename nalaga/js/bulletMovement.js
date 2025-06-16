import { bullets, enemyBullets } from "./gameState.js";

export function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y += bullet.speedY;
    bullet.update();
    if (bullet.y < 0) bullets.splice(index, 1);
  });
}

export function updateEnemyBullets() {
  enemyBullets.forEach((bullet, index) => {
    bullet.y += bullet.speedY;
    bullet.update();
    if (bullet.y > 700) enemyBullets.splice(index, 1);
  });
}