/* eslint-disable func-names */

(function () {
  const videoBlocks = document.querySelectorAll(".videoBlock");
  const lastestVideoBlock = document.querySelector(".latest__video-wrapper");
  const bestVideoBlock = document.querySelector(".best__view__video-wrapper");

  if (videoBlocks) {
    videoBlocks.forEach((videoBlock) => {
      const videoElement = videoBlock.querySelector(".videoBlock__video");
      const imgElement = videoBlock.querySelector(".videoBlock__thumbnail");
      videoBlock.addEventListener("mouseover", () => {
        setTimeout(() => {
          videoElement.play();
          imgElement.classList.add("hidden");
        }, 0);
      });
      videoBlock.addEventListener("mouseleave", () => {
        setTimeout(() => {
          videoElement.pause();
          videoElement.currentTime = "0";
          imgElement.classList.remove("hidden");
        }, 0);
      });
    });
  }

  if (lastestVideoBlock) {
    const videoElement = lastestVideoBlock.querySelector(".videoBlock__video");
    const imgElement = lastestVideoBlock.querySelector(
      ".videoBlock__thumbnail"
    );
    lastestVideoBlock.addEventListener("mouseover", () => {
      if (!videoElement.playing) {
        setTimeout(() => {
          videoElement.play();
          imgElement.classList.add("hidden");
        }, 0);
      }
    });
    lastestVideoBlock.addEventListener("mouseleave", () => {
      if (!videoElement.paused) {
        setTimeout(() => {
          videoElement.pause();
          videoElement.currentTime = "0";
          imgElement.classList.remove("hidden");
        }, 0);
      }
    });
  }

  if (bestVideoBlock) {
    const videoElement = bestVideoBlock.querySelector(".videoBlock__video");
    const imgElement = bestVideoBlock.querySelector(".videoBlock__thumbnail");
    bestVideoBlock.addEventListener("mouseover", () => {
      if (!videoElement.playing) {
        setTimeout(() => {
          videoElement.play();
          imgElement.classList.add("hidden");
        }, 0);
      }
    });
    bestVideoBlock.addEventListener("mouseleave", () => {
      if (!videoElement.paused) {
        setTimeout(() => {
          videoElement.pause();
          videoElement.currentTime = "0";
          imgElement.classList.remove("hidden");
        }, 0);
      }
    });
  }
})();
