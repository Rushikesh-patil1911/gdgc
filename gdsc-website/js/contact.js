(() => {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  const fields = {
    name: form.elements.namedItem("name"),
    email: form.elements.namedItem("email"),
    message: form.elements.namedItem("message")
  };
  const errorNodes = {
    name: document.querySelector("#name-error"),
    email: document.querySelector("#email-error"),
    message: document.querySelector("#message-error")
  };
  const result = form.querySelector(".contact-form__result");
  const submit = form.querySelector('[type="submit"]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactBoard = form.closest(".contact-board");

  function validate() {
    const values = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      message: fields.message.value.trim()
    };
    const errors = {
      name: values.name ? "" : "Please enter your name.",
      email: !values.email ? "Please enter your email address." : (emailPattern.test(values.email) ? "" : "Enter a valid email address."),
      message: values.message.length >= 10 ? "" : "Please enter a message of at least 10 characters."
    };
    Object.keys(errors).forEach((key) => {
      errorNodes[key].textContent = errors[key];
      fields[key].setAttribute("aria-invalid", String(Boolean(errors[key])));
    });
    return Object.values(errors).every((error) => !error);
  }

  function celebrateSubmission() {
    if (!contactBoard || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const burst = document.createElement("div");
    burst.className = "success-confetti";
    burst.setAttribute("aria-hidden", "true");
    const colors = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];
    for (let index = 0; index < 20; index += 1) {
      const piece = document.createElement("i");
      piece.style.setProperty("--confetti-color", colors[index % colors.length]);
      piece.style.setProperty("--confetti-angle", `${(360 / 20) * index}deg`);
      piece.style.setProperty("--confetti-distance", `${55 + (index % 4) * 18}px`);
      piece.style.setProperty("--confetti-delay", `${(index % 5) * 24}ms`);
      burst.append(piece);
    }
    contactBoard.append(burst);
    window.setTimeout(() => burst.remove(), 900);
  }

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate();
      result.textContent = "";
      result.classList.remove("is-error");
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    result.textContent = "";
    result.classList.remove("is-error");
    if (!validate()) {
      const firstInvalid = Object.values(fields).find((field) => field.getAttribute("aria-invalid") === "true");
      firstInvalid.focus();
      return;
    }
    submit.disabled = true;
    submit.textContent = "Sending...";
    window.setTimeout(() => {
      result.textContent = "Thanks for reaching out! Your message is ready for the GDSC team (demo only).";
      celebrateSubmission();
      form.reset();
      Object.values(fields).forEach((field) => field.removeAttribute("aria-invalid"));
      submit.disabled = false;
      submit.innerHTML = 'Send message <span aria-hidden="true">→</span>';
    }, 800);
  });
})();
