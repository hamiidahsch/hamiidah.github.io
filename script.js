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
        
        // Update active class
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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const ProjectItems = document.querySelectorAll('.Project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        ProjectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========== FITUR KLIK GAMBAR & LINK PROJECT ==========
// Membuat semua gambar project dan tombol link bisa diklik

// 1. Fungsi untuk membuka link di tab baru
function openLink(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        alert('Demo link belum tersedia. Silakan cek kembali nanti.');
    }
}

// 2. Event listener untuk seluruh project image (gambar bisa diklik)
document.querySelectorAll('.Project-item').forEach(item => {
    const imageElement = item.querySelector('.Project-image img');
    const viewBtn = item.querySelector('.view-project');
    const demoBtn = item.querySelector('.demo-link');
    
    // Ambil link dari tombol view atau demo
    let projectLink = null;
    if (viewBtn && viewBtn.getAttribute('data-link') && viewBtn.getAttribute('data-link') !== '#') {
        projectLink = viewBtn.getAttribute('data-link');
    } else if (demoBtn && demoBtn.getAttribute('data-demo') && demoBtn.getAttribute('data-demo') !== '#') {
        projectLink = demoBtn.getAttribute('data-demo');
    }
    
    // Jika gambar diklik, buka link project
    if (imageElement && projectLink) {
        imageElement.style.cursor = 'pointer';
        imageElement.addEventListener('click', (e) => {
            e.stopPropagation();
            openLink(projectLink);
        });
    } else if (imageElement) {
        imageElement.style.cursor = 'pointer';
        imageElement.addEventListener('click', () => {
            alert('Klik tombol "View" atau "Demo" untuk melihat detail project ini.');
        });
    }
    
    // 3. Event untuk tombol View Project
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const link = viewBtn.getAttribute('data-link');
            if (link && link !== '#') {
                openLink(link);
            } else {
                const projectName = viewBtn.getAttribute('data-project') || 'Project';
                alert(`Link untuk ${projectName} akan segera tersedia.`);
            }
        });
    }
    
    // 4. Event untuk tombol Demo / External Link
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const link = demoBtn.getAttribute('data-demo');
            if (link && link !== '#') {
                openLink(link);
            } else {
                alert('Demo preview belum tersedia.');
            }
        });
    }
});

// 5. Contact form submission with validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;
        
        if (name && email && message) {
            alert(`Terima kasih ${name}! Pesan Anda telah terkirim. Saya akan menghubungi Anda segera ke ${email}.`);
            contactForm.reset();
        } else {
            alert('Harap isi semua kolom (Nama, Email, Pesan).');
        }
    });
}

// 6. Button click handlers for anchor links (View Project & Let's Talk)
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 7. Membuat contact card juga bisa diklik (Email, Telp, Instagram)
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Jangan trigger jika yang diklik adalah link di dalamnya (sudah ter-handle oleh tag a)
        if (card.tagName === 'A') return;
        
        const emailCard = card.querySelector('i.fa-envelope');
        const phoneCard = card.querySelector('i.fa-phone-alt');
        const instaCard = card.querySelector('i.fa-instagram');
        
        if (emailCard) {
            window.location.href = 'mailto:hamiidah.sch@gmail.com';
        } else if (phoneCard) {
            window.location.href = 'tel:+6289516456188';
        } else if (instaCard) {
            window.open('https://www.instagram.com/hami.idahhhhh/', '_blank');
        }
    });
});

// 8. Inisialisasi ulang style untuk project items
ProjectItems.forEach(item => {
    item.style.display = 'block';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
});

console.log('Portfolio website loaded - Images and links are clickable!');