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
  // 원래는 함수를 쪼개야 하는데 챌린지 하느라 시간이 없는 관계로 급하게 하다보니...
  // 미 로그인 시 보여지는 모달 함수->
  if (!userId) {
    // 비디오를 좋아요 & 싫어요 누를 때 발생하는 이벤트 함수
    videoLikeBtn.addEventListener("click", enterModal);
    videoDislikeBtn.addEventListener("click", enterModal);
    // 댓글 입력을 하려고 할 시 발생하는 이벤트 함수
    commentInput.addEventListener("click", enterModal);
    // 모달 바깥을 클릭하면 발생하는 이벤트 함수
    modalLayout.addEventListener("click", exitModal);
    // 모달 Cancel 버튼을 클릭하면 발생하는 이벤트 함수
    modalCancleBtn.addEventListener("click", exitModal);
    // CommentList가 존재하고 댓글이 존재한다면 --> 하트와 답글 그리고 댓글 다는 것을 모달로 막음
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
