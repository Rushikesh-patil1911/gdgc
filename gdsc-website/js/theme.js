(() => {
  const root = document.documentElement;
  const themeButtons = [...document.querySelectorAll(".theme-toggle")];
  const themeChoices = [...document.querySelectorAll("[data-theme-choice]")];
  const storageKey = "gdsc-color-theme";
  const savedTheme = localStorage.getItem(storageKey);
  const initialTheme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
    themeButtons.forEach((button) => {
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
    themeChoices.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
    });
  }

  setTheme(initialTheme);
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
  });
  themeChoices.forEach((button) => button.addEventListener("click", () => setTheme(button.dataset.themeChoice)));
})();
