function init() {
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", init);
