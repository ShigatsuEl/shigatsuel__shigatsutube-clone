export const addNotificationModal = (success, action, type) => {
  const notificationModal = document.getElementById("jsNotificationModal");
  notificationModal.textContent = `${success} ${action} your ${type}`;
  notificationModal.classList.remove("hidden");
  // notificationModal이 실행되고 1.5초 후 실행되는 함수
  setTimeout(() => {
    notificationModal.classList.add("hidden");
  }, 1500);
};
