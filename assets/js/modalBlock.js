const modalBlock = document.getElementById("jsModalBlock");
const videoLikeBtn = document.getElementById("jsVideoLikeBtn");
const videoDislikeBtn = document.getElementById("jsVideoDislikeBtn");
const commentInput = document.getElementById("jsAddCommentInput");
const modalLayout = document.getElementById("jsModalLayout");
const modalCancleBtn = document.getElementById("jsModalCancelBtn");
const commentList = document.getElementById("jsCommentList");

let likeCommentBtns;
let replyCommentBtns;

const exitModal = () => {
  modalBlock.classList.add("hidden");
};
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
  }
}

if (modalBlock) {
  init();
}
