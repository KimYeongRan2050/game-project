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
  bgCanvas.width = window.innerWidth; 
  bgCanvas.height = document.documentElement.scrollHeight; // 스크롤 가능한 전체 페이지 높이로 설정

  updateStars(); // 별의위치
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
