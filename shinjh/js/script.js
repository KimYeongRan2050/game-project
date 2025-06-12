import { getCardFaceImage } from './cardImage.js';

// 카드 한 장을 나타내는 클래스
class Card {
    constructor(row, col, number) {
        this.row = row; // 카드의 행 위치
        this.col = col; // 카드의 열 위치
        this.number = number; // 카드의 고유 번호(짝 맞추기용)
        this.close = true; // 카드가 닫혀있는지 여부(true: 뒷면, false: 앞면)
    }

    // 카드의 x 좌표 계산
    getX(cardSize, padding, start) {
        return start + this.col * (cardSize + padding);
    }

    // 카드의 y 좌표 계산
    getY(cardSize, padding, start) {
        return start + this.row * (cardSize + padding);
    }

    // 카드 이미지를 캔버스에 그림
    draw(ctx, cardSize, padding, start, cardBackSrc) {
        const x = this.getX(cardSize, padding, start);
        const y = this.getY(cardSize, padding, start);
        let img;
        if (!this.close) {
            // 카드가 열려있으면 앞면 이미지
            img = getCardFaceImage(this.number);
        } else {
            // 카드가 닫혀있으면 뒷면 이미지
            img = new Image();
            img.src = cardBackSrc;
        }
        img.onload = function() {
            ctx.drawImage(img, x, y, cardSize, cardSize);
        };
        if (img.complete) {
            ctx.drawImage(img, x, y, cardSize, cardSize);
        }
    }

    // 카드가 클릭되었는지 판정
    isClicked(mx, my, cardSize, padding, start) {
        const x = this.getX(cardSize, padding, start);
        const y = this.getY(cardSize, padding, start);
        return (
            mx >= x && mx <= x + cardSize &&
            my >= y && my <= y + cardSize
        );
    }
}

// 카드 게임 전체를 관리하는 클래스
class CardGame {
    constructor(canvas, ctx) {
        this.canvas = canvas; // 게임 캔버스
        this.ctx = ctx; // 캔버스 컨텍스트
        this.ROWS = 4; // 카드 행 개수
        this.COLS = 4; // 카드 열 개수
        this.PADDING = 10; // 카드 간격
        this.CARD_SIZE = Math.floor((canvas.width - this.PADDING * (this.COLS + 1)) / this.COLS); // 카드 한 변의 크기
        this.START = this.PADDING; // 시작 위치
        this.cardBackSrc = './img/check.png'; // 카드 뒷면 이미지 경로

        this.cards = []; // 카드 객체 배열
        this.firstCard = null; // 첫 번째로 연 카드
        this.secondCard = null; // 두 번째로 연 카드
        this.lock = false; // 비교 중 클릭 잠금

        this.init(); // 카드 배열 초기화 및 셔플
        this.drawCards(); // 초기 카드 그리기
        this.canvas.addEventListener('click', this.handleClick.bind(this)); // 클릭 이벤트 등록
    }

    // 카드 배열 생성 및 셔플
    init() {
        let cardNumbers = [];
        for (let i = 1; i <= 8; i++) {
            cardNumbers.push(i, i); // 1~8을 두 번씩 추가
        }
        // Fisher-Yates 셔플
        for (let i = cardNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardNumbers[i], cardNumbers[j]] = [cardNumbers[j], cardNumbers[i]];
        }
        // 카드 객체 생성
        this.cards = [];
        let idx = 0;
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                this.cards.push(new Card(row, col, cardNumbers[idx++]));
            }
        }
        this.firstCard = null;
        this.secondCard = null;
        this.lock = false;
    }

    // 모든 카드를 캔버스에 그림
    drawCards() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cards.forEach(card => {
            card.draw(this.ctx, this.CARD_SIZE, this.PADDING, this.START, this.cardBackSrc);
        });
    }

    // 캔버스 클릭 이벤트 핸들러
    handleClick(e) {
        if (this.lock) return; // 비교 중이면 무시
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        for (let card of this.cards) {
            // 닫힌 카드 중 클릭된 카드 찾기
            if (card.isClicked(mx, my, this.CARD_SIZE, this.PADDING, this.START) && card.close) {
                if (this.firstCard && this.secondCard) return; // 이미 두 장 선택된 경우 무시

                card.close = false; // 카드 열기
                this.drawCards();

                if (!this.firstCard) {
                    // 첫 번째 카드 선택
                    this.firstCard = card;
                } else if (!this.secondCard && card !== this.firstCard) {
                    // 두 번째 카드 선택
                    this.secondCard = card;
                    this.lock = true; // 비교 중 잠금
                    setTimeout(() => {
                        if (this.firstCard.number !== this.secondCard.number) {
                            // 두 카드가 다르면 다시 닫기
                            this.firstCard.close = true;
                            this.secondCard.close = true;
                        }
                        // 선택 상태 초기화
                        this.firstCard = null;
                        this.secondCard = null;
                        this.lock = false;
                        this.drawCards();

                        // 모든 카드가 열렸는지 확인(게임 클리어)
                        if (this.cards.every(c => !c.close)) {
                            setTimeout(() => {
                                window.location.href = 'CardGameClear.html';
                            }, 2000);
                        }
                    }, 800);
                }
                break;
            }
        }
    }
}

// 캔버스와 컨텍스트 객체 가져오기
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 게임 인스턴스 생성 및 실행
const game = new CardGame(canvas, ctx);


