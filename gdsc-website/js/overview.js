(() => {
  const concepts = [...document.querySelectorAll(".concept")];
  if (!concepts.length) return;
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  function setMobileState() {
    concepts.forEach((concept, index) => {
      const trigger = concept.querySelector(".concept__trigger");
      const isOpen = mobileQuery.matches ? index === 0 : true;
      concept.classList.toggle("is-collapsed", !isOpen);
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  concepts.forEach((concept) => {
    const trigger = concept.querySelector(".concept__trigger");
    trigger.addEventListener("click", () => {
      if (!mobileQuery.matches) return;
      const open = trigger.getAttribute("aria-expanded") === "true";
      concepts.forEach((item) => {
        const itemTrigger = item.querySelector(".concept__trigger");
        item.classList.add("is-collapsed");
        itemTrigger.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        concept.classList.remove("is-collapsed");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
  setMobileState();
  mobileQuery.addEventListener("change", setMobileState);
})();
