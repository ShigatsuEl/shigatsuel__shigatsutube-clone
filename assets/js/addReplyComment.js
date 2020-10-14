import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let comment;
let commentId;
let replyForm;
let replyInput;
let userId;
let replyBox;
let replyCancelBtn;
let replySubmitBtn;

const sendReply = async (reply) => {
  const response = await axios({
    url: `/api/${commentId}/add-reply`,
    method: "POST",
    data: {
      reply,
    },
  });
  if (response.status === 200) {
    //
  }
};

const handleCancel = () => {
  replyInput.value = "";
  replyInput.blur();
};

const handleSubmit = (event) => {
  event.preventDefault();
  const reply = replyInput.value;
  sendReply(reply);
  replyInput.value = "";
  replyInput.blur();
};

const handleReplyHidden = () => {
  replyBox = comment.nextSibling;
  replyBox.classList.toggle("hidden");
};

const handleReplyBtn = (event) => {
  if (event.target.className.includes("replyBtn")) {
    comment =
      event.target.parentElement.parentElement.parentElement.parentElement;
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    replyForm = comment.nextSibling.childNodes[0];
    replyInput = comment.nextSibling.childNodes[0].childNodes[0];
    replyCancelBtn =
      comment.nextSibling.childNodes[0].childNodes[1].childNodes[0];
    replySubmitBtn =
      comment.nextSibling.childNodes[0].childNodes[1].childNodes[1];
    handleReplyHidden();
    replyForm.addEventListener("submit", handleSubmit);
    replyCancelBtn.addEventListener("click", handleCancel);
    replySubmitBtn.addEventListener("click", handleSubmit);
  }
};

function init() {
  commentContainer.addEventListener("click", handleReplyBtn);
}

if (commentSubinfo) {
  init();
}
