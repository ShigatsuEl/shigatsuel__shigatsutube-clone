import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const replySubinfo = document.querySelector(".reply__subinfo");

let replyId;
let userId;
let replyHeartIcon;
let isSelected;
let replyBlock;

const handleHeartData = async (replyId) => {
  const response = await axios({
    method: "post",
    url: `/api/${replyId}/heart-reply`,
    data: {
      userId,
      isSelected,
    },
  });
  if (response.status === 200) {
    //handleHeartSelected(heartIcon);
    //handleHeartNumber();
  }
};

const handleHeartBtn = (event) => {
  if (event.target.className.includes("replyHeartBtn")) {
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.user;
    replyHeartIcon = event.target;
    replyBlock = document.getElementById(`${replyId}`);
    if (event.target.className.includes("selected")) {
      isSelected = true;
      //   console.log(isSelected);
    } else {
      isSelected = false;
      //   console.log(isSelected);
    }
    handleHeartData(replyId);
  }
};

function init() {
  commentContainer.addEventListener("click", handleHeartBtn);
}

if (replySubinfo) {
  init();
}
