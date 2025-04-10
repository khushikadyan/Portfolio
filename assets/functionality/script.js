document.addEventListener('DOMContentLoaded', function() {
    // ========== DOM Elements ==========
    const navbar = document.querySelector('.navbar');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');
    
    // ========== Helper Functions ==========
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const themeIcon = themeToggle.querySelector('i');
        themeIcon.classList.toggle('fa-moon', theme === 'light');
        themeIcon.classList.toggle('fa-sun', theme === 'dark');
    }

    // ========== Navbar Scroll Effect ==========
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ========== Smooth Scrolling ==========
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });

    // ========== Theme Toggle ==========
    if (themeToggle) {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.body.setAttribute('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Toggle theme
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // ========== Scroll Animations ==========
    const animateOnScroll = (elements, animationClass, stagger = false) => {
        if (!elements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    if (stagger) {
                        entry.target.style.transitionDelay = `${0.1 * index}s`;
                    }
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    };

     // Initialize all animations
     animateOnScroll(document.querySelectorAll('.animate-on-scroll, .resume-timeline-item, .service-item, .skill-category'), 'visible', true);
     animateOnScroll(document.querySelectorAll('.skill-pill'), 'visible', true);

    // ========== Contact Form ==========
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});