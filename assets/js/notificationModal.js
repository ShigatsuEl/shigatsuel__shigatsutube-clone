// Comment & Reply를 add / edit / delete 할 시 발생하는 모달메시지
export const addNotificationModal = (success, action, type) => {
  const notificationModal = document.getElementById("jsNotificationModal");
  notificationModal.textContent = `${success} ${action} your ${type}`;
  notificationModal.classList.remove("hidden");
  notificationModal.classList.add("transition");
  if (action === "added") {
    notificationModal.style.backgroundColor = "rgba(255,0,0,0.4)";
  } else if (action === "fixed") {
    notificationModal.style.backgroundColor = "rgba(0,0,255,0.4)";
  } else if (action === "delete") {
    notificationModal.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  // notificationModal이 실행되고 1.5초 후 실행되는 함수
  setTimeout(() => {
    notificationModal.classList.add("hidden");
    notificationModal.classList.remove("transition");
  }, 2000);
};

// 비디오를 like or dislike 할 시 발생하는 모달메시지
export const addLikingModal = (type) => {
  const notificationModal = document.getElementById("jsNotificationModalVideo");
  notificationModal.textContent = `You ${type} this video!`;
  notificationModal.classList.remove("hidden");
  notificationModal.classList.add("transitionTwo");
  if (type === "liked") {
    notificationModal.style.backgroundColor = "rgba(255,0,0,0.4)";
  } else if (type === "disliked") {
    notificationModal.style.backgroundColor = "rgba(0,0,255,0.4)";
  }
  setTimeout(() => {
    notificationModal.classList.add("hidden");
    notificationModal.classList.remove("transitionTwo");
  }, 2000);
};
