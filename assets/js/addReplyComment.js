const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let commentId;
let userId;

const handleReplyHidden = () => {
    const replyBox = commentId.nextSibling;
    replyBox.classList.toggle("hidden");
}

const handleReplyBtn = (event) => {
    if(event.target.className.includes("replyBtn")) {
        commentId = event.target.parentElement.parentElement.parentElement.parentElement;
        handleReplyHidden();
    }

}

function init() {
    commentContainer.addEventListener("click", handleReplyBtn);
}

if(commentSubinfo) {
    init();
}