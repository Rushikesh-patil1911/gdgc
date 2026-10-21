(() => {
  const drawer = document.querySelector(".mobile-drawer");
  const openButton = document.querySelector(".navbar__menu");
  if (!drawer || !openButton) return;

  const closeButton = drawer.querySelector(".mobile-drawer__close");
  const backdrop = document.querySelector("[data-drawer-close]");
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let previousFocus = null;

  function openDrawer() {
    previousFocus = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");
    backdrop.hidden = false;
    document.body.classList.add("drawer-open");
    closeButton.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");
    backdrop.hidden = true;
    document.body.classList.remove("drawer-open");
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }

  openButton.addEventListener("click", openDrawer);
  closeButton.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (event) => {
    if (!drawer.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      closeDrawer();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...drawer.querySelectorAll(focusableSelector)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
