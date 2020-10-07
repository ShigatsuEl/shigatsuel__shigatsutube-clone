import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let commentId;
let heartIcon;
let isSelected;
let commentBlock;

const handleHeartCount = () => {};

const handleHeartSelected = (heartIcon) => {
  heartIcon.classList.toggle("selected");
};

const handleHeartData = async (commentId) => {
  const response = await axios({
    method: "post",
    url: `/api/${commentId}/heart-Comment`,
    data: {
      isSelected,
    },
  });
  if (response.status === 200) {
    handleHeartSelected(heartIcon);
    handleHeartCount();
  }
};

const handleHeartBtn = (event) => {
  if (event.target.className.includes("heartBtn")) {
    heartIcon = event.target;
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement;
    commentBlock = document.getElementById(`${commentId}`);
    handleHeartData(commentId);
    if (event.target.className.includes("selected")) {
      isSelected = true;
      console.log(isSelected);
    } else {
      isSelected = false;
      console.log(isSelected);
    }
  }
};

function init() {
  commentContainer.addEventListener("click", handleHeartBtn);
}

if (commentSubinfo) {
  init();
}
