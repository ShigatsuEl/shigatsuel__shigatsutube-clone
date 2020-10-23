import axios from "axios";
import { addNotificationModal } from "./notificationModal";

const commentContainer = document.getElementById("jsCommentContainer");
const replySubinfo = document.querySelector(".reply__subinfo");

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
  if (response.status === 200) {
    handleDeleteReply();
    addNotificationModal("Successfully", "delete", "reply");
  } else {
    addNotificationModal("Failed to", "delete", "reply");
  }
};

// Reply Delete 버튼을 클릭 시 선택된 reply와 그와 관련된 comment Id를 받아오는 이벤트

const handleDelteBtn = (event) => {
  //console.log(event.target.parentElement.parentElement.parentElement.parentElement);
  if (event.target.className.includes("replyDeleteBtn")) {
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    commentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.previousSibling.previousSibling.dataset.id;
    handleDeleteData(commentId, replyId);
  }
};

function init() {
  commentContainer.addEventListener("click", handleDelteBtn);
}

if (replySubinfo) {
  init();
}
