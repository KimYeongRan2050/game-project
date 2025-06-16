// js/ui.js
// time 스코어 로고 유저하트
import { myGameArea } from "./gameArea.js";
import { elapsedTime, score, lives } from "./gameState.js";

const logoImage = new Image();
logoImage.src = "img/Nalaga_logo.png";
let logoY = -100;
const targetLogoY = 150;
const logoSpeed = 1.2;

export function showStartText() {
  const ctx = myGameArea.context;
  if (logoY < targetLogoY) logoY += logoSpeed;
  ctx.drawImage(logoImage, 90, logoY, 220, 220);
  if (logoY >= targetLogoY - 1) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.fillText("Push Enter to Start", 140, logoY + 300);
    }
  }
}

export function drawScore() {
  const ctx = myGameArea.context;
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 300, 20);
}

export function drawTimer() {
  const ctx = myGameArea.context;
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Time: " + elapsedTime + "s", 20, 20);
}

export function drawLives() {
  const ctx = myGameArea.context;
  for (let i = 0; i < lives; i++) {
    const heart = new Image();
    heart.src = "img/heart.png";
    ctx.drawImage(heart, 10 + i * 30, 660, 25, 25);
  }
}