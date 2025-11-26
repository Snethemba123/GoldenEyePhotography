// Mobile menu toggle
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });

  // Close menu when clicking a link
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
})();
