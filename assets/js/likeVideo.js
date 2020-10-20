import axios from "axios";

const videoContainer = document.getElementById("jsVideoContainer");
const videoInfo = document.getElementById("jsVideoInfo");

let videoId;
let userId;
let likeIcon;
let isSelected;

const handleLikeData = async (videoId, userId, isSelected) => {
  const response = await axios({
    method: "post",
    url: `/api/${videoId}/like-video`,
    data: {
      userId,
      isSelected,
    },
  });
  if (response.status === 200) {
    console.log("great!");
    // handleHeartSelected(heartIcon);
    // handleHeartNumber();
  }
};

const handleLikeBtn = (event) => {
  if (event.target.className.includes("likeBtn")) {
    videoId = document.getElementById("jsVideo").dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.id;
    likeIcon = event.target;
    // console.log(videoId, userId);
    if (event.target.className.includes("selected")) {
      isSelected = true;
      //   console.log(isSelected);
    } else {
      isSelected = false;
      console.log(isSelected);
    }
    handleLikeData(videoId, userId);
  }
};

function init() {
  videoContainer.addEventListener("click", handleLikeBtn);
}

if (videoInfo) {
  init();
}
