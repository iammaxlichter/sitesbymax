/* =========================================================
   SITES BY MAX: mobile nav toggle (shared across pages)
   ========================================================= */

const navToggle = document.getElementById("navToggle");
const navHeader = navToggle ? navToggle.closest(".top") : null;

if (navToggle && navHeader) {
  function setNavOpen(open) {
    navHeader.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", () => {
    setNavOpen(!navHeader.classList.contains("nav-open"));
  });

  navHeader.querySelectorAll(".top-links a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navHeader.classList.contains("nav-open")) {
      setNavOpen(false);
      navToggle.focus();
    }
  });
}
