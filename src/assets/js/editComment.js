import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");
const commentText = document.querySelectorAll(".comment__text");

let commentId;
let commentBlock;
let commentContent;
let commentEditBox;
let commentEditForm;
let commentEditInput;
let commentEditCancelBtn;
let commentEditSaveBtn;

// Comment Edit버튼을 누르고 Comment Edit Form을 제출할 때 발생하는 이벤트!
const handleEnter = async (event) => {
  // Enter + Shift가 아닌 Enter를 누르면 발생하는 조건문
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
      // Edit Comment Form이 제출되면 백엔드에 데이터를 요청하는 AXIOS(AJAX) 함수
      const newComment = commentEditInput.innerHTML;
      const response = await axios({
        url: `/api/${commentId}/edit-comment`,
        method: "post",
        data: {
          editComment: newComment,
        },
      });
      // 클라이언트가 서버에 요청을 하고 요청이 정상적으로 승인된 후 브라우저에 응답이 정상적으로 이루어질 경우 발생하는 조건문
      if (response.status === 200) {
        commentContent.innerHTML = newComment;
        commentEditInput.innerHTML = newComment;
        commentContent.classList.toggle("hidden");
        commentEditBox.classList.toggle("hidden");
        addNotificationModal("Successfully", "fixed", "comment");
        // 클라이언트가 서버에 요청을 했으나 요청이 정상적으로 이루어지지 않아 브라우저에 에러를 보낼 때 발생하는 조건문
      } else {
        addNotificationModal("Failed to", "fixed", "comment");
      }
    }
  }
};

// Comment Edit버튼을 누르고 Save 버튼을 클릭할 때 발생하는 이벤트!
// 버튼에 Id를 달지 않았기 때문에 Edit Comment Save Btn을 클릭 시 어떤 Cooment인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
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
      addNotificationModal("Successfully", "fixed", "comment");
    } else {
      addNotificationModal("Failed to", "fixed", "comment");
    }
  }
};

// Comment Edit 버튼을 누르고 Cancel 버튼을 클릭할 때 발생하는 이벤트!
// 버튼에 Id를 달지 않았기 때문에 Edit Comment Cancel Btn을 클릭할 시 어떤 Comment인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
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

// Comment Edit Btn을 클릭할 시 발생하는 이벤트 함수
const handleEdit = (event) => {
  /* console.log(event.target.parentElement.parentElement.parentElement.parentElement.dataset.id); */
  // Comment Edit Btn을 누르면 어느 Comment Block인지 확인해줘야 함
  // 만약에 이렇게 하려는 분이 있다면 추천할 만한 방법이 아님
  // 차라리 버튼에 Id를 때려박는게 더 좋은 방법이라고 생각함!
  // 왜 그런지는 위의 함수에서 설명하겠음
  if (event.target.className.includes("editBtn")) {
    //Assign Variables
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

    //Comment Edit Btn을 누를 때마다 댓글창과 댓글입력창이 번갈아가며 보이게 설정함
    commentContent.classList.toggle("hidden");
    commentEditBox.classList.toggle("hidden");
    const comment = commentContent.innerHTML;
    //InnerHtml으로 설정하지 않으면 Shift Enter를 누를 때 다음줄로 넘어가지 않음!(주의)
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

if (commentContainer) {
  init();
}
