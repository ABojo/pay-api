const demoForms = document.querySelectorAll(".demo");

const validators = {
  email: function (email) {
    const regEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    return regEx.test(email);
  },
};

//hook up all schedule demo forms on the page
demoForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email");

    if (validators.email(email)) {
      form.classList.add("demo--submitted");
      form.classList.remove("demo--invalid");
      //send email to API here
    } else {
      form.classList.add("demo--invalid");
    }
  });
});
