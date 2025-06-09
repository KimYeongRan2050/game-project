let ballPosition = -1;

function startGame() {
  ballPosition = Math.floor(Math.random() * 3); // 랜덤으로 공 위치 설정
  gameOver = false;

  // 모든 공 숨김
  document.querySelectorAll('.ball').forEach(ball => {
    ball.style.display = 'none';
  });

  // 모든 컵을 원래 위치로 복귀
  document.querySelectorAll('.cup').forEach(cup => {
    cup.style.transform = 'translateY(0)';
    cup.style.pointerEvents = 'block';
    cup.style.opacity = '1'; // 컵을 흐리게 표시        
  });
}

let gameOver = false;

function cupSelection(index) {
  if (gameOver) return;

  let cupEl = document.querySelectorAll('.cup');

  let selCup = document.getElementById(`cup${index}`);
  selCup.style.transform = 'translateY(-60px)';

  if (index === ballPosition) {
    document.getElementById(`ball${index}`).style.display = "block";
    alert("정답입니다! 공을 찾았습니다. 축하합니다.");

    setTimeout(() => {
      // 모든 컵 클릭 방지
      cupEl.forEach(cup => {
        cup.style.pointerEvents = 'none';
        cup.style.opacity = '0.5'; // 컵을 흐리게 표시
      });
    }, 500);

    gameOver = true;

  } else {
    alert("틀렸습니다. 다시 찾아 보세요!");
  }
}