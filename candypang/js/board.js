// js/board.js
import Candy from './candy.js';

export default class Board {
    constructor(width, height, colors, onCandyClick) {
        this.width = width;
        this.height = height;
        this.colors = colors;
        this.candies = [];
        this.selected = null;
        this.onCandyClick = onCandyClick;
    }

    init(boardEl) {
        this.candies = [];
        boardEl.innerHTML = '';
        for (let i = 0; i < this.width * this.height; i++) {
            let color = this.colors[Math.floor(Math.random() * this.colors.length)];
            let type = Math.random() < 0.08 ? 'stone' : 'normal';
            this.candies.push(new Candy(color, type));
            const div = document.createElement('div');
            div.className = 'candy';
            div.style.background = type === 'stone' ? '#888' : color;
            div.dataset.idx = i;
            if (type !== 'stone') div.addEventListener('click', this.onCandyClick);
            boardEl.appendChild(div);
        }
        for (let i = 0; i < this.width * this.height; i++) {
            this.updateCandyDiv(i, boardEl);
        }
        this.selected = null;
    }

    isNeighbor(a, b) {
        return (Math.abs(a-b) === 1 && Math.floor(a/this.width) === Math.floor(b/this.width)) ||
               (Math.abs(a-b) === this.width);
    }

swap(a, b, boardEl) {
    [this.candies[a], this.candies[b]] = [this.candies[b], this.candies[a]];
    this.updateCandyDiv(a, boardEl);
    this.updateCandyDiv(b, boardEl);

    // 스왑 효과 부여
    boardEl.children[a].classList.add('swap');
    boardEl.children[b].classList.add('swap');
    setTimeout(() => {
        boardEl.children[a].classList.remove('swap');
        boardEl.children[b].classList.remove('swap');
    }, 220); // 애니메이션 시간과 맞춤
}

    updateCandyDiv(idx, boardEl) {
        const c = this.candies[idx];
        const div = boardEl.children[idx];
        div.className = 'candy';
        if (c.type === 'stone') {
            div.style.background = '#222';
            div.innerHTML = "🗿";
            div.classList.add('stone');
        } else {
            div.style.background = c.color || '#fff';
            div.innerHTML = "";
        }
        if (c.type === 'row') div.classList.add('row-special');
        if (c.type === 'col') div.classList.add('col-special');
        if (c.type === 'block') div.classList.add('block-special');
    }

    checkMatches(boardEl, ui, addScore) {
        let matched = new Set();
        let specials = [];
        // 가로
        for(let y=0; y<this.height; y++) {
            let x = 0;
            while(x < this.width-2) {
                let idx = y*this.width + x;
                let c = this.candies[idx];
                if(c.color && c.type !== 'stone') {
                    let run = 1;
                    for(let k=1; x+k<this.width; k++) {
                        let nidx = y*this.width + x+k;
                        if(this.candies[nidx].color === c.color && this.candies[nidx].type !== 'stone') run++;
                        else break;
                    }
                    if(run >= 3) {
                        for(let k=0; k<run; k++) matched.add(y*this.width + x + k);
                        if(run >= 4) specials.push({idx: y*this.width + x + Math.floor(run/2), type: 'row'});
                    }
                    x += run;
                } else {
                    x++;
                }
            }
        }
        // 세로
        for(let x=0; x<this.width; x++) {
            let y = 0;
            while(y < this.height-2) {
                let idx = y*this.width + x;
                let c = this.candies[idx];
                if(c.color && c.type !== 'stone') {
                    let run = 1;
                    for(let k=1; y+k<this.height; k++) {
                        let nidx = (y+k)*this.width + x;
                        if(this.candies[nidx].color === c.color && this.candies[nidx].type !== 'stone') run++;
                        else break;
                    }
                    if(run >= 3) {
                        for(let k=0; k<run; k++) matched.add((y+k)*this.width + x);
                        if(run >= 4) specials.push({idx: (y + Math.floor(run/2))*this.width + x, type: 'col'});
                    }
                    y += run;
                } else {
                    y++;
                }
            }
        }
        if(matched.size === 0) {
            ui.combo = 0;
            ui.showMessage('');
            return false;
        }
        // 콤보 점수
        ui.combo++;
        addScore(matched.size * 10 * ui.combo);
        ui.showMessage(ui.combo > 1 ? `콤보! x${ui.combo}` : '');
        // 특수 블록 생성
        specials.forEach(s => {
            this.candies[s.idx].type = s.type;
            this.updateCandyDiv(s.idx, boardEl);
        });
        // 터뜨리기 + 애니메이션
        matched.forEach(idx => {
            if(this.candies[idx].type === 'row') {
                let row = Math.floor(idx/this.width);
                for(let x=0; x<this.width; x++) {
                    if(this.candies[row*this.width+x].type !== 'stone') {
                        this.candies[row*this.width+x].color = null;
                        boardEl.children[row*this.width+x].classList.add('pop');
                    }
                }
            } else if(this.candies[idx].type === 'col') {
                let col = idx%this.width;
                for(let y=0; y<this.height; y++) {
                    if(this.candies[y*this.width+col].type !== 'stone') {
                        this.candies[y*this.width+col].color = null;
                        boardEl.children[y*this.width+col].classList.add('pop');
                    }
                }
            } else {
                this.candies[idx].color = null;
                boardEl.children[idx].classList.add('pop');
            }
        });
        setTimeout(() => {
            matched.forEach(idx => {
                boardEl.children[idx].classList.remove('pop');
            });
            this.dropCandies(boardEl, ui, addScore);
        }, 300);
        return true;
    }

    dropCandies(boardEl, ui, addScore) {
        for(let x=0; x<this.width; x++) {
            for(let y=this.height-1; y>=0; y--) {
                let idx = y*this.width + x;
                if(this.candies[idx].type === 'stone') continue;
                if(!this.candies[idx].color) {
                    for(let k=y-1; k>=0; k--) {
                        let above = this.candies[k*this.width+x];
                        if(above.color && above.type !== 'stone') {
                            this.candies[idx].color = above.color;
                            this.candies[idx].type = above.type;
                            above.color = null;
                            above.type = 'normal';
                            this.updateCandyDiv(idx, boardEl);
                            this.updateCandyDiv(k*this.width+x, boardEl);
                            break;
                        }
                    }
                }
            }
        }
        // 새 캔디 생성
        for(let x=0; x<this.width; x++) {
            for(let y=0; y<this.height; y++) {
                let idx = y*this.width + x;
                if(this.candies[idx].type === 'stone') continue;
                if(!this.candies[idx].color) {
                    const color = this.colors[Math.floor(Math.random()*this.colors.length)];
                    this.candies[idx].color = color;
                    this.candies[idx].type = 'normal';
                    this.updateCandyDiv(idx, boardEl);
                }
            }
        }
        setTimeout(() => this.checkMatches(boardEl, ui, addScore), 200);
    }
}