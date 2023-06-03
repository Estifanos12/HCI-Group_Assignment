function init() {
  const submit = document.getElementById("submit");

  const fullNameInput = document.getElementById("full-name");
  const phoneNumberInput = document.getElementById("phone-number");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageTextarea = document.getElementById("message");
  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  const fullNameRequired = document.getElementById("fullnameRequired");
  const fullnameInvalid = document.getElementById("fullnameInvalid");

  const phoneInvalid = document.getElementById("phoneInvalid");

  const emailRequired = document.getElementById("emailRequired");
  const emailInvalid = document.getElementById("emailInvaild");

  const mesRequired = document.getElementById("mesRequired");
  const mesInvalid = document.getElementById("mesInvalid");

  fullNameInput.addEventListener("focus", () => {
    contactMessage.classList.add("none");
  });
  phoneNumberInput.addEventListener("focus", () => {
    contactMessage.classList.add("none");
  });
  emailInput.addEventListener("focus", () => {
    contactMessage.classList.add("none");
  });
  subjectInput.addEventListener("focus", () => {
    contactMessage.classList.add("none");
  });
  messageTextarea.addEventListener("focus", () => {
    contactMessage.classList.add("none");
  });
  contactForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let isValid = true;

    fullNameRequired.classList.add("none");
    fullnameInvalid.classList.add("none");
    phoneInvalid.classList.add("none");
    emailRequired.classList.add("none");
    emailInvalid.classList.add("none");
    mesRequired.classList.add("none");
    mesInvalid.classList.add("none");

    const fullName = fullNameInput.value;
    const phoneNumber = phoneNumberInput.value;
    const email = emailInput.value;
    const subject = subjectInput.value;
    const message = messageTextarea.value;

    let fullNameReg =
      /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
    if (!fullNameReg.test(fullName)) {
      isValid = false;
      fullNameInput.classList.add("invalid");
      if (fullName.length === 0) fullNameRequired.classList.remove("none");
      else fullnameInvalid.classList.remove("none");
    } else {
      fullnameInvalid.classList.add("none");
      fullNameRequired.classList.add("none");
    }

    let phoneReg =
      /^\+?(251)?[-. ]?(9[0-9]{1})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumber.length !== 0 && !phoneReg.test(phoneNumber)) {
      isValid = false;
      phoneNumberInput.classList.add("invalid");
      phoneInvalid.classList.remove("none");
    } else {
      phoneInvalid.classList.add("none");
    }

    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailReg.test(email)) {
      isValid = false;
      emailInput.classList.add("invalid");
      if (email.length === 0) emailRequired.classList.remove("none");
      else emailInvalid.classList.remove("none");
    } else {
      emailInvalid.classList.add("none");
      emailRequired.classList.add("none");
    }

    if (message.length === 0) {
      messageTextarea.classList.add("invalid");
      isValid = false;
      mesRequired.classList.remove("none");
    } else if (message.length > 200) {
      isValid = false;
      mesInvalid.classList.remove("none");
    } else {
      mesInvalid.classList.add("none");
      mesRequired.classList.add("none");
    }

    if (isValid) {
      contactMessage.classList.remove("none");
    }
  });
}
document.addEventListener("DOMContentLoaded", init);
