const navigation = document.querySelector(".nav");
const toggle = navigation.querySelector(".menu-toggle");
const links = navigation.querySelector(".nav-links");
const mobile = window.matchMedia("(max-width: 900px)");
function closeMenu() {
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
  if (toggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target)) closeMenu();
});
navigation.addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (!navigation.contains(document.activeElement)) closeMenu();
  });
});
mobile.addEventListener("change", () => {
  const focused = document.activeElement;
  closeMenu();
  if (mobile.matches && links.contains(focused)) toggle.focus();
  if (!mobile.matches && focused === toggle) links.querySelector("a").focus();
});
