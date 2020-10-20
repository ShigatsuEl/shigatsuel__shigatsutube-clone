import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");
const replySubinfo = document.querySelector(".reply__subinfo");

let replyId;
let userId;
let replyHeartIcon;
let isSelected;
let replyBlock;

// 실시간으로 하트 넘버를 볼 수 있는 함수이다.

const handleHeartNumber = () => {
  if (replyBlock) {
    let heartNumber = replyBlock.querySelector("#jsReplyHeartNumber")
      .textContent;
    isSelected ? heartNumber-- : heartNumber++;
    replyBlock.querySelector("#jsReplyHeartNumber").textContent = heartNumber;
  }
};

// 실시간으로 하트 선택을 볼 수 있는 함수이다.

const handleHeartSelected = (replyHeartIcon) => {
  replyHeartIcon.classList.toggle("selected");
};

// replyId & userId & isSelecte를 백엔드에 요청한다.

const handleHeartData = async (replyId) => {
  const response = await axios({
    method: "post",
    url: `/api/${replyId}/heart-reply`,
    data: {
      userId,
      isSelected,
    },
  });
  if (response.status === 200) {
    // 백엔드에서 응답을 정상적으로 하면 하트선택을 보여주는 프런트(Fake)처리와 하트넘버를 보여주는 프런트(Fake)처리를 한다.
    handleHeartSelected(replyHeartIcon);
    handleHeartNumber();
  }
};

// Reply Heart 아이콘을 클릭하면 replyId & userId를 얻어오고 isSelected(선택되었는지?)를 알려주는 boolean값도 얻는다.

const handleHeartBtn = (event) => {
  if (event.target.className.includes("replyHeartBtn")) {
    replyId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    userId = document.getElementById("jsAddCommentForm").dataset.id;
    replyHeartIcon = event.target;
    replyBlock = document.getElementById(`${replyId}`);
    if (event.target.className.includes("selected")) {
      isSelected = true;
      //   console.log(isSelected);
    } else {
      isSelected = false;
      //   console.log(isSelected);
    }
    // 로그인 되어있을 시 ->
    if (userId) {
      handleHeartData(replyId);
    }
  }
};

function init() {
  commentContainer.addEventListener("click", handleHeartBtn);
}

if (replySubinfo) {
  init();
}
