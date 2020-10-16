import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let comment;
let commentId;
let replyForm;
let replyInput;
let replyBox;
let replyCancelBtn;
let replySubmitBtn;
let replyList;

const addReplyComment = (parsedInfo) => {
  // CommentBlock Element
  const replyBlock = document.createElement("li");
  replyBlock.classList.add("reply__block-owner");
  replyBlock.id = parsedInfo.replyId;
  replyBlock.dataset.id = parsedInfo.replyId;
  replyList.prepend(replyBlock);

  // Left Element
  const left = document.createElement("div");
  left.classList.add("reply__left");
  const img = document.createElement("img");
  img.classList.add("reply__publish-avatar");
  img.src = parsedInfo.avatarUrl;
  left.append(img);
  replyBlock.append(left);

  // Right Element
  const right = document.createElement("div");
  right.classList.add("reply__right");
  replyBlock.append(right);
};

const sendReply = async (reply) => {
  const response = await axios({
    url: `/api/${commentId}/add-reply`,
    method: "POST",
    data: {
      reply,
    },
  });
  if (response.status === 200) {
    addReplyComment(response.data);
  }
};

const handleReplyHidden = () => {
  replyBox = comment.nextSibling;
  replyBox.classList.toggle("hidden");
};

const handleSubmit = (event) => {
  if (event.target.className.includes("replySaveBtn")) {
    event.preventDefault();
    comment =
      event.target.parentElement.parentElement.parentElement.previousSibling;
    commentId =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .dataset.id;
    replyInput = comment.nextSibling.childNodes[0].childNodes[0];

    event.preventDefault();
    const reply = replyInput.value;
    sendReply(reply);
    replyInput.value = "";
    replyInput.blur();
  }
};

const handleCancel = (event) => {
  if (event.target.className.includes("replyCancelBtn")) {
    event.preventDefault();
    comment =
      event.target.parentElement.parentElement.parentElement.previousSibling;
    commentId =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .dataset.id;
    replyInput = comment.nextSibling.childNodes[0].childNodes[0];

    replyInput.value = "";
    replyInput.blur();
    handleReplyHidden();
  }
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
    replyList = comment.nextSibling.nextSibling.childNodes[0];
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
