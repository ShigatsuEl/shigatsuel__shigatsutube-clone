const commentContainer = document.getElementById("jsCommentContainer");
const replySubinfo = document.querySelector(".reply__subinfo");

let replyId;

const handleDelteBtn = (event) => {
  //console.log(event.target.parentElement.parentElement.parentElement.parentElement);
  if (event.target.className.includes("replyDeleteBtn")) {
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    handleDeleteData(replyId);
  }
};

function init() {
  commentContainer.addEventListener("click", handleDelteBtn);
}

if (replySubinfo) {
  init();
}
