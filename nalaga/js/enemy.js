// js/enemy.js
// 적
// 📁 js/enemy.js
import { enemies } from "./gameState.js";
import { component } from "./component.js";

const enemyImages = ["img/perple.png", "img/pink.png", "img/yellow.png", "img/green.png"];

export function createEnemies(rows, cols) {
  enemies.length = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const randomImage = enemyImages[Math.floor(Math.random() * enemyImages.length)];
      enemies.push(
        new component(30, 30, randomImage, 30 + col * 45, 30 + row * 45, "image")
      );
    }
  }
}

