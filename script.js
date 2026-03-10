/**
 * ============================================================================
 * SCRIPT PRINCIPAL — Portafolio Retro Dark de Joel Paredes
 * Aquí está toda la lógica de las animaciones e interactividad.
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────
// 1. EFECTO DE ESCRITURA DINÁMICA (Máquina de Escribir)
// ─────────────────────────────────────────────────────────────
const typedTextSpan = document.getElementById("typed-output");

// Las frases que van a ir "escribiéndose" en el Hero
const wordsArray = [
    "Analista de Sistemas",
    "Desarrollador Web",
    "Entusiasta de la IA",
    "Soporte Técnico & Streaming",
    "Freelancer Creativo"
];

const typingDelay = 80;       // Milisegundos para escribir cada letra
const erasingDelay = 40;      // Milisegundos para borrar cada letra
const newWordDelay = 2200;    // Pausa antes de borrar la palabra terminada
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
        setTimeout(type, typingDelay + 400);
    }
}

// ─────────────────────────────────────────────────────────────
// 2. PARTÍCULAS FLOTANTES (Polvo de cueva)
// ─────────────────────────────────────────────────────────────
function createParticles() {
    const container = document.getElementById("particles-container");
    if (!container) return;

    const particleCount = 35; // Cantidad de partículas

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Tamaño aleatorio entre 2px y 5px
        const size = Math.random() * 3 + 2;
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        // Posición horizontal aleatoria en toda la pantalla
        particle.style.left = Math.random() * 100 + "%";

        // Duración de la animación aleatoria entre 8s y 20s
        const duration = Math.random() * 12 + 8;
        particle.style.animationDuration = duration + "s";

        // Un retraso aleatorio para que no salgan todas juntas
        const delay = Math.random() * 15;
        particle.style.animationDelay = delay + "s";

        // Alternar color entre verde neón y celeste argentino
        if (Math.random() > 0.6) {
            particle.style.background = "#74ACDF"; // Celeste argentino
        }

        container.appendChild(particle);
    }
}

// ─────────────────────────────────────────────────────────────
// 3. EFECTO FADE-IN AL HACER SCROLL (Intersection Observer)
// ─────────────────────────────────────────────────────────────
function initScrollAnimations() {
    const faders = document.querySelectorAll(".fade-in");

    const options = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, options);

    faders.forEach(fader => observer.observe(fader));
}

// ─────────────────────────────────────────────────────────────
// 4. MENÚ HAMBURGUESA (Móvil)
// ─────────────────────────────────────────────────────────────
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// ─────────────────────────────────────────────────────────────
// 5. AÑO AUTOMÁTICO EN EL FOOTER
// ─────────────────────────────────────────────────────────────
function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
}

// ─────────────────────────────────────────────────────────────
// INICIALIZACIÓN: Cuando el DOM carga, arrancamos todo
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
    // Arrancar efecto de escritura
    if (wordsArray.length) setTimeout(type, 1500);
    
    // Crear partículas flotantes
    createParticles();
    
    // Arrancar observador de scroll para animaciones fade-in
    initScrollAnimations();
    
    // Inicializar menú móvil
    initMobileMenu();
    
    // Poner el año actual en el pie de página
    setYear();
});
