// js/component.js
// 캔버스에 그려지는 그리기 함수(객체관련함수)
import { myGameArea } from "./gameArea.js";

export function component(width, height, srcOrColor, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;

  if (type === "image") {
    this.image = new Image();
    this.image.src = srcOrColor;
  }

  this.update = function () {
    const ctx = myGameArea.context;
    if (this.type === "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = srcOrColor;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > myGameArea.canvas.width)
      this.x = myGameArea.canvas.width - this.width;
  };
};