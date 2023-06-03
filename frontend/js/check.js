if (!localStorage.getItem("token")) {
  window.location.replace(`http://127.0.0.1:5500/login.html`);
}
const token = localStorage.getItem("token");
const response = fetch(`http://127.0.0.1:3000/auth/check`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (!data.response) {
      localStorage.removeItem("token");
      window.location.replace(`http://127.0.0.1:5500/login.html`);
    }
  });
