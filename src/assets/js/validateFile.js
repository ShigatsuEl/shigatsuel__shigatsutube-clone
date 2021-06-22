/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
const formListener = (e) => {
  e.preventDefault();
};

(function () {
  const videoInput = document.getElementById("jsVideoFile");
  const imgInput = document.getElementById("jsThumbnailFile");
  if (videoInput && imgInput) {
    const form = document.getElementById("upload-form");
    const submit = form.querySelector("#form-submit");
    const videoInfo = document.createElement("span");
    videoInfo.style = `
    display: inline-block;
    margin-bottom: 5px;
    line-height: 1.5;
    color: red;
    font-weight: 600;
    `;
    const imgInfo = document.createElement("span");
    imgInfo.style = `
      display: inline-block;
      margin-bottom: 5px;
      line-height: 1.5;
      color: red;
      font-weight: 600;
    `;
    let videoValid = true;
    let imageValid = true;
    let isValid;

    const handleLoadedMetaData = (file) => {
      if (file.videoWidth <= file.videoHeight) {
        videoValid = false;
        form.addEventListener("submit", formListener);
        videoInfo.textContent = "You can not upload vertical video";
        submit.classList.add("prevent");
        videoInput.before(videoInfo);
      } else {
        videoValid = true;
        if (videoValid === true && imageValid === true) {
          form.removeEventListener("submit", formListener);
          submit.classList.remove("prevent");
        }
        videoInfo.remove();
      }
      isValid = submit.classList.contains("prevent");
      isValid
        ? (submit.style = "cursor: initial; background-color: #F79696;")
        : (submit.style =
            "background-color: red; color: white; font-weight: 600; font-size: 15px; cursor: pointer;");
    };

    const handleLoad = (file) => {
      if (file.naturalWidth <= file.naturalHeight) {
        imageValid = false;
        imgInfo.textContent = "You can not upload vertical image";
        form.addEventListener("submit", formListener);
        submit.classList.add("prevent");
        imgInput.before(imgInfo);
      } else {
        imageValid = true;
        if (videoValid === true && imageValid === true) {
          form.removeEventListener("submit", formListener);
          submit.classList.remove("prevent");
        }
        imgInfo.remove();
      }
      isValid = submit.classList.contains("prevent");
      isValid
        ? (submit.style = "cursor: initial; background-color: #F79696;")
        : (submit.style =
            "background-color: red; color: white; font-weight: 600; font-size: 15px; cursor: pointer;");
    };

    const validateFile = (file, isVideo) => {
      if (isVideo) {
        file.addEventListener("loadedmetadata", () =>
          handleLoadedMetaData(file, isVideo)
        );
      } else {
        file.addEventListener("load", () => handleLoad(file));
      }
    };

    const fileTypeValidate = (input) => {
      input.addEventListener("change", async (e) => {
        const {
          target: { files, name },
        } = e;
        let file;
        if (name === "videoFile") {
          file = document.createElement("video");
        } else {
          file = document.createElement("img");
        }
        const url = URL.createObjectURL(files[0]);
        file.src = url;
        validateFile(file, name === "videoFile");
      });
    };

    fileTypeValidate(videoInput);
    fileTypeValidate(imgInput);
  }
})();
