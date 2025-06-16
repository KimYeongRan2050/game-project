// 📁 js/gameState.js
export let gameState = "waiting";
export let score = 0;
export let startTime;
export let elapsedTime = 0;
export let lives = 3;
export let player;

export const enemies = [];
export const bullets = [];
export const enemyBullets = [];
export let enemyDirection = 1;
export let nextWaveTime = 16;

export function setGameState(state) {
  gameState = state;
}
export function setScore(newScore) {
  score = newScore;
}
export function addScore(amount) {
  score += amount;
}
export function setStartTime(time) {
  startTime = time;
}
export function setElapsedTime(time) {
  elapsedTime = time;
}
export function setLives(count) {
  lives = count;
}
export function setPlayer(p) {
  player = p;
}
export function setEnemyDirection(dir) {
  enemyDirection = dir;
}
export function setNextWaveTime(time) {
  nextWaveTime = time;
}