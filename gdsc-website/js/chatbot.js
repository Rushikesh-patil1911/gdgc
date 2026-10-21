(() => {
  const panel = document.querySelector(".chat-panel");
  const launcher = document.querySelector(".chat-launcher");
  const closeButton = document.querySelector(".chat-close");
  const form = document.querySelector(".chat-form");
  const input = document.querySelector("#chat-input");
  const messages = document.querySelector(".chat-messages");
  if (!panel || !launcher || !form || !input || !messages) return;

  const replies = [
    { matches: ["past event", "previous event"], text: "Here are a few past events: DSA in December, Flutter Forward, and Compose Camp." },
    { matches: ["upcoming", "next event"], text: "We're planning more community events. Keep an eye on our events section for announcements." },
    { matches: ["join", "member"], text: "All students are welcome! Send us a message through the Contact page and we'll help you find your way in." },
    { matches: ["contact", "email"], text: "You can reach the team at gdsc.dypcoe@gmail.com or use the Contact page form." },
    { matches: ["workshop", "learn"], text: "Our workshops are hands-on and beginner-friendly. Check the Events section for the latest updates." }
  ];
  let previousFocus = null;

  function appendMessage(text, sender) {
    const article = document.createElement("article");
    article.className = `chat-message${sender === "user" ? " chat-message--user" : ""}`;
    const label = document.createElement("span");
    label.className = "chat-message__label";
    label.textContent = sender === "user" ? "You" : "GDSC Assistant";
    const bubble = document.createElement("p");
    bubble.className = "chat-message__bubble";
    bubble.textContent = text;
    article.append(label, bubble);
    messages.append(article);
    messages.scrollTop = messages.scrollHeight;
  }

  function openChat() {
    previousFocus = document.activeElement;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    launcher.setAttribute("aria-expanded", "true");
    document.body.classList.add("chat-open");
    input.focus();
  }
  function closeChat() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    launcher.setAttribute("aria-expanded", "false");
    document.body.classList.remove("chat-open");
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }
  function addTypingReply(text) {
    const typing = document.createElement("div");
    typing.className = "chat-message chat-typing";
    typing.setAttribute("aria-label", "Assistant is typing");
    typing.innerHTML = "<i></i><i></i><i></i>";
    messages.append(typing);
    messages.scrollTop = messages.scrollHeight;
    window.setTimeout(() => {
      typing.remove();
      appendMessage(text, "bot");
    }, 550);
  }

  appendMessage("Hey! Welcome to the GDSC website. How can I help you explore?", "bot");
  launcher.addEventListener("click", () => panel.classList.contains("is-open") ? closeChat() : openChat());
  closeButton.addEventListener("click", closeChat);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    input.value = "";
    const normalized = text.toLowerCase();
    const match = replies.find((reply) => reply.matches.some((keyword) => normalized.includes(keyword)));
    addTypingReply(match ? match.text : "Thanks for reaching out! Try asking about events, workshops, joining, or contacting the team.");
  });
  document.addEventListener("keydown", (event) => {
    if (!panel.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      closeChat();
      return;
    }
    if (event.key === "Tab") {
      const focusable = [...panel.querySelectorAll('button, input')].filter((element) => !element.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
