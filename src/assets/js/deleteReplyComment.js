import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");

let commentId;
let replyId;

// 컨트롤러에서 Reply Delete를 성공 시 response status를 200을 반환하고 200을 받았을 시 실시간으로 댓글을 삭제하는 Faking 이벤트
const handleDeleteReply = () => {
  const replyBlock = document.getElementById(`${replyId}`);
  replyBlock.remove();
};

// 받아온 Reply & comment Id를 통해 Ajax를 사용해 백엔드 컨트롤러로 Reply & commentId를 보냄
const handleDeleteData = async (commentId, replyId) => {
  const response = await axios({
    method: "post",
    url: `/api/${replyId}/delete-reply`,
    data: {
      commentId,
    },
  });
  // 클라이언트가 서버에 요청을 하고 요청이 정상적으로 승인된 후 브라우저에 응답이 정상적으로 이루어질 경우 발생하는 조건문
  if (response.status === 200) {
    handleDeleteReply();
    addNotificationModal("Successfully", "delete", "reply");
    // 클라이언트가 서버에 요청을 했으나 요청이 정상적으로 이루어지지 않아 브라우저에 에러를 보낼 때 발생하는 조건문
  } else {
    addNotificationModal("Failed to", "delete", "reply");
  }
};

// Reply Delete 버튼을 클릭 시 선택된 reply와 그와 관련된 comment Id를 받아오는 이벤트

const handleDelteBtn = (event) => {
  //console.log(event.target.parentElement.parentElement.parentElement.parentElement);
  // 어떤 답글의 Delete Btn인지 확인하고 commentId & replyId를 받아온다.
  // 만약에 이렇게 하려는 분이 있다면 추천할 만한 방법이 아님
  // 차라리 버튼에 Id를 때려박는게 더 좋은 방법이라고 생각함!
  // 버튼에 Id를 달지 않았기 때문에 Reply Delete Btn을 클릭할 시 어떤 Reply인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
  if (event.target.className.includes("replyDeleteBtn")) {
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.previousSibling.previousSibling.dataset.id;
    // commentId & userId & videoId를 전송하는 함수
    handleDeleteData(commentId, replyId);
  }
};

function init() {
  commentContainer.addEventListener("click", handleDelteBtn);
}

if (commentContainer) {
  init();
}
