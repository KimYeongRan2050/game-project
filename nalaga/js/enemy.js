// js/enemy.js
// 적
import { enemies } from "./gameState.js";
import { component } from "./component.js";

export function createEnemies(rows, cols) {
  const enemyWidth = 40;
  const enemyHeight = 40;
  const spacingX = 10;
  const spacingY = 10;
  const startX = 30;
  const startY = 60;

  const enemyImages = [
    "img/green.png",
    "img/yellow.png",
    "img/pink.png",
    "img/perple.png"
  ];

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
