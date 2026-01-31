// ==========================================
// CYBERPUNK LANDING PAGE - JAVASCRIPT
// ==========================================

// Navigation scroll effects
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 0 30px rgba(255, 107, 174, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    // Update active nav link based on scroll position
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
    });
});

// CTA Button interactions
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Gallery item interactions
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });

    item.addEventListener('click', function() {
        // Add click animation
        const card = this.querySelector('.item-card');
        card.style.animation = 'pulse 0.6s ease';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    });
});

// Stat cards counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-section');
let hasAnimated = false;

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

window.addEventListener('scroll', () => {
    if (!hasAnimated && statsSection.getBoundingClientRect().top < window.innerHeight) {
        hasAnimated = true;
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text);
            animateCounter(stat, number);
        });
    }
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Smooth scroll implementation
        document.body.style.scrollBehavior = 'smooth';
    });
});

// Add glow effect to elements on mouse move
document.addEventListener('mousemove', (e) => {
    const glowElements = document.querySelectorAll('.card-glow');
    
    glowElements.forEach(glow => {
        const rect = glow.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = (x - 200) + 'px';
        glow.style.top = (y - 200) + 'px';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items and stat cards
document.querySelectorAll('.gallery-item, .stat-card, .about-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Parallax scroll effect for hero section
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Log initialization
    console.log('🌸 NEXUS Digital Art Gallery loaded successfully');
});
