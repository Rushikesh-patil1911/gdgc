(() => {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;
  const finish = () => {
    preloader.classList.add("is-done");
    preloader.addEventListener("transitionend", () => preloader.remove(), { once: true });
    window.setTimeout(() => preloader.remove(), 450);
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
  } else {
    window.addEventListener("load", () => window.setTimeout(finish, 300), { once: true });
    window.setTimeout(finish, 1800);
  }
})();
