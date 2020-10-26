import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");

let commentId;
let userId;
let videoId;
let commentBlock;
let replyBox;
let replyViewBox;

const decreaseNumber = () => {
  const commentNumber = document.getElementById("jsCommentNumber");
  const commentLiteral = document.getElementById("jsLiteralComment");
  commentNumber.textContent = parseInt(commentNumber.textContent, 10) - 1;
  if (commentNumber.textContent <= 0) {
    commentNumber.textContent = "0";
    commentLiteral.textContent = " Comments";
  } else if (commentNumber.textContent === "1") {
    commentLiteral.textContent = " Comment";
  } else {
    commentLiteral.textContent = " Comments";
  }
};

const handleDeleteComment = () => {
  commentBlock = document.getElementById(`${commentId}`);
  replyBox = commentBlock.nextSibling;
  replyViewBox = commentBlock.nextSibling.nextSibling;
  commentBlock.remove();
  replyBox.remove();
  replyViewBox.remove();
};

const handleDeleteData = async (commentId, userId, videoId) => {
  const response = await axios({
    method: "post",
    url: `/api/${commentId}/delete-comment`,
    data: {
      userId,
      videoId,
    },
  });
  if (response.status === 200) {
    handleDeleteComment();
    decreaseNumber();
    addNotificationModal("Successfully", "delete", "comment");
  } else {
    addNotificationModal("Failed to", "delete", "comment");
  }
};

const handleDelteBtn = (event) => {
  //console.log(event.target.parentElement.parentElement.parentElement.parentElement);
  if (event.target.className.includes("deleteBtn")) {
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.id;
    videoId = document.getElementById("jsVideo").dataset.id;
    handleDeleteData(commentId, userId, videoId);
  }
};

function init() {
  commentContainer.addEventListener("click", handleDelteBtn);
}

if (commentContainer) {
  init();
}
