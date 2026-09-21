// Navigation stays visible if JavaScript is unavailable.
const navbar = document.querySelector('.navbar');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileScreen = window.matchMedia('(max-width: 760px)');

function setMenuOpen(isOpen) {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    navLinks.classList.toggle('is-open', isOpen);
}

menuButton.hidden = false;
navbar.classList.add('menu-ready');
menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});
navLinks.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && mobileScreen.matches) {
        setMenuOpen(false);
        // Focus the destination instead of leaving focus in the hidden menu.
        const section = document.querySelector(link.getAttribute('href'));
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuButton.focus();
    }
});
document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target)) setMenuOpen(false);
});
mobileScreen.addEventListener('change', () => setMenuOpen(false));
