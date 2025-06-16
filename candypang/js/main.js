// js/main.js
import Board from './board.js';
import UIManager from './ui.js';
import Timer from './timer.js';

const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const msgEl = document.getElementById('msg');
const startBtn = document.getElementById('startBtn');
const width = 8, height = 8;
const colors = ['#ff7eb9', '#ffb347', '#7afcff', '#fff740', '#b5ead7', '#c7ceea'];

let score = 0, highScore = Number(localStorage.getItem('anipang-highscore')) || 0;
let playing = false;

const ui = new UIManager(scoreEl, timeEl, msgEl);
const boardObj = new Board(width, height, colors, onCandyClick);

function addScore(points) {
    score += points;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('anipang-highscore', highScore);
    }
    ui.updateScore(score, highScore, ui.combo);
}

function onCandyClick(e) {
    if (!playing) return;
    const idx = Number(e.target.dataset.idx);
    if (boardObj.selected === null) {
        boardObj.selected = idx;
        boardEl.children[idx].classList.add('selected');
    } else if (boardObj.selected === idx) {
        boardEl.children[idx].classList.remove('selected');
        boardObj.selected = null;
    } else if (boardObj.isNeighbor(boardObj.selected, idx) && boardObj.candies[idx].type !== 'stone') {
        boardObj.swap(boardObj.selected, idx, boardEl);
        boardEl.children[boardObj.selected].classList.remove('selected');
        let prevSelected = boardObj.selected;
        boardObj.selected = null;
        setTimeout(() => {
            if (!boardObj.checkMatches(boardEl, ui, addScore)) {
                boardObj.swap(prevSelected, idx, boardEl); // 되돌리기
            }
        }, 200);
    } else {
        boardEl.children[boardObj.selected].classList.remove('selected');
        boardObj.selected = null;
    }
}

function startGame() {
    score = 0;
    ui.combo = 0;
    playing = true;
    boardObj.init(boardEl);
    ui.updateScore(score, highScore, ui.combo);
    ui.showMessage('');
    timer.start();
}

const timer = new Timer(60, (t) => ui.updateTime(t), () => {
    playing = false;
    ui.showMessage(`게임 종료! 점수: ${score} / 최고: ${highScore}`);
});

startBtn.onclick = startGame;
startGame();