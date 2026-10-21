(() => {
  document.querySelectorAll(".faq-card__question").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.querySelector("span").textContent = expanded ? "+" : "−";
      button.closest(".faq-card").classList.toggle("is-collapsed", expanded);
    });
  });
})();
