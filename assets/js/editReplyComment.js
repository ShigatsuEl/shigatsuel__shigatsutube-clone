import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const replySubinfo = document.querySelector(".reply__subinfo");
const replyText = document.querySelectorAll(".reply__text");

let replyId;
let replyContainer;
let replyBlock;
let replyContent;
let replyEditBox;
let replyEditForm;
let replyEditInput;
let replyEditCancelBtn;
let replyEditSaveBtn;

// Edit버튼을 누르고 ReplyInput(답글입력)을 Enter & Shift + Enter 입력 시 발생하는 이벤트!

const handleEnter = async (event) => {
  if (window.event.keyCode === 13) {
    if (!window.event.shiftKey) {
      event.preventDefault();
      replyId =
        event.target.parentElement.parentElement.parentElement.parentElement
          .dataset.id;
      console.log(replyId);
      replyBlock = document.getElementById(`${replyId}`);
      replyContent = replyBlock.querySelector("#jsReplyContent");
      replyEditBox = replyBlock.querySelector("#jsReplyEditBox");
      replyEditInput = replyBlock.querySelector("#jsReplyEditInput");

      const newReply = replyEditInput.innerHTML;
      const response = await axios({
        url: `/api/${replyId}/edit-reply`,
        method: "post",
        data: {
          editReply: newReply,
        },
      });
      if (response.status === 200) {
        replyContent.innerHTML = newReply;
        replyEditInput.innerHTML = newReply;
        replyContent.classList.toggle("hidden");
        replyEditBox.classList.toggle("hidden");
      }
    }
  }
};
// Edit버튼을 누르고 Save 버튼을 클릭할 때 발생하는 이벤트!

const handleSave = async (event) => {
  if (event.target.className.includes("editSaveBtn")) {
    event.preventDefault();
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.dataset.id;
    replyBlock = document.getElementById(`${replyId}`);
    replyContent = replyBlock.querySelector("#jsReplyContent");
    replyEditBox = replyBlock.querySelector("#jsReplyEditBox");
    replyEditInput = replyBlock.querySelector("#jsReplyEditInput");

    const newReply = replyEditInput.innerHTML;
    const response = await axios({
      url: `/api/${replyId}/edit-reply`,
      method: "post",
      data: {
        editReply: newReply,
      },
    });
    if (response.status === 200) {
      replyContent.innerHTML = newReply;
      replyEditInput.innerHTML = newReply;
      replyContent.classList.toggle("hidden");
      replyEditBox.classList.toggle("hidden");
    }
  }
};

// Edit버튼을 누르고 Cancel 버튼을 클릭할 때 발생하는 이벤트!

const handleCancle = (event) => {
  if (event.target.className.includes("editCancelBtn")) {
    event.preventDefault();
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.dataset.id;
    replyBlock = document.getElementById(`${replyId}`);
    replyContent = replyBlock.querySelector("#jsReplyContent");
    replyEditBox = replyBlock.querySelector("#jsReplyEditBox");
    replyEditBox.classList.toggle("hidden");
    replyContent.classList.toggle("hidden");
  }
};

const handleEdit = (event) => {
  if (event.target.className.includes("replyEditBtn")) {
    /* console.log(event.target.parentElement.parentElement.parentElement.parentElement.dataset.id); */
    //assign variables
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    replyBlock = document.getElementById(`${replyId}`);
    replyContent = replyBlock.querySelector("#jsReplyContent");
    replyEditBox = replyBlock.querySelector("#jsReplyEditBox");
    replyEditForm = replyEditBox.querySelector("#jsReplyEditForm");
    replyEditInput = replyEditBox.querySelector("#jsReplyEditInput");
    replyEditCancelBtn = replyEditBox.querySelector("#jsReplyEditCancelBtn");
    replyEditSaveBtn = replyEditBox.querySelector("#jsReplyEditSaveBtn");

    replyContent.classList.toggle("hidden");
    replyEditBox.classList.toggle("hidden");

    const reply = replyContent.innerHTML;
    replyEditInput.innerHTML = reply;
    replyEditInput.focus();

    // replyEditForm.addEventListener("submit", handleSave);
    replyEditInput.addEventListener("keydown", handleEnter);
    replyEditSaveBtn.addEventListener("click", handleSave);
    replyEditCancelBtn.addEventListener("click", handleCancle);
  }
};

function init() {
  //모든 Reply가 SHIFT ENTER를 누르면 다음칸으로 넘어가고 저장될 수 있게 함
  for (let i = 0; i < replyText.length; i++) {
    replyText[i].innerHTML = replyText[i].innerText;
  }
  commentContainer.addEventListener("click", handleEdit);
}

if (replySubinfo) {
  init();
}
