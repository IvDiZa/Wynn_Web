// script.js - Handles active navigation state and any interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    // Remove active class from all nav items and set based on current page
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('nav-active');
        
        // Check which page we're on and set active accordingly
        if ((page === 'index.html' || page === '' || page === '/') && item.getAttribute('href') === 'index.html') {
            item.classList.add('nav-active');
        } else if (page === 'about.html' && item.getAttribute('href') === 'about.html') {
            item.classList.add('nav-active');
        } else if (page === 'web1.html' && item.getAttribute('href') === 'web1.html') {
            item.classList.add('nav-active');
        } else if (page === 'web2.html' && item.getAttribute('href') === 'web2.html') {
            item.classList.add('nav-active');
        } else if (page === 'web3.html' && item.getAttribute('href') === 'web3.html') {
            item.classList.add('nav-active');
        }
    });

    // Add smooth transitions for logo-strip items
    const logoItems = document.querySelectorAll('.logo-strip i');
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s ease-in-out';
        });
    });

    // Optional: Add a simple console message
    console.log('Web Evolution site loaded - exploring the eras of the web');
});

// Optional: Add keyboard navigation hint
window.addEventListener('load', function() {
    console.log('Use the navigation bar to explore Web 1.0, 2.0, and 3.0');
});
