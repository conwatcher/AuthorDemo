/* ==========================================================================
   T.R. Dailey — site behaviour

   This is the only JavaScript on the site, and it does exactly one thing:
   collapse the navigation into a menu button on small screens.

   No content is rendered by JavaScript. Every word on this site is in the
   HTML, so the pages work fully with JavaScript turned off, load without a
   flash of empty layout, and are readable by search engines as-is.
   ========================================================================== */

(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".nav-toggle__label").textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Escape closes the menu and returns focus to the button.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // If the viewport grows past the breakpoint while the menu is open, reset it
  // so the desktop layout is never left in an "open" state.
  var wide = window.matchMedia("(min-width: 46em)");
  var onChange = function (event) {
    if (event.matches) setOpen(false);
  };
  if (wide.addEventListener) wide.addEventListener("change", onChange);
  else if (wide.addListener) wide.addListener(onChange);
})();
