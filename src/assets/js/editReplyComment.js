import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");
const replyText = document.querySelectorAll(".reply__text");

let replyId;
let replyBlock;
let replyContent;
let replyEditBox;
let replyEditInput;
let replyEditCancelBtn;
let replyEditSaveBtn;

// Reply Edit버튼을 누르고 Reply Edit Form을 제출할 때 발생하는 이벤트!
const handleEnter = async (event) => {
  // Enter + Shift가 아닌 Enter를 누르면 발생하는 조건문
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
      // Edit Reply Form이 제출되면 백엔드에 데이터를 요청하는 AXIOS(AJAX) 함수
      const newReply = replyEditInput.innerHTML;
      const response = await axios({
        url: `/api/${replyId}/edit-reply`,
        method: "post",
        data: {
          editReply: newReply,
        },
      });
      // 클라이언트가 서버에 요청을 하고 요청이 정상적으로 승인된 후 브라우저에 응답이 정상적으로 이루어질 경우 발생하는 조건문
      if (response.status === 200) {
        replyContent.innerHTML = newReply;
        replyEditInput.innerHTML = newReply;
        replyContent.classList.toggle("hidden");
        replyEditBox.classList.toggle("hidden");
        addNotificationModal("Successfully", "fixed", "reply");
        // 클라이언트가 서버에 요청을 했으나 요청이 정상적으로 이루어지지 않아 브라우저에 에러를 보낼 때 발생하는 조건문
      } else {
        addNotificationModal("Failed to", "fixed", "reply");
      }
    }
  }
};

// Reply Edit버튼을 누르고 Save 버튼을 클릭할 때 발생하는 이벤트!
// 버튼에 Id를 달지 않았기 때문에 Edit Comment Save Btn을 클릭 시 어떤 Cooment인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
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
      addNotificationModal("Successfully", "fixed", "reply");
    } else {
      addNotificationModal("Failed to", "fixed", "reply");
    }
  }
};

// Reply Edit버튼을 누르고 Cancel 버튼을 클릭할 때 발생하는 이벤트!
// 버튼에 Id를 달지 않았기 때문에 Edit Reply Cancel Btn을 클릭할 시 어떤 Reply인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
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

//
const handleEdit = (event) => {
  if (event.target.className.includes("replyEditBtn")) {
    // console.log(event.target.parentElement.parentElement.parentElement.parentElement.dataset.id);
    // Reply Edit Btn을 누르면 어느 Reply Block인지 확인해줘야 함
    // 만약에 이렇게 하려는 분이 있다면 추천할 만한 방법이 아님
    // 차라리 버튼에 Id를 때려박는게 더 좋은 방법이라고 생각함!
    // 왜 그런지는 위의 함수에서 설명하겠음
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    replyBlock = document.getElementById(`${replyId}`);
    replyContent = replyBlock.querySelector("#jsReplyContent");
    replyEditBox = replyBlock.querySelector("#jsReplyEditBox");
    replyEditInput = replyEditBox.querySelector("#jsReplyEditInput");
    replyEditCancelBtn = replyEditBox.querySelector("#jsReplyEditCancelBtn");
    replyEditSaveBtn = replyEditBox.querySelector("#jsReplyEditSaveBtn");

    //Reply Edit Btn을 누를 때마다 댓글창과 댓글입력창이 번갈아가며 보이게 설정함
    replyContent.classList.toggle("hidden");
    replyEditBox.classList.toggle("hidden");

    const reply = replyContent.innerHTML;
    replyEditInput.innerHTML = reply;
    replyEditInput.focus();

    replyEditCancelBtn.addEventListener("click", handleCancle);
    replyEditSaveBtn.addEventListener("click", handleSave);
    replyEditInput.addEventListener("keydown", handleEnter);
  }
};

function init() {
  //모든 Reply가 SHIFT ENTER를 누르면 다음칸으로 넘어가고 저장될 수 있게 함
  for (let i = 0; i < replyText.length; i++) {
    replyText[i].innerHTML = replyText[i].innerText;
  }
  commentContainer.addEventListener("click", handleEdit);
}

if (commentContainer) {
  init();
}
