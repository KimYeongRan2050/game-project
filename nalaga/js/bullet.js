// 총알

// js/bullet.js
import { bullets, enemyBullets } from "./gameState.js";
import { component } from "./component.js";

export function fireBullet(x, y) {
  bullets.push(new component(4, 10, "white", x, y));
}

export function fireEnemyBullet(enemy) {
  enemyBullets.push(new component(4, 10, "red", enemy.x + enemy.width / 2, enemy.y + enemy.height));
}


