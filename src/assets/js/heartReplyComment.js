import axios from "axios";

const commentContainer = document.getElementById("jsCommentContainer");

let replyId;
let userId;
let replyHeartIcon;
let isSelected;
let replyBlock;

// Heart Comment를 클릭하면 실시간으로 하트 수가 반영되는 Fake 함수

const handleHeartNumber = () => {
  if (replyBlock) {
    let heartNumber = replyBlock.querySelector("#jsReplyHeartNumber")
      .textContent;
    isSelected ? heartNumber-- : heartNumber++;
    replyBlock.querySelector("#jsReplyHeartNumber").textContent = heartNumber;
  }
};

// Heart Comment를 클릭하면 선택되었는지 확인할 수 있는 selected 클래스를 토글함

const handleHeartSelected = (replyHeartIcon) => {
  replyHeartIcon.classList.toggle("selected");
};

// Heart Comment를 클릭하면 백엔드에 데이터를 요청하는 AXIOS(AJAX) 함수

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
  // 어떤 답글의 Heart Btn인지 확인하고 replytId & userId & replytBlock을 받아온다.
  // 만약에 이렇게 하려는 분이 있다면 추천할 만한 방법이 아님
  // 차라리 버튼에 Id를 때려박는게 더 좋은 방법이라고 생각함!
  // 버튼에 Id를 달지 않았기 때문에 Reply Heart Btn을 클릭할 시 어떤 Reply인지 모르기 때문에 id를 새로 입력해줘야하는 문제점이 발생함
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

if (commentContainer) {
  init();
}
