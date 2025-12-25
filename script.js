// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible'; // Ensure scrolling is enabled
    }, 800); // Slight delay to show off the loader
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;

    // Back to Top Button Visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to Top functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        themeToggle.classList.remove('bg-gray-800', 'hover:bg-gray-700');
        themeToggle.classList.add('bg-gray-200', 'hover:bg-gray-300');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        themeToggle.classList.remove('bg-gray-200', 'hover:bg-gray-300');
        themeToggle.classList.add('bg-gray-800', 'hover:bg-gray-700');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // Add animation class
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';


        }
    });
}, observerOptions);


// Observe all sections and cards
document.querySelectorAll('section, .faq-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add 3D Tilt Effect to Cards via JS (Dynamic)
document.querySelectorAll('.card-tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Rotate X based on Y position
        const rotateY = ((x - centerX) / centerX) * 5;  // Rotate Y based on X position

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});


// YouTube hover play (desktop only)
// Kept simple URL replace logic for consistency if needed, but previously removed.
// If iframe is present, we can leave it as click-to-play.

// FAQ Touch Interactions (Mobile Support)
// Adds click-to-toggle functionality for properly working dropdowns on mobile

// 1. Main FAQ Items
// 1. Main FAQ Items
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // Record state BEFORE we manipulate classes
        const wasActive = item.classList.contains('active');

        // Always close ALL items first (Accordion behavior)
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // If it wasn't active before, open it now.
        // If it WAS active, we leave it closed (effectively toggling off).
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// 2. Nested FAQ Items
document.querySelectorAll('.nested-faq-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // Stop the click from bubbling up to the parent FAQ item
        e.stopPropagation();

        // Record state
        const wasActive = item.classList.contains('active');

        // Close all sibling items first
        const siblings = item.parentElement.querySelectorAll('.nested-faq-item');
        siblings.forEach(sibling => {
            sibling.classList.remove('active');
        });

        // If it wasn't active before, open it now
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});
