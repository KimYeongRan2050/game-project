const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const msgEl = document.getElementById('msg');
const startBtn = document.getElementById('startBtn');
const width = 8, height = 8;
const colors = ['#ff7eb9', '#ffb347', '#7afcff', '#fff740', '#b5ead7', '#c7ceea'];
let candies = [];
let selected = null;
let score = 0;
let timer = null;
let timeLeft = 60;
let playing = false;
let combo = 0;
let highScore = Number(localStorage.getItem('anipang-highscore')) || 0;
let shuffleUsed = false;

// 보드 초기화
function initBoard() {
    candies = [];
    board.innerHTML = '';
    for(let i=0; i<width*height; i++) {
        let color = colors[Math.floor(Math.random()*colors.length)];
        let type = Math.random() < 0.08 ? 'stone' : 'normal';
        candies.push({ color, type });
        const div = document.createElement('div');
        div.className = 'candy';
        div.style.background = type === 'stone' ? '#888' : color;
        div.dataset.idx = i;
        if(type !== 'stone') div.addEventListener('click', onCandyClick);
        board.appendChild(div);
    }
    for(let i=0; i<width*height; i++) {
        updateCandyDiv(i);
    }
    score = 0;
    combo = 0;
    updateScoreBoard();
    msgEl.textContent = '';
    timeLeft = 60;
    timeEl.textContent = timeLeft;
    document.getElementById('itemBtn')?.remove();
    shuffleUsed = false;
    const shuffleBtn = document.getElementById('shuffleBtn');
    if (shuffleBtn) {
        shuffleBtn.disabled = false;
        shuffleBtn.textContent = "↻";
    }
}

// 아이템 버튼 추가
function addItemBtn() {
    const btn = document.createElement('button');
    btn.id = 'itemBtn';
    btn.textContent = '랜덤 한 줄 지우기';
    btn.style.margin = '10px';
    btn.onclick = () => {
        if(!playing) return;
        let row = Math.floor(Math.random() * height);
        for(let x=0; x<width; x++) {
            let idx = row*width + x;
            if(candies[idx].type !== 'stone') {
                candies[idx] = { color: null, type: 'normal' };
                board.children[idx].style.background = '#fff';
                board.children[idx].classList.add('pop');
            }
        }
        setTimeout(dropCandies, 300);
    };
    board.parentElement.appendChild(btn);
}

// 캔디 클릭
function onCandyClick(e) {
    if(!playing) return;
    const idx = Number(e.target.dataset.idx);
    if(selected === null) {
        selected = idx;
        board.children[idx].classList.add('selected');
    } else if(selected === idx) {
        board.children[idx].classList.remove('selected');
        selected = null;
    } else if(isNeighbor(selected, idx) && candies[idx].type !== 'stone') {
        swap(selected, idx);
        board.children[selected].classList.remove('selected');
        let prevSelected = selected;
        selected = null;
        setTimeout(() => {
            if(!checkMatches()) {
                swap(prevSelected, idx); // 되돌리기
            }
        }, 200);
    } else {
        board.children[selected].classList.remove('selected');
        selected = null;
    }
}

// 인접한지 확인
function isNeighbor(a, b) {
    return (Math.abs(a-b) === 1 && Math.floor(a/width) === Math.floor(b/width)) ||
           (Math.abs(a-b) === width);
}

// 스왑
function swap(a, b) {
    [candies[a], candies[b]] = [candies[b], candies[a]];
    updateCandyDiv(a);
    updateCandyDiv(b);
}

// 캔디 div 갱신
function updateCandyDiv(idx) {
    const c = candies[idx];
    const div = board.children[idx];
    div.className = 'candy';
    if (c.type === 'stone') {
        div.style.background = '#222';
        div.innerHTML = "🗿"; // 여러 이모지로 시도
        div.classList.add('stone');
    } else {
        div.style.background = c.color || '#fff';
        div.innerHTML = "";
    }
    if(c.type === 'row') div.classList.add('row-special');
    if(c.type === 'col') div.classList.add('col-special');
    if(c.type === 'block') div.classList.add('block-special');
}

// 점수판에 최고점 표시
function updateScoreBoard() {
    scoreEl.innerHTML = `점수: ${score} <span class="high-score">/ 최고: ${highScore}</span>` + (combo > 1 ? ` <span style="color:#ff1744;">(콤보 x${combo})</span>` : '');
    scoreEl.classList.remove('score-pop');
    void scoreEl.offsetWidth;
    scoreEl.classList.add('score-pop');
}

// 매치 체크 및 처리
function checkMatches() {
    let matched = new Set();
    let specials = [];
    // 가로
    for(let y=0; y<height; y++) {
        let x = 0;
        while(x < width-2) {
            let idx = y*width + x;
            let c = candies[idx];
            if(c.color && c.type !== 'stone') {
                let run = 1;
                // 연속 몇 개인지 확인
                for(let k=1; x+k<width; k++) {
                    let nidx = y*width + x+k;
                    if(candies[nidx].color === c.color && candies[nidx].type !== 'stone') run++;
                    else break;
                }
                if(run >= 3) {
                    for(let k=0; k<run; k++) matched.add(y*width + x + k);
                    // 4개 이상이면 스페셜(가로) 생성
                    if(run >= 4) specials.push({idx: y*width + x + Math.floor(run/2), type: 'row'});
                }
                x += run;
            } else {
                x++;
            }
        }
    }
    // 세로
    for(let x=0; x<width; x++) {
        let y = 0;
        while(y < height-2) {
            let idx = y*width + x;
            let c = candies[idx];
            if(c.color && c.type !== 'stone') {
                let run = 1;
                for(let k=1; y+k<height; k++) {
                    let nidx = (y+k)*width + x;
                    if(candies[nidx].color === c.color && candies[nidx].type !== 'stone') run++;
                    else break;
                }
                if(run >= 3) {
                    for(let k=0; k<run; k++) matched.add((y+k)*width + x);
                    // 4개 이상이면 스페셜(세로) 생성
                    if(run >= 4) specials.push({idx: (y + Math.floor(run/2))*width + x, type: 'col'});
                }
                y += run;
            } else {
                y++;
            }
        }
    }
    if(matched.size === 0) {
        combo = 0;
        msgEl.textContent = '';
        return false;
    }
    // 콤보 점수
    combo++;
addScore(matched.size * 10 * combo);
    msgEl.textContent = combo > 1 ? `콤보! x${combo}` : '';
    // 특수 블록 생성
    specials.forEach(s => {
        candies[s.idx].type = s.type;
        updateCandyDiv(s.idx);
    });
    // 터뜨리기 + 애니메이션
    matched.forEach(idx => {
        if(candies[idx].type === 'row') {
            // 한 줄 전체 터뜨리기
            let row = Math.floor(idx/width);
            for(let x=0; x<width; x++) {
                if(candies[row*width+x].type !== 'stone') {
                    candies[row*width+x].color = null;
                    board.children[row*width+x].classList.add('pop');
                }
            }
        } else if(candies[idx].type === 'col') {
            // 한 칸 전체 터뜨리기
            let col = idx%width;
            for(let y=0; y<height; y++) {
                if(candies[y*width+col].type !== 'stone') {
                    candies[y*width+col].color = null;
                    board.children[y*width+col].classList.add('pop');
                }
            }
        } else {
            candies[idx].color = null;
            board.children[idx].classList.add('pop');
        }
    });
    setTimeout(() => {
        matched.forEach(idx => {
            board.children[idx].classList.remove('pop');
        });
        dropCandies();
    }, 300);
    return true;
}

// 캔디 떨어뜨리기
function dropCandies() {
    for(let x=0; x<width; x++) {
        for(let y=height-1; y>=0; y--) {
            let idx = y*width + x;
            // stone 블록은 건드리지 않는다!
            if(candies[idx].type === 'stone') continue;
            if(!candies[idx].color) {
                for(let k=y-1; k>=0; k--) {
                    let above = candies[k*width+x];
                    // stone 블록은 내릴 수 없다!
                    if(above.color && above.type !== 'stone') {
                        candies[idx].color = above.color;
                        candies[idx].type = above.type;
                        above.color = null;
                        above.type = 'normal';
                        updateCandyDiv(idx);
                        updateCandyDiv(k*width+x);
                        break;
                    }
                }
            }
        }
    }
    // 새 캔디 생성
    for(let x=0; x<width; x++) {
        for(let y=0; y<height; y++) {
            let idx = y*width + x;
            // stone 블록은 건드리지 않는다!
            if(candies[idx].type === 'stone') continue;
            if(!candies[idx].color) {
                const color = colors[Math.floor(Math.random()*colors.length)];
                candies[idx].color = color;
                candies[idx].type = 'normal';
                updateCandyDiv(idx);
            }
        }
    }
    setTimeout(checkMatches, 200);
}

// 타이머
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timer);
            playing = false;
            msgEl.textContent = `게임 종료! 점수: ${score} / 최고: ${highScore}`;
        }
    }, 1000);
}

// 점수 추가
function addScore(points) {
    score += points;
    if(score > highScore) {
        highScore = score;
        localStorage.setItem('anipang-highscore', highScore);
    }
    updateScoreBoard();
}

// 게임 시작
startBtn.onclick = () => {
    clearInterval(timer);
    initBoard();
    playing = true;
    startTimer();
    msgEl.textContent = '';
};

initBoard();

// 셔플 함수
function shuffleBoard() {
    let movable = candies
        .map((c, i) => ({...c, i}))
        .filter(c => c.type !== 'stone');
    // 랜덤 섞기
    for(let i=movable.length-1; i>0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [movable[i], movable[j]] = [movable[j], movable[i]];
    }
    // 다시 배치
    let idx = 0;
    for(let i=0; i<width*height; i++) {
        if(candies[i].type !== 'stone') {
            candies[i].color = movable[idx].color;
            candies[i].type = 'normal';
            idx++;
        }
        updateCandyDiv(i);
    }
    msgEl.textContent = "셔플!";
}

// 셔플 버튼 이벤트
document.getElementById('shuffleBtn').onclick = function() {
    if (!playing) return;
    if (shuffleUsed) {
        msgEl.textContent = "셔플은 1번만 사용할 수 있습니다!";
        return;
    }
    shuffleBoard();
    shuffleUsed = true;
    this.disabled = true;
    this.textContent = "❌";
};