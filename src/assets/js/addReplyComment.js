import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");

let comment;
let commentId;
let userId;
let videoId;
let replyBox;
let replyForm;
let replyInput;
let replyCancelBtn;
let replySubmitBtn;
let replyList;

// Reply 입력을 마치면 실시간처럼 Reply가 생기는 Fake 함수
const addReplyComment = (parsedInfo) => {
  // ReplyBlock Element
  const replyBlock = document.createElement("li");
  // 비디오 크리에이터와 리플라이 크리에이트가 같다면 owner 블락을 생성
  if (parsedInfo.videoCreator === parsedInfo.replyCreator) {
    replyBlock.classList.add("reply__block-owner");
    // 비디오 크리에이터와 리플라이 크리에이트가 다르다면 visitor 블락을 생성
  } else {
    replyBlock.classList.add("reply__block-visitor");
  }
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

// Add Reply Form이 제출되면 백엔드에 데이터를 요청하는 AXIOS(AJAX) 함수
const sendReply = async (reply, videoId) => {
  const response = await axios({
    url: `/api/${commentId}/add-reply`,
    method: "POST",
    data: {
      reply,
      videoId,
    },
  });
  // 클라이언트가 서버에 요청을 하고 요청이 정상적으로 승인된 후 브라우저에 응답이 정상적으로 이루어질 경우 발생하는 조건문
  if (response.status === 200) {
    addReplyComment(response.data);
    addNotificationModal("Successfully", "added", "reply");
    // 클라이언트가 서버에 요청을 했으나 요청이 정상적으로 이루어지지 않아 브라우저에 에러를 보낼 때 발생하는 조건문
  } else {
    addNotificationModal("Failed to", "added", "reply");
  }
};

const handleReplyHidden = () => {
  replyBox = comment.nextSibling;
  replyBox.classList.toggle("hidden");
};

// 로그인 되어있을 시 Add Reply Form이 제출되면 실행되는 함수
// 버튼에 Id를 달지 않았기 때문에 Add Reply Save Btn을 클릭할 시 어떤 Reply인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
const handleSubmit = (event) => {
  if (event.target.className.includes("replySaveBtn")) {
    comment =
      event.target.parentElement.parentElement.parentElement.previousSibling;
    commentId =
      event.target.parentElement.parentElement.parentElement.previousSibling
        .dataset.id;
    videoId = document.getElementById("jsVideo").dataset.id;
    replyInput = comment.nextSibling.childNodes[0].childNodes[0];
  } else if (event.target.className.includes("replyForm")) {
    comment = event.target.parentElement.previousSibling;
    commentId = event.target.parentElement.previousSibling.dataset.id;
    replyInput = comment.nextSibling.childNodes[0].childNodes[0];
    videoId = document.getElementById("jsVideo").dataset.id;
  }
  event.preventDefault();
  const reply = replyInput.value;
  sendReply(reply, videoId);
  replyInput.value = "";
  replyInput.blur();
};

// 로그인 되어있을 시 Add Reply Form의 Cancel 버튼을 클릭하면 실행되는 함수
// 버튼에 Id를 달지 않았기 때문에 Add Reply Cancel Btn을 클릭할 시 어떤 Reply인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
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

// Reply Btn을 누르면 발생하는 이벤트 함수
const handleReplyBtn = (event) => {
  // Reply Btn을 누르면 Comment Block & CommentId & UserId & VideoId를 받아온다.
  // 만약에 이렇게 하려는 분이 있다면 추천할 만한 방법이 아님
  // 차라리 버튼에 Id를 때려박는게 더 좋은 방법이라고 생각함!
  // 왜 그런지는 위의 함수에서 설명하겠음
  if (event.target.className.includes("replyBtn")) {
    comment =
      event.target.parentElement.parentElement.parentElement.parentElement;
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.id;
    videoId = document.getElementById("jsVideo").dataset.id;
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

if (commentContainer) {
  init();
}
