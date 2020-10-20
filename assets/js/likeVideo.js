import axios from "axios";

const videoInfo = document.getElementById("jsVideoInfo");
const videoLikeBtn = document.getElementById("jsVideoLikeBtn");
const videoDislikeBtn = document.getElementById("jsVideoDislikeBtn");

let videoId;
let userId;
let isLikeBtn;
let isSelected;
let isSwitching;

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
    console.log("great!");
    // handleHeartSelected(heartIcon);
    // handleHeartNumber();
  }
};

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
