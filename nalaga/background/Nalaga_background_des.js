document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.overflow = "auto"; 

const bgCanvas = document.getElementById("myCanvas");
const bgCtx = bgCanvas.getContext("2d");

const colors = ["#ff1493", "#2323ff", "#ffffff"]; 

let starCount = 100;
let stars = [];  
const starSize = 4;  // 고정된 크기

function updateStars() {
  stars.length = 0; // 별 배열 초기화

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      size: starSize,
      brightness: Math.random(),
      speed: Math.random() * 0.005 + 0.001,
      direction: Math.random() < 0.5 ? -1 : 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function setCanvasSize() {
<<<<<<< HEAD
  bgCanvas.width = window.innerWidth; 
  bgCanvas.height = document.documentElement.scrollHeight; // 스크롤 가능한 전체 페이지 높이로 설정

  updateStars(); // 별의위치
=======
  bgCanvas.width = window.innerWidth;  // 화면 너비에 맞게 설정
  bgCanvas.height = window.innerHeight; // 화면 높이에 맞게 설정

  updateStars(); // 별의 위치 갱신
>>>>>>> 66fedce (설명페이지 재등록)
}

function animateBackground() {
  bgCtx.fillStyle = "black"; 
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  stars.forEach(star => {
    star.brightness += star.speed * star.direction;

    if (star.brightness >= 1) {
      star.brightness = 0.0000005;
      star.direction = -0.0000005;
    } else if (star.brightness <= 0.2) {
      star.brightness = 0.2;
      star.direction = 1;
    }

    bgCtx.fillStyle = hexToRgba(star.color, star.brightness);
    bgCtx.fillRect(star.x, star.y, star.size, star.size); 
  });

  requestAnimationFrame(animateBackground); 
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

animateBackground();

window.addEventListener("resize", setCanvasSize); 
window.addEventListener("scroll", setCanvasSize); 
<<<<<<< HEAD
=======




// document.body.style.backgroundSize = "cover"; // 배경 이미지가 전체 화면을 덮도록 설정
// document.body.style.backgroundPosition = "center"; // 배경 이미지의 위치를 가운데로 설정
// document.body.style.backgroundAttachment = "fixed"; // 배경 고정


// const bgCanvas = document.getElementById("myCanvas");
// const bgCtx = bgCanvas.getContext("2d");

// const starCount = 100;
// const stars = [];
// const colors = ["#ff1493", "#2323ff", "#ffffff"];
// // const colors = [rgb(252, 24, 115),rgb(100, 251, 24),rgb(223, 255, 18)];

// // 100개의 별이 랜덤한 위치에서 랜덤한 색상으로 생성
// for (let i = 0; i < starCount; i++) {
//   stars.push({
//     x:Math.random() * bgCanvas.width,
//     y:Math.random() *bgCanvas.height,
//     size: 4, // 별 크기 (도트게임이라 1픽셀로 수정했는데 너무 작으면 늘리기 radiussi로 바꾸면 동그란 원으로 바뀜(밑에 그 원에 대한 지름 함수 추가해야 하지만)
//     brightness: Math.random(), //밝기 초기값
//     speed: Math.random() * 0.005 + 0.001, // 깜빡이는 속도 ver.0에 있는 코드 섞었는데 괜찮게 됨
//      direction: Math.random() < 0.5 ? -1 : 1 , // 밝기증가 / 감소방향(감소방향?)
//     color: colors[Math.floor(Math.random() *colors.length)]
//   });
// }

// // 애니메이션 루프: 매 프레임 마다 배경을 그리고(검정으로 덮고) 별을 다시그림
// function animateBackground() {
//   bgCtx.fillStyle = "black" // 검정으로 덮어서 초기화
//   bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);


// stars.forEach(star => {

//   star.brightness += star.speed * star.direction;

//   // 별의 최대 밝기를 1로 설정하고 별의 밝기가 1이 됐을 경우 -1로 작아지게 함 / -1일 경우 다시 1로 밝아지게 함
//   // 잘 모르겠는데 ver1 코드랑 짬뽕하니 정확히 내가 원하는대로 반짝이게 수정됨..
//  if (star.brightness >= 1) {
//       star.brightness = 0.0000005;
//       star.direction = -0.0000005;
//     } else if (star.brightness <= 0.2) {
//       star.brightness = 0.2;
//       star.direction = 1;
//     }

// // 현재 밝기에 따라 각 색상에 알파값을 적용
// // 알파값이란? 색상을 그대로 유지하면서 투명도를 조절하는것(선명해졌다~흐려졌다 로 깜빡이는 효과를 줄 수 있음)
// bgCtx.fillStyle = hexToRgba(star.color, star.brightness);

// bgCtx.fillRect(star.x, star.y, star.size, star.size); // 정사각형 도트로 그림
//   });

// requestAnimationFrame(animateBackground);
// }

// // HEX 색상 + 알파값 → rgba() 형식으로 변환
// // 자바 스크립트는 RGB(16진수)색상의 값을 이해 할 수 없음, 그래서 자바스크립트가 이해 할 수 있는 10진수의 숫자값으로 변환해줘야함
// // 인간이 이 변환계산을 해야 하는가? -> 아니요
// // parseInt 가 인간이 해당 계산을 할 필요 없게 알아서 계산해줌 
// // parseInt(hex.slice(1, 3), 16) 에서 뒷부분 16이 16진수를 10으로 변환한다는 뜻
// // 10진수 색상값+반짝반짝 알파값
// function hexToRgba(hex, alpha) {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// }

// animateBackground();


>>>>>>> 66fedce (설명페이지 재등록)
