const { HttpRequest } = require("aws-sdk");

const videos = document.querySelector(".videos");
const videoBlock = document.querySelectorAll(".videoBlock__thumbnail");

function handleCurrentPlus() {
  videoBlock.forEach((ele) => (ele.currentTime = 5));
}

function init() {
  videoBlock.forEach((ele) =>
    ele.addEventListener("loadedmetadata", handleCurrentPlus)
  );
  if (HttpRequest.readyState === 4) {
    if (HttpRequest.status === 200) {
      videoBlock.forEach((ele) => handleCurrentPlus());
    }
  }
}

if (videos) {
  init();
}
