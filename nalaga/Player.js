// 전체 게임 상태 변수 -> 만든 순서대로 적어놓음 이전버전별로 저장해놓음
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

// 오디오 객체
const audioFiles = {
  beforeStart: new Audio("bgm/0beforeStart.mp3"),
  gameBGM: new Audio("bgm/1While Playing Game bgm.mp3"),
  shoot: new Audio("bgm/2Player Shot.mp3"),
  enemyShoot: new Audio("bgm/2Enemy Shot3.mp3"),
  playerHit: new Audio("bgm/3Player got hit.mp3"),
  enemyHit: new Audio("bgm/3Enemy got hit.mp3"),
  clear: new Audio("bgm/3Clear.mp3"),
  gameOver: new Audio("bgm/4Gameover.mp3")
};
audioFiles.beforeStart.loop = true;

function startGame() {
  loadImages();
  myGameArea.start();
  player = new component(64, 64, "img/player.png", 170, 616, "image");
  createEnemies(3, 7);
  showStartText();
  audioFiles.beforeStart.play();
}

function loadImages() {}

const myGameArea = {
  canvas: document.getElementById("playObject"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 400;
    this.canvas.height = 700;
    this.interval = setInterval(updateGameArea, 20);

    window.addEventListener("keydown", function (e) {
      if (gameState === "waiting" && e.key === "Enter") {
        startPlaying();
      }
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = true;
      if (e.keyCode === 32 && gameState === "playing") {
        fireBullet();
      }
    });

    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.keyCode] = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function startPlaying() {
  gameState = "playing";
  startTime = Date.now();
  audioFiles.beforeStart.pause();
  audioFiles.gameBGM.loop = true;
  audioFiles.gameBGM.play();
}

function updateGameArea() {
  myGameArea.clear();
  if (gameState === "waiting") {
    showStartText();
    return;
  }
  if (gameState === "gameover") {
    showGameOver();
    return;
  }

  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  if (elapsedTime >= nextWaveTime) {
    createEnemies(1, 7);
    nextWaveTime += 7;
  }

  updatePlayer();
  updateEnemies();
  updateBullets();
  updateEnemyBullets();
  detectBulletCollisions();
  detectEnemyBulletHit();
  drawScore();
  drawTimer();
  drawLives();
}

function showStartText() {
  const ctx = myGameArea.context;
  ctx.font = "15px Arial";
  ctx.fillStyle = "white";
  if (Math.floor(Date.now() / 500) % 2 === 0) {
    // 글자 위에 게임이름 이미지도 넣고 싶음
    // 만들어야함
    ctx.fillText("Push Enter to Start", 140, 550);
  }
}

function showGameOver() {
  const ctx = myGameArea.context;
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", 120, 300);
  const button = document.getElementById("restartBtn");
  if (button) button.style.display = "block";
}

function drawScore() {
  const ctx = myGameArea.context;
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 300, 20);
}

function drawTimer() {
  const ctx = myGameArea.context;
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Time: " + elapsedTime + "s", 20, 20);
}

function drawLives() {
  const ctx = myGameArea.context;
  for (let i = 0; i < lives; i++) {
    const heart = new Image();
    heart.src = "img/heart.png";
    ctx.drawImage(heart, 10 + i * 30, 660, 25, 25);
  }
}

function component(width, height, srcOrColor, x, y, type) {
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
}

function createEnemies(rows, cols) {
  const enemyWidth = 40;
  const enemyHeight = 40;
  const spacingX = 10;
  const spacingY = 10;
  const startX = 30;
  const startY = 60;

  const enemyImages = ["img/green.png", "img/yellow.png", "img/pink.png", "img/perple.png"];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = startX + col * (enemyWidth + spacingX);
      let y = startY + row * (enemyHeight + spacingY);
      const randomImage = enemyImages[Math.floor(Math.random() * enemyImages.length)];
      const enemy = new component(enemyWidth, enemyHeight, randomImage, x, y, "image");
      enemies.push(enemy);
    }
  }
}

function fireBullet() {
  audioFiles.shoot.currentTime = 0;
  audioFiles.shoot.play();
  const bullet = new component(20, 15, "img/bullet.png", player.x + player.width / 2 - 10, player.y, "image");
  bullet.speedY = -5;
  bullets.push(bullet);
}

function updatePlayer() {
  player.speedX = 0;
  if (myGameArea.keys && myGameArea.keys[37]) player.speedX = -2.5;
  if (myGameArea.keys && myGameArea.keys[39]) player.speedX = 2.5;
  player.newPos();
  player.update();
}

function updateEnemies() {
  let edgeHit = false;
  const enemySpeedX = 0.5;
  const enemyStepDown = 10;

  enemies.forEach(enemy => {
    enemy.x += enemySpeedX * enemyDirection;
    if (enemy.x <= 0 || enemy.x + enemy.width >= myGameArea.canvas.width) edgeHit = true;
    if (Math.random() < 0.002) fireEnemyBullet(enemy);
  });

  if (edgeHit) {
    enemyDirection *= -1;
    enemies.forEach(enemy => { enemy.y += enemyStepDown; });
  }

  enemies.forEach(enemy => enemy.update());
}

function fireEnemyBullet(enemy) {
  audioFiles.enemyShoot.currentTime = 0;
  audioFiles.enemyShoot.play();
  const bullet = new component(5, 10, "#ccff00", enemy.x + enemy.width / 2, enemy.y + enemy.height, "color");
  bullet.speedY = 2;
  enemyBullets.push(bullet);
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.newPos();
    bullet.update();
    if (bullet.y <= 0) bullets.splice(i, 1);
  }
}

function updateEnemyBullets() {
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    const bullet = enemyBullets[i];
    bullet.newPos();
    bullet.update();
    if (bullet.y > myGameArea.canvas.height) enemyBullets.splice(i, 1);
  }
}

//점수
function detectBulletCollisions() {
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

function detectEnemyBulletHit() {
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    const bullet = enemyBullets[i];
    const hit = bullet.x < player.x + player.width && bullet.x + bullet.width > player.x && bullet.y < player.y + player.height && bullet.y + bullet.height > player.y;
    if (hit) {
      enemyBullets.splice(i, 1);
      audioFiles.playerHit.currentTime = 0;
      audioFiles.playerHit.play();
      lives--;
      // 6/13 gameover 버튼 안나오는거 아직 해결중
      if (lives <= 0) {
        gameState = "gameover";
        audioFiles.gameBGM.pause();
        audioFiles.gameOver.play();
      }
    }
  }
}


// 문제점: 게임 시작시 enter(game start)를 누르기 전에도 bgm이 나오게 했는데 음악 재생이 안됨
// -> 다른 audio는 작동이 된는데 왜 이거만 안되는지 모르겠음
// 디버깅: play() failed because the user didn't interact with the document first.