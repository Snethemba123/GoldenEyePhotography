document.addEventListener("DOMContentLoaded", function () {

  // ----- Mobile Menu Toggle -----
  (function () {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
      });
    });
  })();

  // ----- Mobile Dropdowns -----
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(drop => {
    const button = drop.querySelector(".dropbtn");
    if (!button) return; 

    button.addEventListener("click", function (e) {
      if (window.innerWidth < 769) {
        e.preventDefault();

        dropdowns.forEach(d => {
          if (d !== drop) d.classList.remove("open-dropdown");
        });document.addEventListener("DOMContentLoaded", function () {

  // ----- Mobile Menu Toggle -----
  (function () {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
      });
    });
  })();

  // ----- Mobile Dropdowns -----
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(drop => {
    const button = drop.querySelector(".dropbtn");
    if (!button) return; 

    button.addEventListener("click", function (e) {
      if (window.innerWidth < 769) {
        e.preventDefault();

        dropdowns.forEach(d => {
          if (d !== drop) d.classList.remove("open-dropdown");
        });

        drop.classList.toggle("open-dropdown");
      }
    });
  });

  // ----- Click outside closes dropdown -----
  document.addEventListener("click", function (e) {
    if (window.innerWidth < 769) {
      dropdowns.forEach(drop => {
        if (!drop.contains(e.target)) {
          drop.classList.remove("open-dropdown");
        }
      });
    }
  });

});

        drop.classList.toggle("open-dropdown");
      }
    });
  });

  // ----- Click outside closes dropdown -----
  document.addEventListener("click", function (e) {
    if (window.innerWidth < 769) {
      dropdowns.forEach(drop => {
        if (!drop.contains(e.target)) {
          drop.classList.remove("open-dropdown");
        }
      });
    }
  });

});
