//enemy.js
import { enemies } from './gameState.js';
import { fireEnemyBullet } from './bullet.js';

export function createEnemies(rows, cols) {
  const enemyWidth = 40;
  const enemyHeight = 40;
  const spacingX = 10;
  const spacingY = 10;
  const startX = 30;
  const startY = 60;
  
  const enemyImages = ["img/green.png", "img/yellow.png", "img/pink.png", "img/perple.png"];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = startX + col * (enemyWidth + spacingX);
      let y = startY + row * (enemyHeight + spacingY);
      const randomImage = enemyImages[Math.floor(Math.random() * enemyImages.length)];
      const enemy = new component(enemyWidth, enemyHeight, randomImage, x, y, "image");
      enemies.push(enemy);
    }
  }
}

export function updateEnemies() {
  let edgeHit = false;
  const enemySpeedX = 0.5;
  const enemyStepDown = 10;

  enemies.forEach(enemy => {
    enemy.x += enemySpeedX;
    if (enemy.x <= 0 || enemy.x + enemy.width >= myGameArea.canvas.width) edgeHit = true;
    if (Math.random() < 0.002) fireEnemyBullet(enemy);
  });

  if (edgeHit) {
    enemies.forEach(enemy => { enemy.y += enemyStepDown; });
  }

  enemies.forEach(enemy => enemy.update());
}
