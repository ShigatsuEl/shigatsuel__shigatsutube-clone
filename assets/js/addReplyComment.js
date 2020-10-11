const commentContainer = document.getElementById("jsCommentContainer");
const commentSubinfo = document.querySelector(".comment__subinfo");

let commentId;
let userId;
let replyBox;
let replyForm;
let replyInput;

const sendReply = () => {
    //
}

const handleSubmit = (event) => {
    event.preventDefault();
    const reply = replyInput.value;
    sendReply(reply);
    replyInput.value = "";
    replyInput.blur();

}

const handleReplyHidden = () => {
    replyBox = commentId.nextSibling;
    replyBox.classList.toggle("hidden");
}

const handleReplyBtn = (event) => {
    if(event.target.className.includes("replyBtn")) {
        commentId = event.target.parentElement.parentElement.parentElement.parentElement;
        replyForm = commentId.nextSibling.childNodes[0];
        replyInput = commentId.nextSibling.childNodes[0].childNodes[0];
        handleReplyHidden();
        replyForm.addEventListener("submit", handleSubmit);
    }

}

function init() {
    commentContainer.addEventListener("click", handleReplyBtn);
}

if(commentSubinfo) {
    init();
}