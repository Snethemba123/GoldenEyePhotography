document.addEventListener('DOMContentLoaded', function () {

    // 1. SELECTORS
    const menuToggle = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const dropdowns = document.querySelectorAll('.dropdown');

    // 2. MOBILE MENU TOGGLE
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('nav-open');
        });
    }

    // 3. DROPDOWN LOGIC (Mobile Only)
    dropdowns.forEach(drop => {
        const dropBtn = drop.querySelector('.dropbtn');
        if (dropBtn) {
            dropBtn.addEventListener('click', function (e) {
                if (window.innerWidth < 769) {
                    // Check if we're clicking the same dropdown that's already open
                    const isOpen = drop.classList.contains('open-dropdown');
                    
                    if (!isOpen) {
                        e.preventDefault();
                        e.stopPropagation();
                        // Close others
                        dropdowns.forEach(other => other.classList.remove('open-dropdown'));
                        // Open this one
                        drop.classList.add('open-dropdown');
                    }
                }
            });
        }
    });

    // 4. PORTFOLIO ALBUM FILTER
    const portfolioAlbums = document.querySelectorAll('.portfolio-album');
    const navLinks = document.querySelectorAll('#main-nav a');

    function showAlbum(albumId) {
        if (!albumId || portfolioAlbums.length === 0) return;
        
        // Remove the '#' if the ID came from a hash
        const cleanId = albumId.replace('#', '');
        const targetAlbum = document.getElementById(cleanId);

        if (targetAlbum) {
            // Hide all albums
            portfolioAlbums.forEach(album => {
                album.style.display = 'none';
                album.classList.remove('active');
            });

            // Show target
            targetAlbum.style.display = 'block';
            targetAlbum.classList.add('active');
        }
    }

    // Handle clicks for filtering
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const id = href.split('#')[1];
                if (document.getElementById(id)) {
                    // Only prevent default if we are on the portfolio page
                    if (window.location.pathname.includes('portfolio.html') || portfolioAlbums.length > 0) {
                        e.preventDefault();
                        showAlbum(id);
                        // Close menu on mobile after selection
                        mainNav.classList.remove('nav-open');
                        dropdowns.forEach(d => d.classList.remove('open-dropdown'));
                    }
                }
            }
        });
    });

    // 5. CLICK OUTSIDE TO CLOSE
    document.addEventListener('click', (e) => {
        if (mainNav && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('nav-open');
        }
        dropdowns.forEach(d => {
            if (!d.contains(e.target)) d.classList.remove('open-dropdown');
        });
    });

    // 6. INITIAL LOAD (Keeping your specific names)
    const currentHash = window.location.hash;
    if (currentHash && document.querySelector(currentHash)) {
        showAlbum(currentHash);
    } else if (portfolioAlbums.length > 0) {
        // Defaulting to your spelling: "umemolo-album"
        showAlbum('umemolo-album'); 
    }
});
