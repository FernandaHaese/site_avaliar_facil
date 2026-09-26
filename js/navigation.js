const navigation = document.querySelector(".nav");
const toggle = navigation.querySelector(".menu-toggle");
const links = navigation.querySelector(".nav-links");
const audience = navigation.querySelector(".nav-audience");
const mobile = window.matchMedia("(max-width: 900px)");
function closeMenu() {
  audience.open = false;
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "Menu";
}
toggle.hidden = false;
navigation.classList.add("has-menu");
closeMenu();
toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.textContent = expanded ? "Fechar" : "Menu";
  if (!expanded) audience.open = false;
});
links.addEventListener("click", (event) => {
  const anchor = event.target.closest("a");
  if (!anchor) return;
  const target = document.getElementById(anchor.hash.slice(1));
  closeMenu();
  if (target) {
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (audience.open) {
    audience.open = false;
    audience.querySelector("summary").focus();
    return;
  }
  if (toggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target)) closeMenu();
  else if (!audience.contains(event.target)) audience.open = false;
});
navigation.addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (!navigation.contains(document.activeElement)) closeMenu();
    else if (!audience.contains(document.activeElement)) audience.open = false;
  });
});
mobile.addEventListener("change", () => {
  const focused = document.activeElement;
  closeMenu();
  if (mobile.matches && links.contains(focused)) toggle.focus();
  if (!mobile.matches && (focused === toggle || audience.contains(focused))) links.querySelector("a").focus();
});
