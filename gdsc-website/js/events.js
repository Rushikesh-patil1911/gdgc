(() => {
  const upcomingEvents = [
    { title: "Build With Us", date: "Coming soon", level: "All levels", symbol: "✦", image: "assets/img/event-build-with-us.svg", status: "upcoming" }
  ];
  const previousEvents = [
    { title: "Flutter Forward", date: "10 – 11 January 2023", level: "Beginner", symbol: "F", image: "assets/img/event-flutter-forward.svg", status: "previous" },
    { title: "Compose Camp", date: "Community workshop", level: "All levels", symbol: "C", image: "assets/img/event-compose-camp.svg", status: "previous" },
    { title: "DSA in December", date: "Problem-solving session", level: "Intermediate", symbol: "{ }", image: "assets/img/event-dsa-december.svg", status: "previous" }
  ];
  const upcomingContainer = document.querySelector("#upcoming-events");
  const previousContainer = document.querySelector("#previous-events");
  if (!upcomingContainer || !previousContainer) return;

  function renderEvent(event, compact = false) {
    const card = document.createElement("article");
    card.className = `event-card${compact ? " event-card--compact" : ""}`;
    const poster = document.createElement("div");
    poster.className = "event-card__poster";
    const image = document.createElement("img");
    image.src = event.image;
    image.alt = `${event.title} event poster`;
    image.loading = "lazy";
    image.decoding = "async";
    poster.append(image);

    const body = document.createElement("div");
    body.className = "event-card__body";
    const titleLine = document.createElement("div");
    titleLine.className = "event-card__title-line";
    const heading = document.createElement("h4");
    heading.textContent = event.title;
    const tag = document.createElement("span");
    tag.className = "event-card__tag";
    tag.textContent = event.level;
    titleLine.append(heading, tag);
    const date = document.createElement("p");
    date.className = "event-card__date";
    date.textContent = event.date;
    const action = document.createElement("span");
    action.className = "event-card__action event-card__action--disabled";
    action.textContent = event.status === "upcoming" ? "Registration soon" : "Know more";
    action.setAttribute("aria-label", `${event.title}: ${action.textContent}`);
    body.append(titleLine, date, action);
    card.append(poster, body);
    return card;
  }

  upcomingEvents.forEach((event) => upcomingContainer.append(renderEvent(event)));
  previousEvents.forEach((event) => previousContainer.append(renderEvent(event, true)));

  const timeline = document.querySelector(".event-timeline");
  if (timeline && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        timeline.classList.add("is-drawing");
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(timeline);
  }
})();
