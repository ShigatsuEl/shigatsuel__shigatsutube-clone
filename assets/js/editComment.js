import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");
const commentText = document.querySelectorAll(".comment__text");

let commentId;
let commentBlock;
let commentContent;
let commentEditBox;
let commentEditForm;
let commentEditInput;
let commentEditCancelBtn;
let commentEditSaveBtn;

// Comment Edit버튼을 누르고 ReplyInput(답글입력)을 Enter & Shift + Enter 입력 시 발생하는 이벤트!

const handleEnter = async (event) => {
  if (window.event.keyCode === 13) {
    if (!window.event.shiftKey) {
      event.preventDefault();
      commentId =
        event.target.parentElement.parentElement.parentElement.parentElement
          .dataset.id;
      commentBlock = document.getElementById(`${commentId}`);
      commentContent = commentBlock.querySelector("#jsCommentContent");
      commentEditBox = commentBlock.querySelector("#jsCommentEditBox");
      commentEditInput = commentEditBox.querySelector("#jsCommentEditInput");

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
        commentEditBox.classList.toggle("hidden");
      }
    }
  }
};

// Comment Edit버튼을 누르고 Save 버튼을 클릭할 때 발생하는 이벤트!

const handleSave = async (event) => {
  if (event.target.className.includes("commentSaveBtn")) {
    event.preventDefault();
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.dataset.id;
    commentBlock = document.getElementById(`${commentId}`);
    commentContent = commentBlock.querySelector("#jsCommentContent");
    commentEditBox = commentBlock.querySelector("#jsCommentEditBox");

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
      commentEditBox.classList.toggle("hidden");
    }
  }
};

// Comment Edit 버튼을 누르고 Cancel 버튼을 클릭할 때 발생하는 이벤트!

const handleCancle = (event) => {
  if (event.target.className.includes("commentCancelBtn")) {
    event.preventDefault();
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.dataset.id;
    commentBlock = document.getElementById(`${commentId}`);
    commentContent = commentBlock.querySelector("#jsCommentContent");
    commentEditBox = commentBlock.querySelector("#jsCommentEditBox");
    commentContent.classList.toggle("hidden");
    commentEditBox.classList.toggle("hidden");
  }
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
    commentEditBox = commentBlock.querySelector("#jsCommentEditBox");
    commentEditForm = commentEditBox.querySelector("#jsCommentEditForm");
    commentEditInput = commentEditBox.querySelector("#jsCommentEditInput");
    commentEditCancelBtn = commentEditBox.querySelector(
      "#jsCommentEditCancelBtn"
    );
    commentEditSaveBtn = commentEditBox.querySelector("#jsCommentEditSaveBtn");

    commentContent.classList.toggle("hidden");
    commentEditBox.classList.toggle("hidden");
    const comment = commentContent.innerHTML;
    commentEditInput.innerHTML = comment;
    commentEditInput.focus();
    commentEditCancelBtn.addEventListener("click", handleCancle);
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
