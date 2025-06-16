// main.js 
// Nalaga.html 의 body에 있던 onload 요소를 빼서 main.js에 게임이 실행 될 수 있도록 추가

// 📁 js/main.js
import { startGame } from "./gameInit.js";

window.onload = () => {
  startGame();
};