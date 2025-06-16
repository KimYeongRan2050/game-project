// main.js 
// Nalaga.html 의 body에 있던 onload 요소를 빼서 main.js에 게임이 실행 될 수 있도록 추가

import { gameState, score, startTime, elapsedTime, lives, nextWaveTime } from './gameState.js';
import { player, updatePlayer } from './player.js';
import { createEnemies, updateEnemies } from './enemy.js';
import { updateBullets, detectBulletCollisions } from './bullet.js';
import { drawScore, drawTimer, drawLives } from './score.js';
import { playAudio, stopAudio } from './audio.js';
import { myGameArea } from './gameArea.js';

function startGame() {
  gameState = "playing";
  startTime = Date.now();
  elapsedTime = 0;
  nextWaveTime = 16;
  player.init();
  myGameArea.start();
  createEnemies(3, 7);
  playAudio('gameBGM');
  stopAudio('beforeStart');
}

function updateGame() {
  if (gameState === 'playing') {
    updatePlayer();
    updateEnemies();
    updateBullets();
    detectBulletCollisions();
    drawScore();
    drawTimer();
    drawLives();
  }
}

window.addEventListener('keydown', function(e) {
  if (e.key === "Enter" && gameState === "waiting") {
    startGame();  // Enter 키로 게임 시작
  }
});

setInterval(updateGame, 20);
