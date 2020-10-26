import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");

let commentId;
let userId;
let videoId;
let commentBlock;
let replyBox;
let replyViewBox;

// Comment 삭제 시 실시간으로 Comment 수를 변경하는 함수
const decreaseNumber = () => {
  const commentNumber = document.getElementById("jsCommentNumber");
  const commentLiteral = document.getElementById("jsLiteralComment");
  commentNumber.textContent = parseInt(commentNumber.textContent, 10) - 1;
  // Comment 수가 0보다 작아지는 일이 없게 방지
  if (commentNumber.textContent <= 0) {
    commentNumber.textContent = "0";
    commentLiteral.textContent = " Comments";
    // Comment 수가 "1"이 되면 Comments가 아닌 Comment로 변경
  } else if (commentNumber.textContent === "1") {
    commentLiteral.textContent = " Comment";
    // 그 외는 Comments로 변경
  } else {
    commentLiteral.textContent = " Comments";
  }
};

// 컨트롤러에서 Reply Delete를 성공 시 response status를 200을 반환하고 200을 받았을 시 실시간으로 댓글을 삭제하는 Faking 이벤트
const handleDeleteComment = () => {
  commentBlock = document.getElementById(`${commentId}`);
  replyBox = commentBlock.nextSibling;
  replyViewBox = commentBlock.nextSibling.nextSibling;
  commentBlock.remove();
  replyBox.remove();
  replyViewBox.remove();
};

// 받아온 정보를 통해 Ajax를 사용해 프론트엔드에서 백엔드 컨트롤러로 commentId & userId & videoId를 보냄
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
    // 클라이언트가 서버에 요청을 하고 요청이 정상적으로 승인된 후 브라우저에 응답이 정상적으로 이루어질 경우 발생하는 조건문
    handleDeleteComment();
    decreaseNumber();
    addNotificationModal("Successfully", "delete", "comment");
    // 클라이언트가 서버에 요청을 했으나 요청이 정상적으로 이루어지지 않아 브라우저에 에러를 보낼 때 발생하는 조건문
  } else {
    addNotificationModal("Failed to", "delete", "comment");
  }
};

// Comment Delete Btn을 클릭하면 발생하는 이벤트 함수
const handleDelteBtn = (event) => {
  //console.log(event.target.parentElement.parentElement.parentElement.parentElement);
  // 어떤 댓글의 Delete Btn인지 확인하고 commentId & userId & videoId를 받아온다.
  // 만약에 이렇게 하려는 분이 있다면 추천할 만한 방법이 아님
  // 차라리 버튼에 Id를 때려박는게 더 좋은 방법이라고 생각함!
  if (event.target.className.includes("deleteBtn")) {
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.id;
    videoId = document.getElementById("jsVideo").dataset.id;
    // commentId & userId & videoId를 전송하는 함수
    handleDeleteData(commentId, userId, videoId);
  }
};

function init() {
  commentContainer.addEventListener("click", handleDelteBtn);
}

if (commentContainer) {
  init();
}
