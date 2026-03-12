/**
 * ============================================================================
 * SCRIPT PRINCIPAL — Portfolio Awwwards-Style de Joel Paredes
 * Scroll Reveals, Typing Effect, Particles, Navbar, Mobile Menu
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────
// 1. TYPING EFFECT
// ─────────────────────────────────────────────────────────────
const typedTextSpan = document.getElementById("typed-output");

const wordsArray = [
    "Analista de Sistemas",
    "Desarrollador Web",
    "Entusiasta de la IA",
    "Soporte Técnico & Streaming",
    "Freelancer Creativo"
];

const typingDelay = 70;
const erasingDelay = 35;
const newWordDelay = 2500;
let wordIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < wordsArray[wordIndex].length) {
        typedTextSpan.textContent += wordsArray[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newWordDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = wordsArray[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        wordIndex = (wordIndex + 1) % wordsArray.length;
        setTimeout(type, typingDelay + 300);
    }
}

// ─────────────────────────────────────────────────────────────
// 2. FLOATING PARTICLES
// ─────────────────────────────────────────────────────────────
function createParticles() {
    const container = document.getElementById("particles-container");
    if (!container) return;

    const particleCount = 40;
    const colors = [
        'rgba(0, 255, 170, 0.6)',   // Emerald
        'rgba(123, 97, 255, 0.5)',   // Violet
        'rgba(116, 172, 223, 0.4)',  // Celeste
        'rgba(0, 255, 170, 0.3)',    // Dim emerald
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const size = Math.random() * 3 + 1.5;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * 100 + "%";

        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = duration + "s";

        const delay = Math.random() * 20;
        particle.style.animationDelay = delay + "s";

        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

// ─────────────────────────────────────────────────────────────
// 3. SCROLL REVEAL — IntersectionObserver with stagger
// ─────────────────────────────────────────────────────────────
function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal-element");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────────────────────
// 3.5 MESH MOUSE TRACKING
// ─────────────────────────────────────────────────────────────
function initMeshInteraction() {
    const meshLayers = document.querySelectorAll(".mesh-layer");
    if (!meshLayers.length) return;

    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        
        meshLayers.forEach((layer, index) => {
            const depth = (index + 1) * 0.4;
            layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
    });
}

// ─────────────────────────────────────────────────────────────
// 4. NAVBAR — Background change on scroll
// ─────────────────────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ─────────────────────────────────────────────────────────────
// 5. MOBILE MENU
// ─────────────────────────────────────────────────────────────
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            toggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
}

// ─────────────────────────────────────────────────────────────
// 6. YEAR AUTO-UPDATE
// ─────────────────────────────────────────────────────────────
function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
}

// ─────────────────────────────────────────────────────────────
// 7. SMOOTH ANCHOR SCROLL (enhanced native)
// ─────────────────────────────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const targetId = anchor.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector(".navbar")?.offsetHeight || 72;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────
// 8. KATANA CURSOR — Follow logic & Trail
// ─────────────────────────────────────────────────────────────
function initKatanaCursor() {
    const cursor = document.getElementById("katana-cursor");
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follow loop
    function animate() {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;

        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    // Active state on interactives
    const interactives = document.querySelectorAll('a, button, .glass-card, .logo');
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("active"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });
}

// ─────────────────────────────────────────────────────────────
// INITIALIZATION
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    // Typing effect
    if (wordsArray.length) setTimeout(type, 1800);

    // Particles
    createParticles();

    // Scroll reveal
    initScrollReveal();

    // Mesh interaction
    initMeshInteraction();

    // Navbar scroll effect
    initNavbar();

    // Mobile menu
    initMobileMenu();

    // Smooth scroll
    initSmoothScroll();

    // Year
    setYear();

    // Katana Cursor
    initKatanaCursor();
});
