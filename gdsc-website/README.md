# GDSC D.Y. Patil College of Engineering

A responsive, front-end-only community website built with HTML, CSS, and vanilla JavaScript. No server or package installation is required.

## Run

Open `index.html` directly in a modern browser. `contact.html` is the contact and sponsorship page. Google Fonts load from Google Fonts when an internet connection is available; the site uses system font fallbacks otherwise.

## File map

- `index.html` — home, overview, technology areas, events, FAQs, and footer.
- `contact.html` — contact form and sponsor section.
- `css/tokens.css` — brand colors, light/dark themes, typography, radii, gradients, and shared design tokens.
- `css/base.css`, `layout.css`, `components.css`, `sections.css`, `responsive.css`, `visual.css` — global styles, responsive components, and the premium visual layer.
- `js/theme.js`, `nav.js`, `preloader.js`, `overview.js`, `events.js`, `faq.js`, `chatbot.js`, `contact.js`, `main.js` — page interactions.

## Editing content

- Event cards: update the `upcomingEvents` and `previousEvents` arrays in `js/events.js`.
- FAQs: edit the FAQ cards in `index.html`; `js/faq.js` supplies the expand/collapse behavior.
- Chat replies: update the keyword/reply entries in `js/chatbot.js`.
- Colors and dark theme: edit the CSS custom properties in `css/tokens.css`.
- Contact demo: the form validates locally and shows a simulated success state; it does not send or store messages.

Illustrations and event poster artwork are CSS-based vector-style artwork in this implementation. Replace them with locally exported files in `assets/` if official Figma exports become available.

## Visual interactions

- The floating navbar, scroll progress line, hero tagline rotation, pointer glow, and card reveals are handled by `js/main.js` and `css/visual.css`.
- The technology cards and previous-event carousel adapt to viewport size; the FAQ keeps its existing `aria-expanded` controls with an animated answer panel.
- Motion-heavy decoration is disabled for `prefers-reduced-motion`. Controls retain keyboard focus styling and accessible names.

## Validation

JavaScript syntax, responsive widths from 320px to 1920px, navigation, theme switching, FAQ collapse, event counters, contact form validation/submission, confetti, and browser console errors were checked during the visual refresh. No Lighthouse executable or audit integration is configured in this dependency-free project, so a Lighthouse score has not been generated.
