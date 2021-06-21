/* eslint-disable func-names */

(function () {
  const videoBlocks = document.querySelectorAll(".videoBlock");
  const lastestVideoBlock = document.querySelector(".latest__video-box");
  const bestVideoBlock = document.querySelector(".best__view__video-box");

  if (videoBlocks) {
    videoBlocks.forEach((videoBlock) => {
      const videoElement = videoBlock.querySelector(".videoBlock__thumbnail");
      videoBlock.addEventListener("mouseover", () => {
        if (!videoElement.playing) {
          setTimeout(() => {
            videoElement.play();
          }, 0);
        }
      });
      videoBlock.addEventListener("mouseleave", () => {
        if (!videoElement.paused) {
          setTimeout(() => {
            videoElement.pause();
            videoElement.load();
          }, 0);
        }
      });
    });
  }

  if (lastestVideoBlock) {
    const videoElement = lastestVideoBlock.querySelector(
      ".videoBlock__thumbnail"
    );
    lastestVideoBlock.addEventListener("mouseover", () => {
      if (!videoElement.playing) {
        setTimeout(() => {
          videoElement.play();
        }, 0);
      }
    });
    lastestVideoBlock.addEventListener("mouseleave", () => {
      if (!videoElement.paused) {
        setTimeout(() => {
          videoElement.pause();
          videoElement.load();
        }, 0);
      }
    });
  }

  if (bestVideoBlock) {
    const videoElement = bestVideoBlock.querySelector(".videoBlock__thumbnail");
    bestVideoBlock.addEventListener("mouseover", () => {
      if (!videoElement.playing) {
        setTimeout(() => {
          videoElement.play();
        }, 0);
      }
    });
    bestVideoBlock.addEventListener("mouseleave", () => {
      if (!videoElement.paused) {
        setTimeout(() => {
          videoElement.pause();
          videoElement.load();
        }, 0);
      }
    });
  }
})();
