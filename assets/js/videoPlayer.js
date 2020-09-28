const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const progressBar = document.getElementById("jsProgressBarFilled");
const filledBar = document.getElementById("jsFilledBar");
const mql = window.matchMedia("(max-width:900px)");

const element = document.querySelector(".videoPlayer__Bar");
const newProgressBar = document.createElement("div");
newProgressBar.classList.add("videoPlayer__progressBar");
newProgressBar.id = "jsProgressBarFilled";
const newFilledBar = document.createElement("div");
newFilledBar.classList.add("videoPlayer__filledBar");
newFilledBar.id = "jsFilledBar";
newFilledBar.style.width = 0;

window.matchMedia("screen and (orientation:portrait)");
window.matchMedia(
  "only screen and (max-device-width: 900px) and (-webkit-device-pixel-ratio:1)"
);

function handleVideoPlayer() {
  if (videoPlayer.played) {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  videoPlayer.style.cssText = "max-width: $first-width";
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  if (document.exitFullScreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullScreen) {
    document.msExitFullScreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  videoPlayer.style.cssText = "max-width: 100%";
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.ceil(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleVolumeRange(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value > 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value > 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleMobileProgressSeek(event) {
  const seekTotal = parseInt(newProgressBar.offsetWidth, 10);
  const seekX = event.offsetX;
  const seekPercent = 100 * (seekX / seekTotal);
  newFilledBar.style.width = seekPercent;
  const seekMove = (seekPercent / 100) * Math.floor(videoPlayer.duration);
  videoPlayer.currentTime = seekMove;
}

function handleMobileProgress() {
  const max = Math.floor(videoPlayer.duration);
  const current = Math.floor(videoPlayer.currentTime);
  const percent = 100 * (current / max);
  newFilledBar.style.width = percent + "%";
}

function handleProgressSeek(event) {
  const seekTotal = parseInt(progressBar.offsetWidth, 10);
  console.log(progressBar.offsetWidth);
  const seekX = event.offsetX;
  const seekPercent = 100 * (seekX / seekTotal);
  progressBar.value = seekPercent;
  progressBar.setAttribute("value", seekPercent);
  const seekMove = (seekPercent / 100) * Math.floor(videoPlayer.duration);
  videoPlayer.currentTime = seekMove;
}

function handleProgress() {
  const max = Math.floor(videoPlayer.duration);
  const current = Math.floor(videoPlayer.currentTime);
  const percent = 100 * (current / max);
  progressBar.value = percent;
}

function mediaMatch() {
  if (mql.matches) {
    element.removeChild(jsProgressBarFilled);
    element.prepend(newProgressBar);
    newProgressBar.prepend(newFilledBar);
    videoPlayer.addEventListener("timeupdate", handleMobileProgress);
    newProgressBar.addEventListener("click", handleMobileProgressSeek);
    newProgressBar.addEventListener("touchmove", handleMobileProgressSeek);
  } else {
    videoPlayer.addEventListener("timeupdate", handleProgress);
    progressBar.addEventListener("click", handleProgressSeek);
    progressBar.addEventListener("dragover", handleProgressSeek);
  }
}

function init() {
  videoPlayer.volume = 1;
  videoPlayer.addEventListener("play", handleVideoPlayer);
  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleVolumeRange);
  mediaMatch();
}

if (videoContainer) {
  init();
}
