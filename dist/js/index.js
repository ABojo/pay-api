const demoForms = document.querySelectorAll(".demo");

const nav = document.querySelector(".header__nav");
const openNav = document.querySelector(".header__open");
const closeNav = document.querySelector(".header__close");

const contactForm = document.querySelector(".contact__form");
const contactSuccess = document.querySelector(".contact__success");
const nameInput = document.querySelector('[name="name"]');
const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');

const invalidInputClass = "field--invalid";

function emailIsValid(email) {
  const regEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  return regEx.test(email);
}

//not extensible, but this form is unlikely to change so the time required to abstract further isn't worth it
//returns inputs validity and toggles its error in the UI
function inputIsValid(node, type) {
  const { value } = node;
  let isValid = true;

  //run type of validity check against the input's value
  switch (type) {
    case "required":
      if (!value) isValid = false;
      break;
    case "email":
      if (!emailIsValid(value)) isValid = false;
      break;
  }

  //toggle error state if input is invalid
  if (!isValid) node.parentElement.classList.add(invalidInputClass);

  return isValid;
}

//hook up all schedule demo forms on the page
demoForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email");

    if (emailIsValid(email)) {
      form.classList.add("demo--submitted");
      form.classList.remove("demo--invalid");
      //send email to API here
    } else {
      form.classList.add("demo--invalid");
    }
  });
});

//hook up contact form
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //get validation status and show errors if necessary
    const nameIsValid = inputIsValid(nameInput, "required");
    const emailIsValid = inputIsValid(emailInput, "email");
    const messageIsValid = inputIsValid(messageInput, "required");

    const formIsValid = nameIsValid && emailIsValid && messageIsValid;

    if (formIsValid) {
      contactSuccess.classList.add("contact__success--visible");
      //ship data off to backend
    }
  });

  //clear errors when new inputs are made
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.parentElement.classList.remove(invalidInputClass);
    });
  });
}

//hook up nav buttons
function toggleNav() {
  nav.classList.toggle("header__nav--open");
}

openNav.addEventListener("click", toggleNav);
closeNav.addEventListener("click", toggleNav);
