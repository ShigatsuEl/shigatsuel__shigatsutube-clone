const videos = document.querySelector(".videos");
const userName = document.getElementById("jsUserName");
const videoBlock = document.querySelectorAll(".videoBlock__thumbnail");

// DOM이 로드가 되면 비디오 시작시간을 5초로 고정함
function handleCurrentPlus() {
  videoBlock.forEach((ele) => {
    ele.currentTime = 5;
  });
}

// Home Template에 있는 videoBlock들이 검정화면으로 나오는 것을 방지하기 위한 script
function init() {
  // DOMContentLoaded 이벤트를 발생시켜 로드가 되면함수를 호출함
  document.addEventListener("DOMContentLoaded", handleCurrentPlus);
  if (videoBlock.forEach((ele) => ele.readyState === "complete")) {
    handleCurrentPlus();
  }
}

if (videos) {
  init();
} else if (userName) {
  init();
}
