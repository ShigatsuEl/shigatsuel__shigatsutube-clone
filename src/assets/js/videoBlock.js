const videos = document.querySelector(".videos");
const videoBlock = document.querySelectorAll(".videoBlock__thumbnail");

function handleCurrentPlus() {
  videoBlock.forEach((ele) => (ele.currentTime = 5));
}

function init() {
  videoBlock.forEach((ele) =>
    ele.addEventListener("loadedmetadata", handleCurrentPlus)
  );
  if (videoBlock.forEach((ele) => ele.readyState >= 1)) {
    handleCurrentPlus();
  }
}

if (videos) {
  init();
}
