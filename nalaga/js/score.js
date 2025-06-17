//score.js
export function drawScore() {
  const ctx = myGameArea.context;
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 300, 20);
}

export function drawTimer() {
  const ctx = myGameArea.context;
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
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
