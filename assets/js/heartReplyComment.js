const commentContainer = document.getElementById("jsCommentContainer");
const replySubinfo = document.querySelector(".reply__subinfo");

let replyId;
let userId;
let replyHeartIcon;
let isSelected;
let replyBlock;

const handleHeartBtn = (event) => {
  if (event.target.className.includes("replyHeartBtn")) {
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.user;
    heartIcon = event.target;
    replyBlock = document.getElementById(`${replyId}`);
    if (event.target.className.includes("selected")) {
      isSelected = true;
      //   console.log(isSelected);
    } else {
      isSelected = false;
      //   console.log(isSelected);
    }
    handleHeartData(commentId);
  }
};

function init() {
  commentContainer.addEventListener("click", handleHeartBtn);
}

if (replySubinfo) {
  init();
}
