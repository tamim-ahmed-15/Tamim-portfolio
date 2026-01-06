// DOM ELEMENTS

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// HAMBURGER MENU TOGGLE

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ACTIVE NAV LINK ON SCROLL

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Show/hide back to top button
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});


// BACK TO TOP BUTTON

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// SCROLL ANIMATIONS 

document.addEventListener('DOMContentLoaded', () => {
    // 1. Define the Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 2. Select elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.about-text, .about-image, .skill-category, .project-card, .experience-column, .contact-info, .contact-form'
    );

    // 3. Add class AND observe immediately
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});


// CONTACT FORM HANDLING

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple Validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Show success message
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
    });
}


// NOTIFICATION SYSTEM

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00d4ff' : '#ff006e'};
        color: #0a0e27;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, opacity 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


// SMOOTH SCROLL FOR ANCHOR LINKS

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});


// SKILL PROGRESS ANIMATION

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.skill-progress').forEach(bar => {
                    // Force a reflow to restart animation
                    bar.style.animation = 'none';
                    bar.offsetHeight; 
                    bar.style.animation = 'expandWidth 1.5s ease-out forwards';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
}


// TYPING ANIMATION

const typeWriterEffect = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Simple fade in check if typing is too complex/buggy
    heroTitle.style.opacity = 1;
};
window.addEventListener('load', typeWriterEffect);