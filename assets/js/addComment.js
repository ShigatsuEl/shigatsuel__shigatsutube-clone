import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");
const addCommentForm = document.getElementById("jsAddCommentForm");
const addCommentInput = document.getElementById("jsAddCommentInput");
const buttonBox = document.getElementById("jsBtnBox");
const commentList = document.getElementById("jsCommentList");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (parsedInfo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const img = document.createElement("img");
  span.innerHTML = parsedInfo.comment;
  img.src = parsedInfo.avatarUrl;
  li.appendChild(img);
  li.appendChild(span);
  commentList.prepend(li);
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
    addComment(response.data);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = document.getElementById("jsAddCommentInput");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const handleFocusInput = () => {
  const focus = document.activeElement;
  if (addCommentInput === focus) {
    buttonBox.classList.remove("hidden");
  } else {
    buttonBox.classList.add("hidden");
  }
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  addCommentInput.addEventListener("focus", handleFocusInput);
  addCommentInput.addEventListener("blur", handleFocusInput);
}

if (addCommentForm) {
  init();
}
