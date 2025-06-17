// player.js
export const player = {
  x: 170,
  y: 616,
  width: 64,
  height: 64,
  speedX: 0,
  speedY: 0,
  image: new Image(),
  init: function() {
    this.image.src = "img/player.png";  // 플레이어 이미지를 src로 지정
  },
  update: function (ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  newPos: function () {
    this.x += this.speedX;
    this.y += this.speedY;
  },
};

const logoImage = new Image();
logoImage.src = "img/Nalaga_logo.png";
let logoY = -100;
const targetLogoY = 150;
const logoSpeed = 1.2;

export function showStartText(ctx) {
  if (logoY < targetLogoY) {
    logoY += logoSpeed;

    if (logoY === targetLogoY - 1) {
      playAudio('beforeStart');
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

export function updatePlayer() {
  player.speedX = 0;
  if (myGameArea.keys && myGameArea.keys[37]) player.speedX = -2.5;
  if (myGameArea.keys && myGameArea.keys[39]) player.speedX = 2.5;
  player.newPos();
  player.update(myGameArea.context);
}
