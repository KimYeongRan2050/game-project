// audio.js
export const audioFiles = {
  beforeStart: new Audio("bgm/0beforeStart.mp3"),
  gameBGM: new Audio("bgm/1While Playing Game bgm.mp3"),
  shoot: new Audio("bgm/2Player Shot.mp3"),
  enemyShoot: new Audio("bgm/2Enemy Shot3.mp3"),
  playerHit: new Audio("bgm/3Player got hit.mp3"),
  enemyHit: new Audio("bgm/3Enemy got hit.mp3"),
  clear: new Audio("bgm/3Clear.mp3"),
  gameOver: new Audio("bgm/4Gameover.mp3")
};

audioFiles.beforeStart.loop = true;

export function playAudio(file) {
  const audio = audioFiles[file];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.log("오디오 재생 오류: ", error);
    });
  }
}

export function stopAudio(file) {
  const audio = audioFiles[file];
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}
