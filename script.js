// --- SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = document.getElementById('navbar').offsetHeight;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

// --- TYPEWRITER EFFECT ---
const textArray = [
    "HELLO, I'M KAUSTAV HALDER.",
    "BTECH CSE '29 @ MANIPAL UNIVERSITY JAIPUR.",
    "AIML ENTHUSIAST.",
    "ASPIRING SOFTWARE DEVELOPER."
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typewriterElement = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typewriterElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, 500);

    // --- CUSTOM CURSOR ---
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Dot snaps instantly
        dotX = mouseX;
        dotY = mouseY;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
    });

    // Ring lags with lerp
    (function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    })();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll(
        'a, button, .btn, .skill-badge, .project-card, .achievement-card, .nav-logo, input, textarea'
    );
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Click burst
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));


    // --- DARK MODE TOGGLE ---
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const moonIcon = document.getElementById('icon-moon');
    const sunIcon = document.getElementById('icon-sun');

    // Restore saved preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        moonIcon.style.display = isDark ? 'none' : 'block';
        sunIcon.style.display = isDark ? 'block' : 'none';
    });

    // --- BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- EMAILJS CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default page refresh

            // Change button text to show it's working
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            // These IDs from the previous steps
            const serviceID = 'service_2f0e1zq';
            const templateID = 'template_ee1x8dq';

            // Send the form using EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitBtn.textContent = 'Message Sent!';
                    contactForm.reset();

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, (error) => {
                    submitBtn.textContent = 'Error! Try Again.';
                    submitBtn.disabled = false;
                    console.log('FAILED...', error);
                    alert("Something went wrong while sending the message. Check console for details.");
                });
        });
    }
});
