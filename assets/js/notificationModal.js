export const addNotificationModal = (success, action, type) => {
  const notificationModal = document.getElementById("jsNotificationModal");
  notificationModal.textContent = `${success} ${action} your ${type}`;
  notificationModal.classList.remove("hidden");
  notificationModal.classList.add("transition");
  if (action === "fixed") {
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
