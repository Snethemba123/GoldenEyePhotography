document.addEventListener("DOMContentLoaded", function () {

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

  // Enable dropdown tapping on mobile
  document.querySelectorAll(".dropdown > a").forEach(dropBtn => {
    dropBtn.addEventListener("click", function (e) {
      const parent = this.parentElement;

      // Mobile only
      if (window.innerWidth < 769) {
        e.preventDefault(); // prevent link from opening Portfolio page
        parent.classList.toggle("open-dropdown");
      }
    });
  });

});
