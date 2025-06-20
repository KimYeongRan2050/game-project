//gameFlow.js
import { setStartTime, setGameState, score, setElapsedTime, setScore, setLives } from "../js/gameState.js";
import { audioFiles } from "./js/audioManager.js";

export function startPlaying() {
  setStartTime(Date.now());
  setGameState("playing");
  audioFiles.beforeStart.pause();
  audioFiles.gameBGM.loop = true;
  audioFiles.gameBGM.play();
  setScore(0);
  setElapsedTime(0);
  setLives(3);
}