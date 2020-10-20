const modalBlock = document.getElementById("jsModalBlock");
const videoLikeBtn = document.getElementById("jsVideoLikeBtn");
const videoDislikeBtn = document.getElementById("jsVideoDislikeBtn");
const commentInput = document.getElementById("jsAddCommentInput");
const modalLayout = document.getElementById("jsModalLayout");
const modalCancleBtn = document.getElementById("jsModalCancelBtn");
const commentList = document.getElementById("jsCommentList");

let heartCommentBtns;
let addReplyBtns;
let replyHeartBtns;

// Exit Modal
const exitModal = () => {
  modalBlock.classList.add("hidden");
};

// Enter Modal
const enterModal = () => {
  modalBlock.classList.remove("hidden");
};

function init() {
  const userId = document.getElementById("jsAddCommentForm").dataset.id;
  if (!userId) {
    videoLikeBtn.addEventListener("click", enterModal);
    videoDislikeBtn.addEventListener("click", enterModal);
    commentInput.addEventListener("click", enterModal);
    modalLayout.addEventListener("click", exitModal);
    modalCancleBtn.addEventListener("click", exitModal);
    if (commentList && commentList.childElementCount !== 0) {
      heartCommentBtns = document.querySelectorAll(".heartBtn");
      addReplyBtns = document.querySelectorAll(".replyBtn");
      replyHeartBtns = document.querySelectorAll(".replyHeartBtn");
      heartCommentBtns.forEach((ele) =>
        ele.addEventListener("click", enterModal)
      );
      addReplyBtns.forEach((ele) => {
        ele.addEventListener("click", enterModal);
      });
      replyHeartBtns.forEach((ele) =>
        ele.addEventListener("click", enterModal)
      );
    }
  }
}

if (modalBlock) {
  init();
}
