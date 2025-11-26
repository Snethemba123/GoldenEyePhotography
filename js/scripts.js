/* Start of JavaScript content for js/script.js */
document.addEventListener('DOMContentLoaded', function() {


    // Portfolio Album Filtering Logic
    const portfolioAlbums = document.querySelectorAll('.portfolio-album');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    const portfolioMainLink = document.querySelector('li.dropdown > .dropbtn');

    // Function to hide all portfolio albums
    function hideAllAlbums() {
        portfolioAlbums.forEach(album => {
            album.style.display = 'none';
        });
    }

    // Function to show a specific portfolio album by its ID
    function showAlbum(id) {
        hideAllAlbums(); // Hide all first
        const targetAlbum = document.getElementById(id);
        if (targetAlbum) {
            targetAlbum.style.display = 'block'; // Show the selected album
            // Optional: Scroll smoothly to the album
            targetAlbum.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Function to show all portfolio albums
    function showAllAlbums() {
        portfolioAlbums.forEach(album => {
            album.style.display = 'block'; // Show all albums
        });
        // Optional: Scroll to the main portfolio section title
        const mainPortfolioSection = document.getElementById('portfolio');
        if (mainPortfolioSection) {
            mainPortfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Event listener for each dropdown link (Umemulo, Wedding, etc.)
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Stop the default jump to the hash
            const targetId = this.getAttribute('href').split('#')[1]; // Get the ID (e.g., "umemolo-album")
            showAlbum(targetId); // Show only that album

            // Update URL hash for bookmarking/back button support without jumping
            history.pushState(null, '', '#' + targetId);
        });
    });

    // Event listener for the main "Portfolio" button (`dropbtn`)
    if (portfolioMainLink) {
        portfolioMainLink.addEventListener('click', function(event) {
            // This condition ensures that clicking the main 'Portfolio' link (dropbtn)
            // when it's the *target* of the click (not just hovering)
            // will show all albums.
            if (event.target === this) {
                // Check if the current page is indeed portfolio.html
                if (window.location.pathname.endsWith('portfolio.html') || window.location.pathname.endsWith('portfolio.html/')) {
                    event.preventDefault(); // Prevent default link behavior if we're handling it
                    showAllAlbums(); // Show all albums
                    // Clear the URL hash if navigating back to general portfolio view
                    history.pushState(null, '', window.location.pathname);
                }
            }
        });
    }

    // Logic for initial page load and browser back/forward buttons
    function handleInitialLoadAndPopState() {
        if (window.location.hash) {
            // If there's a hash in the URL (e.g., #umemolo-album), show only that album
            const initialAlbumId = window.location.hash.substring(1); // Remove the '#'
            showAlbum(initialAlbumId);
        } else {
            // If no hash (e.g., just portfolio.html), show all albums
            showAllAlbums();
        }
    }

    // Run this logic when the page first loads
    window.addEventListener('load', handleInitialLoadAndPopState);

    // Run this logic when the browser's back/forward buttons are used
    window.addEventListener('popstate', handleInitialLoadAndPopState);

    // Form submission (placeholder)
    const bookingForm = document.querySelector('.booking-form');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            console.log('Form submitted!');

            // Simulate success or error for demonstration
            const simulateSuccess = true; // Change to false to test error

            if (simulateSuccess) {
                successMessage.textContent = 'Booking request sent successfully! We will contact you soon.';
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                bookingForm.reset(); // Clear the form
            } else {
                errorMessage.textContent = 'There was an error sending your request. Please try again.';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }

            // Hide the messages after a few seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                errorMessage.style.display = 'none';
            }, 5000); // Hide after 5 seconds
        });
    }
});
/* End of JavaScript content for js/script.js */
