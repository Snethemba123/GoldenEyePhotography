document.addEventListener('DOMContentLoaded', function () {

    // ----- 1. Mobile Menu Toggle (The Hamburger) -----
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('nav-open');
        });
    }

    // ----- 2. Mobile Dropdowns (The "Click to Open" Fix) -----
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(drop => {
        const dropBtn = drop.querySelector('.dropbtn');
        
        if (dropBtn) {
            dropBtn.addEventListener('click', function (e) {
                // Only run this logic on mobile screens
                if (window.innerWidth < 769) {
                    // Prevent the link from jumping to a new page immediately
                    e.preventDefault();
                    e.stopPropagation();

                    // Close any OTHER open dropdowns first
                    dropdowns.forEach(other => {
                        if (other !== drop) other.classList.remove('open-dropdown');
                    });

                    // Toggle THIS dropdown
                    drop.classList.toggle('open-dropdown');
                }
            });
        }
    });

    // ----- 3. Close Menu when clicking a final link -----
    const navLinks = mainNav.querySelectorAll('a:not(.dropbtn)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('nav-open');
            dropdowns.forEach(d => d.classList.remove('open-dropdown'));
        });
    });

    // ----- 4. Click Outside to Close Everything -----
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('nav-open');
            dropdowns.forEach(d => d.classList.remove('open-dropdown'));
        }
    });

    // ----- 5. Portfolio Album Filter -----
    const portfolioAlbums = document.querySelectorAll('.portfolio-album');
    const portfolioFilterLinks = document.querySelectorAll('.portfolio-filter-link');

    function showAlbum(albumId) {
        if (!albumId) return;
        
        portfolioAlbums.forEach(album => {
            album.style.display = 'none';
            album.classList.remove('active');
        });

        const targetAlbum = document.getElementById(albumId);
        if (targetAlbum) {
            targetAlbum.style.display = 'block';
            targetAlbum.classList.add('active');
        }

        portfolioFilterLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.albumId === albumId);
        });
    }

    portfolioFilterLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.dataset.albumId;
            showAlbum(id);
            history.pushState(null, null, '#' + id);
        });
    });

    // Initial Load
    const hash = window.location.hash.substring(1);
    if (hash) {
        showAlbum(hash);
    } else if (portfolioAlbums.length > 0) {
        showAlbum('umemulo-album'); // Default
    }

});
