// Mobile Menu Toggle Logic
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
    });

    // Close nav when a link is clicked (for mobile menu)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav-open');
        });
    });
}