let ballPosition = -1;
let gameOver = false;

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
    cup.style.pointerEvents = 'auto';
    cup.style.opacity = '1'; // 컵을 원 상태로  
  });

  setTimeout(() => {
    let startBtn = document.getElementById('startBtn');
    startBtn.style.pointerEvents = 'none';
    startBtn.style.opacity = '0.5';
  }, 1200);

  shuffleCups(); // 컵을 섞기

  console.log("게임이 시작되었습니다. 컵을 섞습니다."); // 디버깅용 로그
}

function shuffleCups() {
   let cups = document.querySelectorAll('.cup');
  let positions = [0, 1, 2]; // 컵 인덱스 배열

  // 배열을 랜덤하게 섞기
  positions = positions.sort(() => Math.random() - 0.5);

  // 각 컵에 새로운 위치 적용
  cups.forEach((cup, index) => {
    cup.style.transition = 'transform 0.5s ease-in-out';
    cup.style.transform = `translateX(${(positions[index] - index) * 100}px)`;
  });

  // 일정 시간 후 컵을 원래 자리로 되돌리기
  setTimeout(() => {
    cups.forEach(cup => {
      cup.style.transform = 'translateX(0)';
    });
  }, 500);

  console.log("컵을 섞었습니다."); // 디버깅용 로그
}

function cupSelection(index) {
  if (gameOver) return;

  //let cupEl = document.querySelectorAll('.cup');

  let selCup = document.getElementById(`cup${index}`);
  selCup.style.transform = 'translateY(-60px)';

  if (index === ballPosition) {
    document.getElementById(`ball${index}`).style.display = "block";
    alert("주사위를 찾았습니다. 축하합니다.");

    setTimeout(() => {
      // 모든 컵 클릭 방지
      document.querySelectorAll('.cup').forEach(cup => {
        cup.style.pointerEvents = 'none';
        cup.style.opacity = '0.5'; // 컵을 흐리게 표시
      });

      let startBtn = document.getElementById('startBtn');
      startBtn.style.pointerEvents = 'auto';
      startBtn.style.opacity = '1';

      //startBtn.removeEventListener("click", startGame);
      //startBtn.addEventListener("click", startGame);
    }, 500);

    gameOver = true;

  } else {
    alert("틀렸습니다. 다시 도전해 보세요.");
    gameOver = true;

    setTimeout(() => {
      document.querySelectorAll('.cup').forEach(cup => {
        cup.style.pointerEvents = 'none';
        cup.style.opacity = '0.5'; // 컵을 흐리게 표시
      });

      let startBtn = document.getElementById('startBtn');
      startBtn.style.pointerEvents = 'auto';
      startBtn.style.opacity = '1';
    }, 500);
  }
}