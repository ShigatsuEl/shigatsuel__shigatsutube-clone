import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");
const commentText = document.querySelectorAll(".comment__text");

let commentId;
let commentBlock;
let commentContent;
let editBox;
let commentEditForm;
let commentEditInput;
let commentEditCancelBtn;
let commentEditSaveBtn;

const handleEnter = async (event) => {
  if (window.event.keyCode === 13) {
    if (!window.event.shiftKey) {
      event.preventDefault();
      const newComment = commentEditInput.innerHTML;
      const response = await axios({
        url: `/api/${commentId}/edit-comment`,
        method: "post",
        data: {
          editComment: newComment,
        },
      });
      if (response.status === 200) {
        commentContent.innerHTML = newComment;
        commentEditInput.innerHTML = newComment;
        commentContent.classList.toggle("hidden");
        editBox.classList.toggle("hidden");
      }
    }
  }
};

const handleSave = async (event) => {
  event.preventDefault();
  const newComment = commentEditInput.innerHTML;
  const response = await axios({
    url: `/api/${commentId}/edit-comment`,
    method: "post",
    data: {
      editComment: newComment,
    },
  });
  if (response.status === 200) {
    commentContent.innerHTML = newComment;
    commentEditInput.innerHTML = newComment;
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
    const comment = commentContent.innerHTML;
    commentEditInput.innerHTML = comment;
    commentEditInput.focus();
    commentEditCancelBtn.addEventListener("click", handleCancle);
    commentEditForm.addEventListener("submit", handleSave);
    commentEditInput.addEventListener("keydown", handleEnter);
    commentEditSaveBtn.addEventListener("click", handleSave);
  }
};

function init() {
  //모든 COMMENT가 SHIFT ENTER를 누르면 다음칸으로 넘어가고 저장될 수 있게 함
  for (let i = 0; i < commentText.length; i++) {
    commentText[i].innerHTML = commentText[i].innerText;
  }
  commentContainer.addEventListener("click", handleEdit);
}

if (commentSubinfo) {
  init();
}
