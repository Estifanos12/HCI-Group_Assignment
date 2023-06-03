async function init() {
  const form = document.getElementById("signup-form");
  const fullName = document.getElementById("fullname");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const usernameExist = document.getElementById("usernameExist");
  const invalidFullname = document.getElementById("invalid-fullname");
  const invalidPassword = document.getElementById("invalid-pwd");
  const invalidUsername = document.getElementById("invalid-username");
  fullName.addEventListener("focus", (ev) => {
    usernameExist.classList.add("none");
    invalidFullname.classList.add("none");
    invalidPassword.classList.add("none");
    invalidUsername.classList.add("none");
  });
  username.addEventListener("focus", (ev) => {
    usernameExist.classList.add("none");
    invalidFullname.classList.add("none");
    invalidPassword.classList.add("none");
    invalidUsername.classList.add("none");
  });
  password.addEventListener("focus", (ev) => {
    usernameExist.classList.add("none");
    invalidFullname.classList.add("none");
    invalidPassword.classList.add("none");
    invalidUsername.classList.add("none");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    let fullNameReg =
      /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
    if (!fullNameReg.test(fullName.value)) {
      isValid = false;
      invalidFullname.classList.remove("none");
    }

    let passwordReg = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!passwordReg.test(password.value)) {
      isValid = false;
      invalidPassword.classList.remove("none");
    }

    if (!(username.value.length >= 3 && username.value.length <= 11)) {
      isValid = false;
      invalidUsername.classList.remove("none");
    }

    if (isValid) {
      const payload = {
        username: username.value,
        full_name: fullName.value,
        password: password.value,
      };
      const data = await signUp(payload);
      if (data?.username) {
        form.classList.add("none");
        document.getElementById("sign-up-success").classList.remove("none");
        setTimeout(() => {
          window.location.replace("http://127.0.0.1:5500/login.html");
        }, 3000);
      } else {
        usernameExist.classList.remove("none");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
