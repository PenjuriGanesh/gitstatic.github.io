// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    themeToggle.innerHTML = body.classList.contains('light') ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// Load Theme from LocalStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling and Active Section Highlight
const navLinksItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        if (navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Scroll-to-Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = scrollY > 200 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for Animations
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

elementsToAnimate.forEach(el => observer.observe(el));

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portfolio Modal
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content img');
const modalTitle = document.querySelector('.modal-content h3');
const modalClose = document.querySelector('.modal .close');

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.portfolio-item');
        modalImg.src = item.querySelector('img').src;
        modalTitle.textContent = item.querySelector('h3').textContent;
        modal.style.display = 'flex';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Testimonial Carousel
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    testimonials[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Contact Form Validation
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        valid = false;
    } else {
        nameInput.classList.remove('error');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        valid = false;
    } else {
        emailInput.classList.remove('error');
    }

    if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        valid = false;
    } else {
        messageInput.classList.remove('error');
    }

    if (valid) {
        alert('Form submitted successfully!');
        form.reset();
    }
});

// Form Input Animation
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});