// gameArea.js
// gameArea.js
import { gameState } from './gameState.js';
import { player } from './player.js';
import { playAudio, stopAudio } from './audio.js';
import { updateEnemies } from './enemy.js';
import { updateBullets, detectBulletCollisions } from './bullet.js';
import { drawScore, drawTimer, drawLives } from './score.js';
import { showStartText } from './startText.js';  // startText.js에서 showStartText 가져옴

export const myGameArea = {
  canvas: document.getElementById("playObject"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 400;
    this.canvas.height = 700;
    this.interval = setInterval(updateGameArea, 20);

    window.addEventListener("keydown", function (e) {
      if (gameState === "waiting" && e.key === "Enter") {
        startGame();  // Enter 키로 게임 시작
      }
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = true;
    });

    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.keyCode] = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function startGame() {
  gameState = "playing";  // gameState를 'playing'으로 변경
  startTime = Date.now();
  elapsedTime = 0;
  nextWaveTime = 16;
  player.init();
  myGameArea.start();
  createEnemies(3, 7);
  playAudio('gameBGM');
  stopAudio('beforeStart');
}

function updateGameArea() {
  myGameArea.clear();
  if (gameState === "waiting") {
    showStartText(myGameArea.context);  // 로고와 텍스트 출력
    return;
  }

  if (gameState === "gameover") {
    showGameOver();
    return;
  }

  updatePlayer();
  updateEnemies();
  updateBullets();
  detectBulletCollisions();
  drawScore();
  drawTimer();
  drawLives();
}
