const videos = document.querySelector(".videos");
const userName = document.getElementById("jsUserName");
const videoBlock = document.querySelectorAll(".videoBlock__thumbnail");

function handleCurrentPlus() {
  videoBlock.forEach((ele) => {
    ele.currentTime = 5;
  });
}

function init() {
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
