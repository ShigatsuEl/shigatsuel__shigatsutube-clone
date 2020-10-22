import axios from "axios";
import { addLikingModal } from "./notificationModal";

const videoInfo = document.getElementById("jsVideoInfo");
const videoLikeBtn = document.getElementById("jsVideoLikeBtn");
const videoDislikeBtn = document.getElementById("jsVideoDislikeBtn");

let videoId;
let userId;
let isLikeBtn;
let isSelected;
let isSwitching;

// Like Or Dislike 클릭 시 리얼타임으로 색과 숫자를 변경
const handleLikePainting = () => {
  const videoLikeCountBox = document.getElementById("jsVideoLikeCount");
  let videoLikeCount = Number(videoLikeCountBox.innerHTML);
  const videoDislikeCountBox = document.getElementById("jsVideoDislikeCount");
  let videoDislikeCount = Number(videoDislikeCountBox.innerHTML);
  // likebtn이 맞고 선택되어있는 상태라면 클릭하면 like를 삭제
  // likebtn이 맞고 선택되어있지 않은 상태에서 스위칭 상태가 맞으면 like++ dislike--
  // likebtn이 맞고 선택되지 않은 상태라면 like를 추가
  if (isLikeBtn) {
    if (isSelected) {
      //색변경
      videoLikeBtn.classList.remove("selected");
      //숫자변경
      videoLikeCount--;
      videoLikeCountBox.innerHTML = videoLikeCount;
    } else if (isSwitching) {
      //색변경
      videoLikeBtn.classList.add("selected");
      videoDislikeBtn.classList.remove("selected");
      //숫자변경
      videoLikeCount++;
      videoDislikeCount--;
      videoLikeCountBox.innerHTML = videoLikeCount;
      videoDislikeCountBox.innerHTML = videoDislikeCount;
      addLikingModal("liked");
    } else {
      //색변경
      videoLikeBtn.classList.add("selected");
      //숫자변경
      videoLikeCount++;
      videoLikeCountBox.innerHTML = videoLikeCount;
      addLikingModal("liked");
    }
    // dislikebtn이 맞고 선택되어있는 상태라면 클릭하면 dislike를 삭제
    // dislikebtn이 맞고 선택되어있지 않은 상태에서 스위칭 상태가 맞으면 dislike++ like--
    // dislikebtn이 맞고 선택되지 않은 상태라면 dislike를 추가
  } else if (isSelected) {
    //색변경
    videoDislikeBtn.classList.remove("selected");
    //숫자변경
    videoDislikeCount--;
    videoDislikeCountBox.innerHTML = videoDislikeCount;
  } else if (isSwitching) {
    //색변경
    videoLikeBtn.classList.remove("selected");
    videoDislikeBtn.classList.add("selected");
    //숫자변경
    videoLikeCount--;
    videoDislikeCount++;
    videoLikeCountBox.innerHTML = videoLikeCount;
    videoDislikeCountBox.innerHTML = videoDislikeCount;
    addLikingModal("disliked");
  } else {
    //색변경
    videoDislikeBtn.classList.add("selected");
    //숫자변경
    videoDislikeCount++;
    videoDislikeCountBox.innerHTML = videoDislikeCount;
    addLikingModal("disliked");
  }
};

// Like Or Dislike 클릭 시 발생하는 Axios
const handleLikeData = async () => {
  const response = await axios({
    method: "post",
    url: `/api/${videoId}/like-video`,
    data: {
      isLikeBtn,
      isSelected,
      isSwitching,
      userId,
    },
  });
  if (response.status === 200) {
    handleLikePainting();
  }
};

// Like Or Dislike 클릭 시 발생하는 이벤트
const clickLikingBtn = (event) => {
  const clickedBtn = event.currentTarget;
  isLikeBtn = !clickedBtn.className.includes("dislike");
  //true -> likebtn /false -> dislikebtn
  if (isLikeBtn) {
    // likebtn이 맞으면 ->
    isSelected = videoLikeBtn.className.includes("selected");
    if (!isSelected) {
      // likebtn이 맞고 선택되지 않았을 때 dislikebtn이 선택되어있는 상태라면 -> isSwitching=true
      isSwitching = !!videoDislikeBtn.className.includes("selected");
    }
  } else {
    // dislikebtn이 맞으면 ->
    isSelected = videoDislikeBtn.className.includes("selected");
    if (!isSelected) {
      // dislikebtn이 맞고 선택되지 않았을 때 likebtn이 선택되어있는 상태라면 -> isSwitching=true
      isSwitching = !!videoLikeBtn.className.includes("selected");
    }
  }
  // console.log('isLikeBtn:', isLikeBtn, 'isSelected:', isSelected, 'isSwitching:', isSwitching);
  handleLikeData();
};

function init() {
  videoId = document.getElementById("jsVideo").dataset.id;
  userId = document.getElementById("jsAddCommentForm").dataset.id;
  if (userId) {
    videoLikeBtn.addEventListener("click", clickLikingBtn);
    videoDislikeBtn.addEventListener("click", clickLikingBtn);
  }
}

if (videoInfo) {
  init();
}
