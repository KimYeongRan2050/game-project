//startText.js
// startText.js
import { gameState } from './gameState.js';
import { player } from './player.js';
import { playAudio } from './audio.js';

let logoY = -100;
const targetLogoY = 150;
const logoSpeed = 1.2;
const logoImage = new Image();
logoImage.src = "img/Nalaga_logo.png";

export function showStartText(ctx) {
  if (logoY < targetLogoY) {
    logoY += logoSpeed;

    if (logoY === targetLogoY - 1) {
      playAudio('beforeStart');  // 로고가 내려올 때 소리 재생
    }
  }

  ctx.drawImage(logoImage, 90, logoY, 220, 220);

  if (logoY >= targetLogoY) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.fillText("Push Enter to Start", 140, logoY + 300); 
    }
  }
}
