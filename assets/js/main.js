document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Replace your ScrollReveal code with this:
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '30px',
        duration: 1000,
        reset: true
    });

    // Exclude chart containers from animation
    scrollReveal.reveal('.sdg-card, .asean-content, .finding-card', {
        interval: 200
    });
});

// Create theme switcher button
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = `
        <button class="theme-btn">
            <i class="fas fa-sun sun-icon"></i>
            <i class="fas fa-moon moon-icon"></i>
        </button>
    `;
    document.body.appendChild(themeSwitcher);
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
    
    // Update button state based on current theme
    function updateButtonState() {
        const isDark = document.body.classList.contains('dark-mode');
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (isDark) {
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'scale(0.5) rotate(90deg)';
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'scale(1) rotate(0deg)';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'scale(1) rotate(0deg)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'scale(0.5) rotate(-90deg)';
        }
    }
    
    // Initialize button state
    updateButtonState();
    
    // Theme toggle event listener
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateButtonState();
    });