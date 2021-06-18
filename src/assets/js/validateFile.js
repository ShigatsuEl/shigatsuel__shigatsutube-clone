/* eslint-disable func-names */
const formListener = (e) => {
  e.preventDefault();
};

(function () {
  const videoInput = document.getElementById("file");
  const form = document.getElementById("upload-form");
  const submit = form.querySelector("#form-submit");
  const info = document.createElement("span");
  info.textContent = "You can not upload vertical video";
  info.style = `
    display: inline-block;
    margin-bottom: 5px;
    line-height: 1.5;
    color: red;
    font-weight: 600;
  `;
  if (videoInput) {
    videoInput.addEventListener("change", async (e) => {
      const {
        target: { files },
      } = e;
      const url = URL.createObjectURL(files[0]);
      const video = document.createElement("video");
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        if (video.videoWidth <= video.videoHeight) {
          form.addEventListener("submit", formListener);
          submit.classList.add("prevent");
          videoInput.before(info);
        } else {
          form.removeEventListener("submit", formListener);
          submit.classList.remove("prevent");
          info.remove();
        }
        const isValid = submit.classList.contains("prevent");
        if (isValid) {
          submit.style = `
      cursor: initial;
      background-color: #F79696;
    `;
        } else {
          submit.style = `
      background-color: red;
      color: white;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
    `;
        }
      });
    });
  }
})();
