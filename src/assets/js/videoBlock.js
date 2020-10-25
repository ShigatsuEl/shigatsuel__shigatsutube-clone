const videos = document.querySelector(".videos");
const videoBlock = document.querySelectorAll(".videoBlock__thumbnail");

function handleCurrentPlus() {
  videoBlock.forEach((ele) => {
    ele.currentTime = 5;
    console.log(ele.readyState);
  });
}

function init() {
  /* videoBlock.forEach((ele) =>
    ele.addEventListener("loadedmetadata", handleCurrentPlus)
  ); */
  document.addEventListener("DOMContentLoaded", handleCurrentPlus);
  if (videoBlock.forEach((ele) => ele.readyState === "complete")) {
    handleCurrentPlus();
  }
}

if (videos) {
  init();
}
