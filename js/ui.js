// js/ui.js
export default class UIManager {
    constructor(scoreEl, timeEl, msgEl) {
        this.scoreEl = scoreEl;
        this.timeEl = timeEl;
        this.msgEl = msgEl;
        this.combo = 0;
    }

    updateScore(score, highScore, combo) {
        this.scoreEl.innerHTML = `점수: ${score} <span class="high-score">/ 최고: ${highScore}</span>` +
            (combo > 1 ? ` <span style="color:#ff1744;">(콤보 x${combo})</span>` : '');
        this.scoreEl.classList.remove('score-pop');
        void this.scoreEl.offsetWidth;
        this.scoreEl.classList.add('score-pop');
    }

    updateTime(time) {
        this.timeEl.textContent = time;
    }

    showMessage(msg) {
        this.msgEl.textContent = msg;
    }
}