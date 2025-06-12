// js/timer.js
export default class Timer {
    constructor(duration, onTick, onEnd) {
        this.duration = duration;
        this.onTick = onTick;
        this.onEnd = onEnd;
        this.timeLeft = duration;
        this.interval = null;
    }

    start() {
        this.stop();
        this.timeLeft = this.duration;
        this.onTick(this.timeLeft);
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.onTick(this.timeLeft);
            if (this.timeLeft <= 0) {
                this.stop();
                this.onEnd();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }
}