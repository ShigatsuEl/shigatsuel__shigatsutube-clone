import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let commentId;
let userId;
let heartIcon;
let isSelected;
let commentBlock;

const handleHeartNumber = () => {
  if (commentBlock) {
    let heartNumber = commentBlock.querySelector("#jsHeartNumber").textContent;
    isSelected ? heartNumber-- : heartNumber++;
    commentBlock.querySelector("#jsHeartNumber").textContent = heartNumber;
  }
};

const handleHeartSelected = (heartIcon) => {
  heartIcon.classList.toggle("selected");
};

const handleHeartData = async (commentId) => {
  const response = await axios({
    method: "post",
    url: `/api/${commentId}/heart-comment`,
    data: {
      userId,
      isSelected,
    },
  });
  if (response.status === 200) {
    handleHeartSelected(heartIcon);
    handleHeartNumber();
  }
};

const handleHeartBtn = (event) => {
  if (event.target.className.includes("heartBtn")) {
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.id;
    heartIcon = event.target;
    commentBlock = document.getElementById(`${commentId}`);
    if (event.target.className.includes("selected")) {
      isSelected = true;
      //   console.log(isSelected);
    } else {
      isSelected = false;
      //   console.log(isSelected);
    }
    // 로그인 되어있을 시 ->
    if (userId) {
      handleHeartData(commentId);
    }
  }
};

function init() {
  commentContainer.addEventListener("click", handleHeartBtn);
}

if (commentSubinfo) {
  init();
}
