const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreEl = document.getElementById('score');

const COLS = 10;
const ROWS = 20;
const BLOCK = 32;

let board, current, interval, score = 0;

// 테트로미노 모양 (I, O, T, S, Z, J, L)
const SHAPES = [
    [[1,1,1,1]], // I
    [[1,1],[1,1]], // O
    [[0,1,0],[1,1,1]], // T
    [[0,1,1],[1,1,0]], // S
    [[1,1,0],[0,1,1]], // Z
    [[1,0,0],[1,1,1]], // J
    [[0,0,1],[1,1,1]]  // L
];
const COLORS = [
    '#FFB3BA', // 연핑크
    '#FFDFBA', // 살구
    '#FFFFBA', // 연노랑
    '#BAFFC9', // 연민트
    '#BAE1FF', // 연하늘
    '#D7BAFF', // 연보라
    '#FFD6E0'  // 연분홍
];

function resetBoard() {
    board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
}

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*BLOCK, y*BLOCK, BLOCK-1, BLOCK-1);
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // 보드
    for(let y=0; y<ROWS; y++) {
        for(let x=0; x<COLS; x++) {
            if(board[y][x]) drawBlock(x, y, COLORS[board[y][x]-1]);
        }
    }
    // 현재 블록
    if(current) {
        for(let y=0; y<current.shape.length; y++) {
            for(let x=0; x<current.shape[y].length; x++) {
                if(current.shape[y][x]) {
                    drawBlock(current.x + x, current.y + y, COLORS[current.type]);
                }
            }
        }
    }
}

function collide(nx=0, ny=0, nshape=null) {
    const shape = nshape || current.shape;
    for(let y=0; y<shape.length; y++) {
        for(let x=0; x<shape[y].length; x++) {
            if(shape[y][x]) {
                let nx_ = current.x + x + nx;
                let ny_ = current.y + y + ny;
                if(nx_ < 0 || nx_ >= COLS || ny_ >= ROWS) return true;
                if(ny_ >= 0 && board[ny_][nx_]) return true;
            }
        }
    }
    return false;
}

function merge() {
    for(let y=0; y<current.shape.length; y++) {
        for(let x=0; x<current.shape[y].length; x++) {
            if(current.shape[y][x]) {
                let by = current.y + y;
                let bx = current.x + x;
                // 블록이 보드 위(-1, -2 등)에 있으면 게임 오버
                if(by < 0) {
                    clearInterval(interval);
                    draw();
                    setTimeout(() => alert('게임 오버!'), 100);
                    current = null;
                    return;
                }
                board[by][bx] = current.type + 1;
            }
        }
    }
}

function removeLines() {
    let lines = 0;
    outer: for(let y=ROWS-1; y>=0; y--) {
        for(let x=0; x<COLS; x++) {
            if(!board[y][x]) continue outer;
        }
        board.splice(y,1);
        board.unshift(Array(COLS).fill(0));
        lines++;
        y++;
    }
    if(lines) {
        score += lines * 100;
        scoreEl.textContent = `점수: ${score}`;
    }
}

function newBlock() {
    const type = Math.floor(Math.random()*SHAPES.length);
    current = {
        shape: SHAPES[type].map(row=>row.slice()),
        x: 3,
        y: -2,
        type
    };
    // 게임 오버 체크: 새 블록이 생성된 위치에 이미 충돌이 있으면
    if (collide(0, 0)) {
        clearInterval(interval);
        draw(); // 마지막 상태 그리기
        setTimeout(() => alert('게임 오버!'), 100);
        current = null; // 블록 조작 막기
    }
}

function move(dx, dy) {
    if(!collide(dx, dy)) {
        current.x += dx;
        current.y += dy;
        draw();
        return true;
    }
    return false;
}

function rotate() {
    const nshape = current.shape[0].map((_,i)=>current.shape.map(row=>row[i])).reverse();
    if(!collide(0,0,nshape)) {
        current.shape = nshape;
        draw();
    }
}

function drop() {
    if(!move(0,1)) {
        merge();
        removeLines();
        newBlock();
    }
    draw();
}

function gameLoop() {
    drop();
}

function startGame() {
    resetBoard();
    score = 0;
    scoreEl.textContent = '점수: 0';
    newBlock();
    draw();
    clearInterval(interval);
    interval = setInterval(gameLoop, 400);
}

document.addEventListener('keydown', e => {
    if(!current) return;
    if(e.key === 'ArrowLeft') move(-1,0);
    if(e.key === 'ArrowRight') move(1,0);
    if(e.key === 'ArrowDown') drop();
    if(e.key === 'ArrowUp') rotate();
});

startBtn.addEventListener('click', startGame);