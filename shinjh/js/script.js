import { getCardFaceImage } from './cardImage.js';

// 캔버스와 컨텍스트 객체 가져오기
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 카드와 캔버스 레이아웃 관련 상수 정의
const ROWS = 4, COLS = 4;
const PADDING = 10;
const CARD_SIZE = Math.floor((canvas.width - PADDING * (COLS + 1)) / COLS);
const START = PADDING;

const cardBackSrc = '/shinjh/img/check.png';

// 1~8까지의 카드 번호를 두 번씩 배열에 추가 (총 16장)
let cardNumbers = [];
for (let i = 1; i <= 8; i++) {
    cardNumbers.push(i, i);
}

// 카드 배열을 Fisher-Yates 알고리즘으로 랜덤하게 섞기
for (let i = cardNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardNumbers[i], cardNumbers[j]] = [cardNumbers[j], cardNumbers[i]];
}

// 카드 정보를 담는 배열 생성 (행, 열, 카드 번호, 닫힘 여부)
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

// 모든 카드를 캔버스에 그리는 함수
function drawCards() {
    // 캔버스 전체 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cards.forEach(card => {
        const x = START + card.col * (CARD_SIZE + PADDING);
        const y = START + card.row * (CARD_SIZE + PADDING);
        let img;
        if (!card.close) {
            // 열린 상태면 카드 앞면 이미지를 그림
            img = getCardFaceImage(card.number);
        } else {
            // 닫힌 상태면 카드 뒷면 이미지를 그림
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

// 게임 시작 시 모든 카드가 닫혀있는 상태로 보이도록 그림
drawCards();

// 카드 선택 상태 및 클릭 잠금 변수
let firstCard = null;
let secondCard = null;
let lock = false; // 애니메이션 중 클릭 방지

// 캔버스 클릭 이벤트 핸들러
canvas.addEventListener('click', function(e) {
    if (lock) return; // 애니메이션 중이면 클릭 무시
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // 클릭한 위치에 해당하는 카드 찾기
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

            card.close = false; // 카드 열기
            drawCards();

            if (!firstCard) {
                // 첫 번째 카드 선택
                firstCard = card;
            } else if (!secondCard && card !== firstCard) {
                // 두 번째 카드 선택
                secondCard = card;
                lock = true; // 비교 중에는 클릭 잠금
                setTimeout(() => {
                    if (firstCard.number === secondCard.number) {
                        // 두 카드가 같으면 열린 상태 유지
                    } else {
                        // 다르면 다시 닫기
                        firstCard.close = true;
                        secondCard.close = true;
                    }
                    firstCard = null;
                    secondCard = null;
                    lock = false;
                    drawCards();

                    // 모든 카드가 열렸는지 확인 (게임 클리어)
                    if (cards.every(c => !c.close)) {
                        setTimeout(() => {
                            // alert('게임 클리어!');
                            window.location.href = 'CardGameClear.html';
                        }, 2000);
                    }
                }, 800);
            }
            break;
        }
    }
});


