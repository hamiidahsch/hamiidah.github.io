// Loading screen
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if (loader) loader.classList.add('fade-out');
    }, 1000);
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Scroll animation (fade-up)
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

// Project filter (jika ada)
const filterBtns = document.querySelectorAll('.filter-btn');
const ProjectItems = document.querySelectorAll('.Project-item');
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            ProjectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// ========== FITUR GANTI TEMA (UNGU / BIRU) ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const toggleText = document.querySelector('.toggle-text');

// Load saved theme dari localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'blue') {
    body.classList.add('theme-blue');
    if (toggleText) toggleText.textContent = 'Mode Ungu';
} else {
    // default ungu
    if (toggleText) toggleText.textContent = 'Mode Biru';
}

// Event klik tombol
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('theme-blue');
        if (body.classList.contains('theme-blue')) {
            localStorage.setItem('theme', 'blue');
            if (toggleText) toggleText.textContent = 'Mode Ungu';
        } else {
            localStorage.setItem('theme', 'purple');
            if (toggleText) toggleText.textContent = 'Mode Biru';
        }
    });
}

// Optional: handling form submission & project links (disesuaikan dengan kebutuhan Anda)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim (demo).');
        contactForm.reset();
    });
}

// Untuk tombol view project (jika ada)
document.querySelectorAll('.Project-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Link demo belum tersedia.');
    });
});
