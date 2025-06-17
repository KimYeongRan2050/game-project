// gameState.js
let gameState = "waiting";  

let score = 0;
let startTime;
let elapsedTime = 0;
let lives = 3;
let player;
const enemies = [];
const bullets = [];
const enemyBullets = [];
let enemyDirection = 1;
let nextWaveTime = 16;

export {
  gameState,
  score,
  startTime,
  elapsedTime,
  lives,
  player,
  enemies,
  bullets,
  enemyBullets,
  enemyDirection,
  nextWaveTime
};
