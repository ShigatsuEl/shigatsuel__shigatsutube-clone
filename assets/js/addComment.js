import axios from "axios";

const addCommentForm = document.getElementById("jsAddCommentForm");
const addCommentInput = document.getElementById("jsAddCommentInput");
const buttonBox = document.getElementById("jsBtnBox");
const cancelBtn = document.getElementById("jsCancelBtn");
const commentBtn = document.getElementById("jsCommentBtn");
const commentList = document.getElementById("jsCommentList");

const increaseNumber = () => {
  const commentNumber = document.getElementById("jsCommentNumber");
  const commentLiteral = document.getElementById("jsLiteralComment");
  commentNumber.textContent = parseInt(commentNumber.textContent, 10) + 1;
  if (commentNumber.textContent <= 0) {
    commentNumber.textContent = "0";
    commentLiteral.textContent = " Comments";
  } else if (commentNumber.textContent === "1") {
    commentLiteral.textContent = " Comment";
  } else {
    commentLiteral.textContent = " Comments";
  }
};

const addCommentBlock = (parsedInfo) => {
  // CommentBlock Element
  const commentBlock = document.createElement("li");
  commentBlock.classList.add("comment__block");
  commentBlock.id = parsedInfo.commentId;
  commentBlock.dataset.id = parsedInfo.commentId;
  commentList.prepend(commentBlock);

  // Left Element
  const left = document.createElement("div");
  left.classList.add("comment__left");
  const img = document.createElement("img");
  img.classList.add("comment__publish-avatar");
  img.src = parsedInfo.avatarUrl;
  left.append(img);
  commentBlock.append(left);

  // Right Element
  const right = document.createElement("div");
  right.classList.add("comment__right");
  commentBlock.append(right);

  // Comment Info
  const info = document.createElement("div");
  info.classList.add("comment__info");
  right.append(info);

  // Comment Writer & createdAt
  const address = document.createElement("a");
  address.classList.add("comment__writer");
  address.href = `/users/${parsedInfo.href}`;
  const writerName = document.createElement("span");
  writerName.classList.add("comment__writer-name");
  writerName.textContent = parsedInfo.name;
  const createdAt = document.createElement("span");
  createdAt.classList.add("comment__createdAt");
  createdAt.textContent = parsedInfo.date;
  address.append(writerName);
  info.append(address);
  info.append(createdAt);

  // Comment Content
  const content = document.createElement("div");
  content.classList.add("comment__content");
  content.id = "jsCommentContent";
  const text = document.createElement("div");
  text.classList.add("comment__text");
  text.textContent = parsedInfo.comment;
  content.append(text);
  right.append(content);

  // Comment Edit Box(hidden)
  const editBox = document.createElement("div");
  editBox.classList.add("comment__editBox", "hidden");
  editBox.id = "jsCommentEditBox";
  editBox.dataset.id = parsedInfo.commentId;
  right.append(editBox);

  const editForm = document.createElement("form");
  editForm.classList.add("comment__editForm");
  editForm.id = "jsCommentEditForm";
  editBox.append(editForm);

  const editInput = document.createElement("div");
  editInput.classList.add("comment__editInput");
  editInput.id = "jsCommentEditInput";
  editInput.contentEditable = true;
  editInput.setAttribute("name", "editComment");
  editInput.setAttribute("placeholder", "Edit your comment");
  editInput.setAttribute("autocomplete", "off");
  editInput.setAttribute("required", "true");
  editInput.textContent = parsedInfo.comment;
  editForm.append(editInput);

  const editBtnBox = document.createElement("div");
  editBtnBox.classList.add("editBtnBox");
  editForm.append(editBtnBox);

  const editCancelBtn = document.createElement("button");
  editCancelBtn.classList.add("comment__editCancelBtn", "commentCancelBtn");
  editCancelBtn.id = "jsCommentEditCancelBtn";
  editCancelBtn.textContent = "CANCEL";
  editBtnBox.append(editCancelBtn);

  const editSaveBtn = document.createElement("button");
  editSaveBtn.classList.add("comment__editSaveBtn", "commentSaveBtn");
  editSaveBtn.id = "jsCommentEditSaveBtn";
  editSaveBtn.textContent = "SAVE";
  editBtnBox.append(editSaveBtn);

  // Subinfo
  // Subinfo Heart
  const subInfo = document.createElement("div");
  subInfo.classList.add("comment__subinfo");
  subInfo.id = "jsCommentSubinfo";
  right.append(subInfo);

  const commentHeart = document.createElement("span");
  commentHeart.classList.add("comment__heart");
  subInfo.append(commentHeart);

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fas", "fa-heart", "heartBtn");
  commentHeart.append(heartIcon);

  const heartNumber = document.createElement("span");
  heartNumber.classList.add("comment__heart-number");
  heartNumber.id = "jsHeartNumber";
  heartNumber.textContent = parsedInfo.commentHeart;
  commentHeart.append(heartNumber);

  // Subinfo Comment Reply
  const commentReply = document.createElement("span");
  commentReply.classList.add("comment__reply");
  subInfo.append(commentReply);

  const commentReplyBtn = document.createElement("i");
  commentReplyBtn.classList.add("fas", "fa-reply", "replyBtn");
  commentReply.append(commentReplyBtn);

  const commentReplyCount = document.createElement("span");
  commentReplyCount.classList.add("reply__count");
  commentReplyCount.id = "jsCommentEdit";
  commentReplyCount.textContent = parsedInfo.commentReplies;
  commentReply.append(commentReplyCount);

  // Subinfo Comment Edit
  const commentEdit = document.createElement("span");
  commentEdit.classList.add("comment__editBtn");
  commentEdit.id = "jsCommentEdit";
  subInfo.append(commentEdit);

  const commentEditBtn = document.createElement("i");
  commentEditBtn.classList.add("far", "fa-edit", "editBtn");
  commentEdit.append(commentEditBtn);

  // Subinfo Comment Delete
  const commentDelete = document.createElement("span");
  commentDelete.classList.add("comment__deleteBtn");
  commentDelete.id = "jsCommentDelete";
  subInfo.append(commentDelete);

  const commentDeleteBtn = document.createElement("i");
  commentDeleteBtn.classList.add("far", "fa-trash-alt", "deleteBtn");
  commentDelete.append(commentDeleteBtn);

  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/add-comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    console.log(response.data);
    addCommentBlock(response.data);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const comment = addCommentInput.value;
  sendComment(comment);
  addCommentInput.value = "";
  addCommentInput.blur();
};

const handleFocusInput = () => {
  buttonBox.classList.remove("hidden");
};

const handleCancelBtn = () => {
  addCommentInput.value = "";
  addCommentInput.blur();
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  addCommentInput.addEventListener("click", handleFocusInput);
  cancelBtn.addEventListener("click", handleCancelBtn);
  commentBtn.addEventListener("click", handleSubmit);
}

if (addCommentForm) {
  init();
}
