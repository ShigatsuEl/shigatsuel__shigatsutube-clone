import axios from "axios";

const CommentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let commentId;
let commentBlock;
let commentContent;
let editBox;
let commentEditForm;
let commentEditInput;
let commentEditCancelBtn;
let commentEditSaveBtn;

const handleSave = async (event) => {
  event.preventDefault();
  const newComment = commentEditInput.value;
  const response = await axios({
    url: `/api/${commentId}/edit-comment`,
    method: "post",
    data: {
      editComment: newComment,
    },
  });
  if (response.status === 200) {
    commentContent.textContent = newComment;
    commentEditInput.textContent = newComment;
    commentContent.classList.toggle("hidden");
    editBox.classList.toggle("hidden");
  }
};

const handleCancle = (event) => {
  event.preventDefault();
  commentContent.classList.toggle("hidden");
  editBox.classList.toggle("hidden");
};

const handleEdit = (event) => {
  /* console.log(event.target.parentElement.parentElement.parentElement.parentElement.dataset.id); */

  if (event.target.className.includes("editBtn")) {
    //assign variables
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    commentBlock = document.getElementById(`${commentId}`);
    commentContent = commentBlock.querySelector("#jsCommentContent");
    editBox = commentBlock.querySelector("#jsCommentEditBox");
    commentEditForm = editBox.querySelector("#jsCommentEditForm");
    commentEditInput = editBox.querySelector("#jsCommentEditInput");
    commentEditCancelBtn = editBox.querySelector("#jsCommentEditCancelBtn");
    commentEditSaveBtn = editBox.querySelector("#jsCommentEditSaveBtn");

    commentContent.classList.toggle("hidden");
    editBox.classList.toggle("hidden");
    const comment = commentEditInput.textContent;
    commentEditInput.value = comment;
    commentEditInput.focus();
    commentEditCancelBtn.addEventListener("click", handleCancle);
    commentEditForm.addEventListener("submit", handleSave);
    commentEditSaveBtn.addEventListener("click", handleSave);
  }
};

function init() {
  CommentContainer.addEventListener("click", handleEdit);
}

if (commentSubinfo) {
  init();
}
