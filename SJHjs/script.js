const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 카드와 캔버스 레이아웃 관련 상수
const ROWS = 4, COLS = 4;
const PADDING = 10;
const CARD_SIZE = Math.floor((canvas.width - PADDING * (COLS + 1)) / COLS);
const START = PADDING;

const cardBackSrc = 'SJHimg/check.png';


function getCardFaceImage(cardNumber) {
    const img = new Image();
    img.src = `SJHimg/${cardNumber}.png`;
    return img;
}


// 1~8.png를 각각 두 번씩 사용하여 카드 배열 생성
let cardNumbers = [];
for (let i = 1; i <= 8; i++) {
    cardNumbers.push(i, i);
}

// 카드 배열을 랜덤하게 섞기 (Fisher-Yates shuffle)
for (let i = cardNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardNumbers[i], cardNumbers[j]] = [cardNumbers[j], cardNumbers[i]];
}

// 카드 정보를 담는 배열 (행, 열 위치와 카드 번호)
let cards = [];
let idx = 0;
for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
        cards.push({
            row,
            col,
            number: cardNumbers[idx++],
            close: true // 처음에는 모두 닫힘
        });
    }
}

// 카드 그리기 예시
function drawCards() {
    // 캔버스 전체 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cards.forEach(card => {
        const x = START + card.col * (CARD_SIZE + PADDING);
        const y = START + card.row * (CARD_SIZE + PADDING);
        let img;
        if (!card.close) {
            // 열린 상태면 카드 앞면만 그림
            img = getCardFaceImage(card.number);
        } else {
            // 닫힌 상태면 카드 뒷면(check.png)만 그림
            img = new Image();
            img.src = cardBackSrc;
        }
        img.onload = function() {
            ctx.drawImage(img, x, y, CARD_SIZE, CARD_SIZE);
        };
        if (img.complete) {
            ctx.drawImage(img, x, y, CARD_SIZE, CARD_SIZE);
        }
    });
}

// 카드 배열 생성 후, 시작 시 모든 카드가 닫혀있는 상태로 보이도록 그림
drawCards();

let firstCard = null;
let secondCard = null;
let lock = false; // 애니메이션 중 클릭 방지

canvas.addEventListener('click', function(e) {
    if (lock) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // 카드 위치 찾기
    for (let card of cards) {
        const x = START + card.col * (CARD_SIZE + PADDING);
        const y = START + card.row * (CARD_SIZE + PADDING);
        if (
            mx >= x && mx <= x + CARD_SIZE &&
            my >= y && my <= y + CARD_SIZE &&
            card.close
        ) {
            // 이미 열린 카드 클릭 방지
            if (firstCard && secondCard) return;

            card.close = false;
            drawCards();

            if (!firstCard) {
                firstCard = card;
            } else if (!secondCard && card !== firstCard) {
                secondCard = card;
                lock = true;
                setTimeout(() => {
                    if (firstCard.number === secondCard.number) {
                        // 맞춘 경우 열어둠
                    } else {
                        // 틀린 경우 다시 닫음
                        firstCard.close = true;
                        secondCard.close = true;
                    }
                    firstCard = null;
                    secondCard = null;
                    lock = false;
                    drawCards();

                    // 게임 클리어 체크
                    if (cards.every(c => !c.close)) {
                        setTimeout(() => {
                            // alert('게임 클리어!');
                            window.location.href = 'clear.html';
                        }, 2000);
                    }
                }, 800);
            }
            break;
        }
    }
});


