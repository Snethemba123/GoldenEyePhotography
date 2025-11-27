document.addEventListener('DOMContentLoaded', function () {

    // ----- Mobile Menu Toggle -----
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });

        // Close mobile menu when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                }
            });
        });
    }

    // ----- Mobile Dropdowns -----
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(drop => {
        const dropBtn = drop.querySelector('.dropbtn');
        if (!dropBtn) return;

        dropBtn.addEventListener('click', function (e) {
            if (window.innerWidth < 769) {
                e.preventDefault(); // Prevent default link click

                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== drop) d.classList.remove('open-dropdown');
                });

                // Toggle current dropdown
                drop.classList.toggle('open-dropdown');
            }
        });
    });

    // ----- Click outside closes mobile dropdown -----
    document.addEventListener('click', function (e) {
        if (window.innerWidth < 769) {
            dropdowns.forEach(drop => {
                if (!drop.contains(e.target)) {
                    drop.classList.remove('open-dropdown');
                }
            });
        }
    });

});



    const portfolioAlbums = document.querySelectorAll('.portfolio-album');
    const portfolioFilterLinks = document.querySelectorAll('.portfolio-filter-link');

    function showAlbum(albumId) {
        portfolioAlbums.forEach(album => {
            album.classList.remove('active');
            album.style.display = 'none';
            const description = album.querySelector('.album-description');
            if (description) description.style.display = 'none';
        });

        const targetAlbum = document.getElementById(albumId);
        if (targetAlbum) {
            targetAlbum.classList.add('active');
            targetAlbum.style.display = 'block';
            const description = targetAlbum.querySelector('.album-description');
            if (description) description.style.display = 'block';
        }

        portfolioFilterLinks.forEach(link => {
            if (link.dataset.albumId === albumId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function handleInitialLoad() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showAlbum(hash);
        } else {
            showAlbum('umemulo-album'); // default album
            history.replaceState(null, null, '#umemulo-album');
        }
    }

    // Portfolio link click
    portfolioFilterLinks.forEach(link => {
        link.addEventListener('click', function () {
            const albumId = this.dataset.albumId;
            if (window.location.hash.substring(1) !== albumId) {
                history.pushState(null, null, `#${albumId}`);
            }
            showAlbum(albumId);

            // Close mobile menu if open
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', handleInitialLoad);

    // Initial load
    handleInitialLoad();


    const bookingForm = document.querySelector('.booking-form');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const simulateSuccess = true; // change to false to test error

            if (simulateSuccess) {
                successMessage.textContent = 'Booking request sent successfully! We will contact you soon.';
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                bookingForm.reset();
            } else {
                errorMessage.textContent = 'There was an error sending your request. Please try again.';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }

            setTimeout(() => {
                successMessage.style.display = 'none';
                errorMessage.style.display = 'none';
            }, 5000);
        });
    }
});
