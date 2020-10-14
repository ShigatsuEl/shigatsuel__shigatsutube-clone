import axios from "axios";

const replyContainer = document.getElementById("jsReplyContainer");
const replySubinfo = document.querySelector(".reply__subinfo");
const replyText = document.querySelectorAll(".reply__text");

let replyId;
let replyBlock;
let replyContent;
let replyEditBox;
let replyEditForm;
let replyEditInput;
let replyEditCancelBtn;
let replyEditSaveBtn;

const handleSave = async (event) => {
  event.preventDefault();
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
};

const handleCancle = (event) => {
  event.preventDefault();
  replyContent.classList.toggle("hidden");
  replyEditBox.classList.toggle("hidden");
};

const handleEdit = (event) => {
  /* console.log(event.target.parentElement.parentElement.parentElement.parentElement.dataset.id); */

  if (event.target.className.includes("editReplyBtn")) {
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
    replyEditCancelBtn.addEventListener("click", handleCancle);
    replyEditForm.addEventListener("submit", handleSave);
    // replyEditInput.addEventListener("keydown", handleEnter);
    replyEditSaveBtn.addEventListener("click", handleSave);
  }
};

function init() {
  //모든 Reply가 SHIFT ENTER를 누르면 다음칸으로 넘어가고 저장될 수 있게 함
  for (let i = 0; i < replyText.length; i++) {
    replyText[i].innerHTML = replyText[i].innerText;
  }
  replyContainer.addEventListener("click", handleEdit);
}

if (replySubinfo) {
  init();
}
