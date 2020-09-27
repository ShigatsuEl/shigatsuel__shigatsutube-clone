const recordContainer = document.getElementById("jsRecordContainer");
const recordPreview = document.getElementById("jsVideoPreview");
const recordBtn = document.getElementById("jsRecordBtn");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 350, height: 175 },
    });
    recordPreview.srcObject = stream;
    recordPreview.muted = true;
    recordPreview.play();
  } catch (error) {
    recordBtn.innerHTML = "Can't Access Recording";
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recordContainer) {
  init();
}
