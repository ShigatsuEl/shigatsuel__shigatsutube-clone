const recordContainer = document.getElementById("jsRecordContainer");
const recordPreview = document.getElementById("jsVideoPreview");
const recordBtn = document.getElementById("jsRecordBtn");

let streamObject;

const handleVideoData = (event) => {
  console.log(event);
};

const startRecording = () => {
  const videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
};

const getRecordVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 350, height: 175 },
    });
    recordPreview.srcObject = stream;
    recordPreview.muted = true;
    recordPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "Can't Access Recording";
  } finally {
    recordBtn.removeEventListener("click", getRecordVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getRecordVideo);
}

if (recordContainer) {
  init();
}
