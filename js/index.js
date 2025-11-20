document.addEventListener('DOMContentLoaded', () => {
    // Select the new button and the nav list using the ID
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('#main-nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            
            // 1. Toggle the visual class 'nav-open' on the UL/NAV element
            navList.classList.toggle('nav-open'); 

            // 2. Toggle the ARIA expanded state for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
});
