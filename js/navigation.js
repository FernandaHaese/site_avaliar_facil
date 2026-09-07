const navigation = document.querySelector('.nav');
const toggle = navigation.querySelector('.menu-toggle');
const links = navigation.querySelector('.nav-links');
const mobile = window.matchMedia('(max-width: 900px)');

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menu';
}

toggle.hidden = false;
navigation.classList.add('has-menu');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(expanded));
  toggle.textContent = expanded ? 'Fechar' : 'Menu';
});

links.addEventListener('click', (event) => {
  if (event.target.closest('a') && mobile.matches) {
    closeMenu();
    toggle.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target)) closeMenu();
});

mobile.addEventListener('change', () => {
  const focused = document.activeElement;
  closeMenu();
  if (mobile.matches && links.contains(focused)) toggle.focus();
  if (!mobile.matches && focused === toggle) links.querySelector('a').focus();
});
