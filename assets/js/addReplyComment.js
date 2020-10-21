import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let comment;
let commentId;
let userId;
let replyBox;
let replyForm;
let replyInput;
let replyCancelBtn;
let replySubmitBtn;
let replyList;

const addReplyComment = (parsedInfo) => {
  // ReplyBlock Element
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

  // Reply Info
  const info = document.createElement("div");
  info.classList.add("reply__info");
  right.append(info);

  // Reply Writer & createdAt
  const address = document.createElement("a");
  address.classList.add("reply__writer");
  address.href = `/users/${parsedInfo.href}`;
  const writerName = document.createElement("span");
  writerName.classList.add("reply__writer-name");
  writerName.textContent = parsedInfo.name;
  const createdAt = document.createElement("span");
  createdAt.classList.add("reply__createdAt");
  createdAt.textContent = parsedInfo.date;
  address.append(writerName);
  info.append(address);
  info.append(createdAt);

  // Reply Content
  const content = document.createElement("div");
  content.classList.add("reply__content");
  content.id = "jsReplyContent";
  const text = document.createElement("div");
  text.classList.add("reply__text");
  text.textContent = parsedInfo.reply;
  content.append(text);
  right.append(content);

  // Reply Edit Box(hidden)
  const editBox = document.createElement("div");
  editBox.classList.add("reply__editBox", "hidden");
  editBox.id = "jsReplyEditBox";
  editBox.dataset.id = parsedInfo.replyId;
  right.append(editBox);

  const editForm = document.createElement("form");
  editForm.classList.add("reply__editForm");
  editForm.id = "jsReplyEditForm";
  editBox.append(editForm);

  const editInput = document.createElement("div");
  editInput.classList.add("reply__editInput");
  editInput.id = "jsReplyEditInput";
  editInput.contentEditable = true;
  editInput.setAttribute("name", "editReply");
  editInput.setAttribute("placeholder", "Edit your reply");
  editInput.setAttribute("autocomplete", "off");
  editInput.setAttribute("required", "true");
  editInput.textContent = parsedInfo.reply;
  editForm.append(editInput);

  const editBtnBox = document.createElement("div");
  editBtnBox.classList.add("editBtnBox");
  editForm.append(editBtnBox);

  const editCancelBtn = document.createElement("button");
  editCancelBtn.classList.add("reply__editCancelBtn", "replyCancelBtn");
  editCancelBtn.id = "jsReplyEditCancelBtn";
  editCancelBtn.textContent = "CANCEL";
  editBtnBox.append(editCancelBtn);

  const editSaveBtn = document.createElement("button");
  editSaveBtn.classList.add("reply__editSaveBtn", "replySaveBtn");
  editSaveBtn.id = "jsReplyEditSaveBtn";
  editSaveBtn.textContent = "SAVE";
  editBtnBox.append(editSaveBtn);

  // Subinfo
  // Subinfo Heart
  const subInfo = document.createElement("div");
  subInfo.classList.add("reply__subinfo");
  subInfo.id = "jsReplySubinfo";
  right.append(subInfo);

  const replyHeart = document.createElement("span");
  replyHeart.classList.add("reply__heart");
  subInfo.append(replyHeart);

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fas", "fa-heart", "replyHeartBtn");
  replyHeart.append(heartIcon);

  const heartNumber = document.createElement("span");
  heartNumber.classList.add("reply__heart-number");
  heartNumber.id = "jsReplyHeartNumber";
  heartNumber.textContent = parsedInfo.replyHeart;
  replyHeart.append(heartNumber);

  // Subinfo Reply Edit
  const replyEdit = document.createElement("span");
  replyEdit.classList.add("reply__editBtn");
  replyEdit.id = "jsReplyEdit";
  subInfo.append(replyEdit);

  const replyEditBtn = document.createElement("i");
  replyEditBtn.classList.add("far", "fa-edit", "replyEditBtn");
  replyEdit.append(replyEditBtn);

  // Subinfo Reply Delete
  const replyDelete = document.createElement("span");
  replyDelete.classList.add("reply__deleteBtn");
  replyDelete.id = "jsReplyDelete";
  subInfo.append(replyDelete);

  const replyDeleteBtn = document.createElement("i");
  replyDeleteBtn.classList.add("far", "fa-trash-alt", "replyDeleteBtn");
  replyDelete.append(replyDeleteBtn);
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
    addNotificationModal("Successfully", "added", "reply");
  } else {
    addNotificationModal("Failed to", "added", "reply");
  }
};

const handleReplyHidden = () => {
  replyBox = comment.nextSibling;
  replyBox.classList.toggle("hidden");
};

const handleSubmit = (event) => {
  if (event.target.className.includes("replySaveBtn")) {
    comment =
      event.target.parentElement.parentElement.parentElement.previousSibling;
    commentId =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .dataset.id;
    replyInput = comment.nextSibling.childNodes[0].childNodes[0];
  } else if (event.target.className.includes("replyForm")) {
    comment = event.target.parentElement.previousSibling;
    commentId = event.target.parentElement.previousSibling.dataset.id;
    replyInput = comment.nextSibling.childNodes[0].childNodes[0];
  }
  event.preventDefault();
  const reply = replyInput.value;
  sendReply(reply);
  replyInput.value = "";
  replyInput.blur();
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
    userId = document.getElementById("jsAddCommentForm").dataset.id;
    // 로그인 되어있을 시 ->
    if (userId) {
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
  }
};

function init() {
  commentContainer.addEventListener("click", handleReplyBtn);
}

if (commentSubinfo) {
  init();
}
