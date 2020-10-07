import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let commentId;
let userId;
let videoId;

const handleDeleteComment = () => {
  const commentBlock = document.getElementById(`${commentId}`);
  commentBlock.remove();
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

if (commentSubinfo) {
  init();
}
