
/* =========================================
   1. NAVIGASI AKTIF
========================================= */

const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const header = document.querySelector('header');

function setActiveNavigation(sectionId) {

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }

    });

}


/* =========================================
   2. NAVIGASI SAAT MENU DIKLIK
========================================= */

navLinks.forEach(link => {

    link.addEventListener('click', function() {

        const targetId = this.getAttribute('href').substring(1);

        setActiveNavigation(targetId);

    });

});


/* =========================================
   3. NAVIGASI MENGIKUTI SCROLL
========================================= */

function updateActiveNavigation() {

    let currentSection = '';

    const scrollPosition =
        window.scrollY + header.offsetHeight + 100;

    sections.forEach(section => {

        if (section.offsetTop <= scrollPosition) {
            currentSection = section.getAttribute('id');
        }

    });

    // Jika sudah mencapai bagian paling bawah halaman
    if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5
    ) {
        currentSection = sections[sections.length - 1].id;
    }

    if (currentSection) {
        setActiveNavigation(currentSection);
    }

}

window.addEventListener('scroll', updateActiveNavigation, {
    passive: true
});


/* =========================================
   4. NAVBAR SAAT SCROLL
========================================= */

window.addEventListener('scroll', function() {

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

}, { passive: true });


/* =========================================
   5. ANIMASI MUNCUL SAAT SCROLL
========================================= */

const revealElements = document.querySelectorAll(`
    .section-title,
    .section-description,
    .skill-card,
    .timeline-item,
    .project-card,
    #kemampuan .skill-item,
    .contact-detail,
    .organization-section
`);

revealElements.forEach(element => {
    element.classList.add('reveal');
});

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(element => {
    observer.observe(element);
});


/* =========================================
   6. EFEK ANIMASI KARTU
========================================= */

const cards = document.querySelectorAll(`
    .skill-card,
    .project-card,
    #kemampuan .skill-item,
    .contact-detail
`);

cards.forEach(card => {

    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });

});


/* =========================================
   7. ANIMASI PROGRESS BAR
   Jika menggunakan progress bar lama
========================================= */

const progressBars = document.querySelectorAll('.progress-bar');

const progressObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const bar = entry.target;

            const width = bar.getAttribute('data-width') ||
                          bar.style.width;

            bar.style.width = '0';

            requestAnimationFrame(() => {
                bar.style.width = width;
            });

            progressObserver.unobserve(bar);

        }

    });

}, {
    threshold: 0.5
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});


/* =========================================
   8. EFEK TOMBOL LINK
========================================= */

const allButtons = document.querySelectorAll(
    '.project-info a, .contact-detail a'
);

allButtons.forEach(button => {

    button.addEventListener('mouseenter', function() {
        this.style.transition = '0.3s ease';
    });

});


/* =========================================
   9. TAHUN FOOTER OTOMATIS
========================================= */

const footerText = document.querySelector('footer p');

if (footerText) {

    footerText.textContent =
        `© Dela Latipah ${new Date().getFullYear()}. Hak cipta dilindungi.`;

}


/* =========================================
   10. UPDATE NAVIGASI SAAT HALAMAN DIBUKA
========================================= */

window.addEventListener('load', function() {

    updateActiveNavigation();

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

});
