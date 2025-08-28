// Page navigation
function showPage(event, pageId) {
    if (event && event.preventDefault) event.preventDefault();

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-medical-dark');
        link.classList.add('text-gray-600');
    });

    if (event && event.target) {
        event.target.classList.remove('text-gray-600');
        event.target.classList.add('text-medical-dark');
    }

    window.scrollTo(0, 0);

    setTimeout(() => {
        observeElements();
    }, 100);
}

// Intersection Observer for animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        const hasDollar = counter.textContent.trim().startsWith('$');
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (hasDollar) {
                    counter.textContent = '$' + Math.ceil(current).toLocaleString();
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (hasDollar) {
                    counter.textContent = '$' + target.toLocaleString() + '+';
                } else {
                    counter.textContent = target.toLocaleString() + '+';
                }
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Form submission
function setupFormHandler() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameInput = form.querySelector('input[type="text"]');
        const name = nameInput ? nameInput.value : '';

        if (name.trim() === '') {
            alert('Please enter your name.');
            return;
        }

        const button = form.querySelector('button[type="submit"]');
        const originalText = button ? button.textContent : '';
        if (button) {
            button.textContent = 'Message Sent! ✓';
            button.style.background = '#10B981';
        }
        
        setTimeout(() => {
            if (button) {
                button.textContent = originalText;
                button.style.background = '';
            }
            form.reset();
        }, 3000);
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileMenuBtn) return;

    mobileMenuBtn.addEventListener('click', function() {
        alert('Mobile menu - would show navigation options');
    });
}

// Smooth scrolling for anchor links
function setupSmoothScroll() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target && target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(target.getAttribute('href'));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    observeElements();
    animateCounters();
    setupFormHandler();
    setupMobileMenu();
    setupSmoothScroll();
}); 