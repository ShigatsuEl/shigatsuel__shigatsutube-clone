import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const progressBar = document.getElementById("jsProgressRangeBar");
const leftBtn = document.getElementById("jsLeftBtn");
const rightBtn = document.getElementById("jsRightBtn");
const filledBar = document.getElementById("jsFilledBar");
const controlBar = document.getElementById("jsControlBar");

// Match Media(JS)
const element = document.querySelector(".videoPlayer__Bar");
const newProgressBar = document.createElement("div");
const newFilledBar = document.createElement("div");

let timer;

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

function handleVideoPlayer() {
  if (videoPlayer.played) {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handlePlaySpace(event) {
  if (videoPlayer.paused) {
    if (event.keyCode === 32) {
      videoPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  } else if (event.keyCode === 32) {
    videoPlayer.pause();
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

// 비디오에 마우스가 올라가면 3초 후에 발생하는 이벤트
function handleTransparent() {
  controlBar.style.opacity = "0";
  videoPlayer.style.cursor = "none";
  progressBar.style.opacity = "0";
  //모바일 버전 newProgressBar
  newProgressBar.style.opacity = "0";
}

// 비디오가 로드되고 3초동안 발생하는 이벤트
function handleVideoStart() {
  controlBar.style.opacity = "1";
  progressBar.style.opacity = "1";
  //모바일 버전 newProgressBar
  newProgressBar.style.opacity = "1";
  clearTimeout(timer);
  timer = setTimeout(handleTransparent, 3000);
}
// 비디오에 마우스가 올라가면 3초동안 발생하는 이벤트
function handleMouse() {
  controlBar.style.opacity = "1";
  videoPlayer.style.cursor = "pointer";
  progressBar.style.opacity = "1";
  //모바일 버전 newProgressBar
  newProgressBar.style.opacity = "1";
  clearTimeout(timer);
  timer = setTimeout(handleTransparent, 3000);
}

// Full Screen 상태에서 상태변화를 감지하면 발생하는 이벤트
function exitHandler() {
  if (
    !document.fullscreenElement &&
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement
  ) {
    ///fire your event
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener("click", goFullScreen);
  }
}

function exitFullScreen() {
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
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
  document.addEventListener("fullscreenchange", exitHandler);
  document.addEventListener("webkitfullscreenchange", exitHandler);
  document.addEventListener("mozfullscreenchange", exitHandler);
  document.addEventListener("MSFullscreenChange", exitHandler);
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

async function setTotalTime() {
  let duration;
  if (!isFinite(videoPlayer.duration)) {
    const blob = await fetch(videoPlayer.src).then((response) =>
      response.blob()
    );
    duration = await getBlobDuration(blob);
    // console.log("if", blob, duration);
  } else {
    duration = videoPlayer.duration;
    // console.log("else", duration);
  }
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  registerView();
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
  newFilledBar.style.width = `${percent}%`;
}

function handleProgressSeek(event) {
  const seekTotal = parseInt(progressBar.offsetWidth, 10);
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
  progressBar.setAttribute("value", percent);
}

// 화살표 -> 누를 시 발생하는 이벤트
function handleArrowRight(event) {
  if (event.keyCode === 39) {
    const max = Math.floor(videoPlayer.duration);
    videoPlayer.currentTime += 10;
    const current = Math.floor(videoPlayer.currentTime);
    const percent = 100 * (current / max);
    progressBar.value = percent;
    progressBar.setAttribute("value", percent);
  }
}

// 화살표 <- 누를 시 발생하는 이벤트
function handleArrowLeft(event) {
  if (event.keyCode === 37) {
    const max = Math.floor(videoPlayer.duration);
    videoPlayer.currentTime -= 10;
    const current = Math.floor(videoPlayer.currentTime);
    const percent = 100 * (current / max);
    progressBar.value = percent;
    progressBar.setAttribute("value", percent);
  }
}

// Right Btn을 누를 시 발생하는 이벤트
function handleRightBtn() {
  const max = Math.floor(videoPlayer.duration);
  videoPlayer.currentTime += 10;
  const current = Math.floor(videoPlayer.currentTime);
  const percent = 100 * (current / max);
  progressBar.value = percent;
  progressBar.setAttribute("value", percent);
}

// Left Btn을 누를 시 발생하는 이벤트
function handleLeftBtn() {
  const max = Math.floor(videoPlayer.duration);
  videoPlayer.currentTime -= 10;
  const current = Math.floor(videoPlayer.currentTime);
  const percent = 100 * (current / max);
  progressBar.value = percent;
  progressBar.setAttribute("value", percent);
}

function handleMouseOver() {
  document.addEventListener("keydown", handlePlaySpace);
  document.addEventListener("keydown", handleArrowRight);
  document.addEventListener("keydown", handleArrowLeft);
}

function handleMouseLeave() {
  document.removeEventListener("keydown", handlePlaySpace);
  document.removeEventListener("keydown", handleArrowRight);
  document.removeEventListener("keydown", handleArrowLeft);
}

function mediaMatch() {
  // Width가 720px이하면 적용되는 자바스크립트 구문
  const mql = window.matchMedia("(max-width:720px)");
  if (mql.matches) {
    element.removeChild(progressBar);
    newProgressBar.classList.add("videoPlayer__progressBar");
    newProgressBar.id = "jsProgressBarFilled";
    element.prepend(newProgressBar);
    newFilledBar.classList.add("videoPlayer__filledBar");
    newFilledBar.id = "jsFilledBar";
    newFilledBar.style.width = 0;
    newProgressBar.prepend(newFilledBar);
    videoPlayer.addEventListener("timeupdate", handleMobileProgress);
    newProgressBar.addEventListener("click", handleMobileProgressSeek);
    newProgressBar.addEventListener("dragover", handleMobileProgressSeek);
    rightBtn.addEventListener("click", handleRightBtn);
    leftBtn.addEventListener("click", handleLeftBtn);
  } else {
    videoPlayer.addEventListener("timeupdate", handleProgress);
    progressBar.addEventListener("click", handleProgressSeek);
    progressBar.addEventListener("dragover", handleProgressSeek);
    rightBtn.addEventListener("click", handleRightBtn);
    leftBtn.addEventListener("click", handleLeftBtn);
  }

  // 모바일 Width가 1024px 이하면 발생하는 이벤트
  const mqlTwo = window.matchMedia("(max-device-width:1024px)");
  if (mqlTwo.matches) {
    videoPlayer.removeEventListener("click", handlePlayClick);
    element.removeChild(progressBar);
    newProgressBar.classList.add("videoPlayer__progressBar");
    newProgressBar.id = "jsProgressBarFilled";
    element.prepend(newProgressBar);
    newFilledBar.classList.add("videoPlayer__filledBar");
    newFilledBar.id = "jsFilledBar";
    newFilledBar.style.width = 0;
    newProgressBar.prepend(newFilledBar);
    videoPlayer.addEventListener("timeupdate", handleMobileProgress);
    newProgressBar.addEventListener("click", handleMobileProgressSeek);
    newProgressBar.addEventListener("dragover", handleMobileProgressSeek);
    rightBtn.addEventListener("click", handleRightBtn);
    leftBtn.addEventListener("click", handleLeftBtn);
  }
}

function init() {
  videoPlayer.volume = 1;
  videoPlayer.addEventListener("play", handleVideoPlayer);
  videoContainer.addEventListener("mouseover", handleMouseOver);
  videoContainer.addEventListener("mouseleave", handleMouseLeave);
  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoContainer.addEventListener("mousemove", handleMouse);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleVolumeRange);

  // 배포 후 혹시나 loadedmetadata가 작동 시 발생하는 이벤트
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("loadedmetadata", handleVideoStart);

  // 배포 후 loadedmetadata 이벤트가 작용하지 않음 -> readyState로 해결
  if (videoPlayer.readyState >= 1) {
    setTotalTime();
    handleVideoPlayer();
    handleVideoStart();
  }

  // 모바일에서 적용되는 스크롤바 Media Match
  mediaMatch();
}

if (videoContainer) {
  init();
}
