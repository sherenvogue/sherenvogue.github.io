function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#000';
    } else {
        navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)';
    }
});
