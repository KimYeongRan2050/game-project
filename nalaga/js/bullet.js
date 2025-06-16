// 총알

// js/bullet.js
import { bullets, player, enemyBullets } from "./gameState.js";
import { component } from "./component.js";
import { audioFiles } from "./audioManager.js";

export function fireBullet() {
  audioFiles.shoot.currentTime = 0;
  audioFiles.shoot.play();
  const bullet = new component(
    20, 15, "img/bullet.png",
    player.x + player.width / 2 - 10,
    player.y, "image"
  );
  bullet.speedY = -5;
  bullets.push(bullet);
}

export function fireEnemyBullet(enemy) {
  audioFiles.enemyShoot.currentTime = 0;
  audioFiles.enemyShoot.play();
  const bullet = new component(
    5, 10, "#ccff00",
    enemy.x + enemy.width / 2, enemy.y + enemy.height,
    "color"
  );
  bullet.speedY = 2;
  enemyBullets.push(bullet);
}


