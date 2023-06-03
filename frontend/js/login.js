async function init() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");

  username.addEventListener("focus", () => {
    errorMsg.classList.add("none");
  });

  password.addEventListener("focus", () => {
    errorMsg.classList.add("none");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let payload = {
      username: username.value,
      password: password.value,
    };
    const data = await logIn(payload);
    if (data?.accessToken) {
      localStorage.setItem("token", data.accessToken);
      window.location.replace("http://127.0.0.1:5500/index.html");
    } else {
      errorMsg.classList.remove("none");
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
