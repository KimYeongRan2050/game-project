// bullet.js
import { bullets, enemyBullets } from './gameState.js';
import { playAudio } from './audio.js';

export function fireBullet() {
 audioFiles.shoot.currentTime = 0;
  audioFiles.shoot.play();
  const bullet = new component(20, 15, "img/bullet.png", player.x + player.width / 2 - 10, player.y, "image");
  bullet.speedY = -5;
  bullets.push(bullet);
}
export function fireEnemyBullet(enemy) {
  audioFiles.enemyShoot.currentTime = 0;
  audioFiles.enemyShoot.play();
  const bullet = new component(5, 10, "#ccff00", enemy.x + enemy.width / 2, enemy.y + enemy.height, "color");
  bullet.speedY = 2;
  enemyBullets.push(bullet);
}

export function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.newPos();
    bullet.update();
    if (bullet.y <= 0) bullets.splice(i, 1);
  }
}


export function updateEnemyBullets() {
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    const bullet = enemyBullets[i];
    bullet.newPos();
    bullet.update();
    if (bullet.y > myGameArea.canvas.height) enemyBullets.splice(i, 1);
  }
}

// 점수
export function detectBulletCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      const hit = bullet.x < enemy.x + enemy.width && bullet.x + bullet.width > enemy.x && bullet.y < enemy.y + enemy.height && bullet.y + bullet.height > enemy.y;
      if (hit) {
        audioFiles.enemyHit.currentTime = 0;
        audioFiles.enemyHit.play();
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score += 100;
        return;
      }
    }
  }
}