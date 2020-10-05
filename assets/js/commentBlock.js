const CommentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

const handleEdit = (event) => {
  /* console.log(
    event.target.parentElement.parentElement.parentElement.parentElement.dataset
      .id
  ); */
  const commentId =
    event.target.parentElement.parentElement.parentElement.parentElement.dataset
      .id;
  const commentBlock = document.getElementById(`${commentId}`);
  const commentContent = commentBlock.querySelector("#jsCommentContent");
  const editBox = commentBlock.querySelector("#jsCommentEditBox");
  const commentEditForm = editBox.querySelector("#jsCommentEditForm");
  const commentEditInput = editBox.querySelector("#jsCommentEditInput");
  const commentEditCancelBtn = editBox.querySelector("#jsCommentEditCancelBtn");
  const commentEditSaveBtn = editBox.querySelector("#jsCommentEditSaveBtn");
  if (event.target.className.includes("editBtn")) {
    commentContent.classList.toggle("hidden");
    editBox.classList.toggle("hidden");
    const comment = commentEditInput.textContent;
    commentEditInput.value = comment;
    commentEditInput.focus();
  }
};

function init() {
  CommentContainer.addEventListener("click", handleEdit);
}

if (commentSubinfo) {
  init();
}
