const recordContainer = document.getElementById("jsRecordContainer");
const recordPreview = document.getElementById("jsVideoPreview");
const recordBtn = document.getElementById("jsRecordBtn");

let streamObject;
let videoRecorder;

// Video녹화가 종료되면 Fake처리를 해서 다운을 받을 수 있게 함
const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "Recorded.webm";
  document.body.appendChild(link);
  link.click();
};

// Video 녹화가 종료되면 발생하는 이벤트 함수
const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getRecordVideo);
  recordBtn.innerHTML = "Start Recording";
};

// Video 녹화가 시작하면 발생하는 이벤트 함수
const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  // console.log(videoRecorder);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

// Video 녹화가 시작하면 stream객체를 반환하는 함수
// getUserMedia는 녹화가 끝나야지 stream 객체를 반환함
const getRecordVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 350, height: 175 },
      mimeType: "video/mp4",
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
