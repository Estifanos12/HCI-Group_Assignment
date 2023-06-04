function init() {
    const logoutBtn = document.getElementById("logout-btn");
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".secondModal");
    const smallDel = document.getElementById("smallDel");
    const yes = document.getElementById("ok");
    logoutBtn.addEventListener("click", () => {
        overlay.classList.add("open");
        modal.classList.add("active");
        // localStorage.removeItem("token");
        // window.location.reload();
    });

    yes.addEventListener("click", () => {
        overlay.classList.remove("open");
        modal.classList.remove("active");

        localStorage.removeItem("token");
        window.location.reload();
    })
    overlay.addEventListener("click", () => {
        overlay.classList.remove("open");
        modal.classList.remove("active");
    });

    smallDel.addEventListener("click", () => {
        overlay.classList.remove("open");
        modal.classList.remove("active");
    });
}

document.addEventListener("DOMContentLoaded", init);
