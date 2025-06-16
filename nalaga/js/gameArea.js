// js/gameArea.js
// 키보드 조작, 캔버스 관련

import { gameState } from "./gameState.js";
import { fireBullet } from "./bullet.js";
import { startPlaying } from "./gameFlow.js";

export const myGameArea = {
  canvas: document.getElementById("playObject"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 400;
    this.canvas.height = 700;
    this.interval = setInterval(() => {
      import("./gameLoop.js").then(module => module.updateGameArea());
    }, 20);

    window.addEventListener("keydown", (e) => {
      this.keys = this.keys || [];
      this.keys[e.keyCode] = true;
      if (gameState === "waiting" && e.key === "Enter") {
        startPlaying();
      }
      if (e.keyCode === 32 && gameState === "playing") {
        fireBullet();
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.keyCode] = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

// import { gameState } from "./gameState.js";
// import { fireBullet } from "./bullet.js";
// import { startPlaying } from "./gameFlow.js";

// export const myGameArea = {
//   canvas: document.getElementById("playObject"),
//   start: function () {
//     this.context = this.canvas.getContext("2d");
//     this.canvas.width = 400;
//     this.canvas.height = 700;
//     this.interval = setInterval(() => {
//       import("./gameLoop.js").then(module => module.updateGameArea());
//     }, 20);

//     window.addEventListener("keydown", (e) => {
//       this.keys = this.keys || [];
//       this.keys[e.keyCode] = true;

//       if (gameState === "waiting" && e.key === "Enter") {
//         startPlaying();
//       }

//       if (e.keyCode === 32 && gameState === "playing") {
//         fireBullet();
//       }
//     });

//     window.addEventListener("keyup", (e) => {
//       this.keys[e.keyCode] = false;
//     });
//   },
//   clear: function () {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   },
// };
