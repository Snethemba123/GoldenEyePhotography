(function() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Optional: close menu when clicking a link (mobile UX)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
