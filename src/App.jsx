import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    tag: 'Sistemas & Estrategia',
    title: 'Ecosistema de Gestión Digital',
    desc: 'Arquitectura y despliegue de plataformas de gestión optimizadas para flujos de trabajo dinámicos, integrando APIs de comunicación directa.',
    emoji: '💎'
  },
  {
    id: 2,
    tag: 'Desarrollo Creativo',
    title: 'Interfaces de Alta Fidelidad',
    desc: 'Diseño de experiencias interactivas con un enfoque en la estética visual y rendimiento, utilizando tecnologías de punta para una navegación fluida.',
    emoji: '📂'
  },
  {
    id: 3,
    tag: 'Infraestructura',
    title: 'Soporte Técnico de Nivel Pro',
    desc: 'Optimización de hardware y software, garantizando la continuidad operativa y seguridad en entornos de alto rendimiento.',
    emoji: '🛠️'
  },
  {
    id: 4,
    tag: 'Evolución IA',
    title: 'Integración de IA Generativa',
    desc: 'Exploración y aplicación de modelos de lenguaje locales y herramientas de automatización para potenciar la productividad creativa.',
    emoji: '🧠'
  }
]

const skills = [
  { icon: '🌐', name: 'Web Architect' },
  { icon: '💻', name: 'Modern Stack' },
  { icon: '🎬', name: 'Media Production' },
  { icon: '🤖', name: 'AI Engineering' },
  { icon: '🗄️', name: 'Data Management' },
  { icon: '🔧', name: 'System Support' },
  { icon: '📊', name: 'Agile Workflow' },
  { icon: '🎨', name: 'Visual Design' }
]

const words = ['Analista de Sistemas', 'Concept Architect', 'AI Implementation', 'Creative Developer']

function App() {
  const [typedText, setTypedText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const heroRef = useRef(null)
  const particlesRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const cursor = document.getElementById('katana-cursor')
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      })
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  useEffect(() => {
    const particlesContainer = particlesRef.current
    if (!particlesContainer) return
    const colors = ['rgba(0, 255, 210, 0.4)', 'rgba(139, 92, 246, 0.3)']
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      const size = Math.random() * 3 + 1
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      particle.style.animationDuration = `${Math.random() * 20 + 15}s`
      particle.style.animationDelay = `${Math.random() * 10}s`
      particlesContainer.appendChild(particle)
    }
  }, [])

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    const type = () => {
      const word = words[wordIndex]
      if (isDeleting) {
        setTypedText(word.substring(0, currentIndex - 1))
        currentIndex--
      } else {
        setTypedText(word.substring(0, currentIndex + 1))
        currentIndex++
      }
      let delay = isDeleting ? 40 : 100
      if (!isDeleting && currentIndex === word.length) {
        delay = 3000
        isDeleting = true
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false
        setWordIndex((prev) => (prev + 1) % words.length)
        delay = 500
      }
      setTimeout(type, delay)
    }
    const timer = setTimeout(type, 2000)
    return () => clearTimeout(timer)
  }, [wordIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      })

      gsap.from('.nav-inner > *', {
        y: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out'
      })

      ScrollTrigger.batch('.reveal', {
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out'
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="app">
      <div id="particles-container" ref={particlesRef}></div>
      <div className="katana-cursor" id="katana-cursor"></div>

      <nav className="navbar">
        <div className="nav-inner">
          <a href="#" className="logo">
            <span className="logo-text">Joel<span className="logo-accent">.</span>Studio</span>
          </a>
          <ul className="nav-links">
            <li><a href="#inicio" className="nav-link">Home</a></li>
            <li><a href="#sobre-mi" className="nav-link">About</a></li>
            <li><a href="#portafolio" className="nav-link">Work</a></li>
            <li><a href="#contacto" className="nav-link">Contact</a></li>
            <li><a href="cv.html" className="nav-link nav-cta">Curriculum</a></li>
          </ul>
        </div>
      </nav>

      <section id="inicio" className="hero" ref={heroRef}>
        <div className="hero-bg-wrapper">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="kaneki-one-eye-tokyo-ghoul-moewalls-com.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-eyebrow">
              <span className="eyebrow-line"></span>
              <span className="mono-text">Sistemas & Diseño de Vanguardia</span>
            </p>
            <h1 className="hero-title">
              Joel<br/><span className="title-accent">Paredes</span>
            </h1>
            <div className="hero-description mono-text">
              &gt; {typedText}<span className="cursor">_</span>
              <br/><br/>
              Especialista en arquitectura de sistemas y creación de productos digitales de alta gama. Fusionando tecnología de precisión con estética minimalista.
            </div>
            <div className="hero-actions">
              <a href="#portafolio" className="btn btn-primary">Ver Portafolio</a>
              <a href="#contacto" className="btn btn-ghost">Hablemos</a>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="about">
        <div className="section-header reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <span className="section-tag">01 / Profile</span>
          <h2 className="section-title">Filosofía de Trabajo</h2>
        </div>

        <div className="bento-grid">
          <div className="bento-card glass-card reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <div>
              <h3 className="card-title">Visión Técnica</h3>
              <p className="card-desc">Como Analista de Sistemas, mi enfoque se centra en la eficiencia operativa y la escalabilidad. No solo construyo herramientas, diseño ecosistemas digitales que responden a necesidades reales con precisión quirúrgica.</p>
            </div>
            <div className="terminal-header">
              <div className="dot dot-red"></div>
              <div className="dot dot-yellow"></div>
              <div className="dot dot-green"></div>
            </div>
          </div>

          <div className="bento-card glass-card reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <h3 className="card-title">Innovación IA</h3>
            <p className="card-desc">Implementación proactiva de soluciones basadas en IA generativa para optimizar flujos creativos y técnicos.</p>
          </div>

          <div className="bento-card glass-card reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <h3 className="card-title">Stack</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.slice(0, 4).map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs mono-text">{s.name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portafolio" className="portfolio">
        <div className="section-header reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <span className="section-tag">02 / Selected Work</span>
          <h2 className="section-title">Proyectos Destacados</h2>
        </div>

        <div className="bento-grid">
          {projects.map((project) => (
            <div key={project.id} className="bento-card glass-card reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-accent opacity-70 mb-2 block">{project.tag}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.desc}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-3xl grayscale opacity-30">{project.emoji}</span>
                <span className="text-[10px] mono-text opacity-40 uppercase">Case Study // 2024</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <span className="section-tag">03 / Connect</span>
            <h2 className="section-title">Iniciemos algo grande.</h2>
            <p className="text-xl text-secondary mt-6">Disponible para proyectos estratégicos de sistemas y diseño digital.</p>
          </div>
          <div className="space-y-4 reveal" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <a href="mailto:joeleliaspared@gmail.com" className="btn btn-ghost w-full justify-between">
              <span>Email</span>
              <span className="text-accent underline">joeleliaspared@gmail.com</span>
            </a>
            <a href="https://github.com/JOEL-GP" className="btn btn-ghost w-full justify-between">
              <span>GitHub</span>
              <span className="text-accent underline">JOEL-GP</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p className="mono-text text-sm opacity-60">
            &copy; 2024 Joel Paredes — J.J. Castelli, Chaco.
          </p>
          <p className="footer-sub mono-text">
            Este sitio fue generado con IA generativa para una experiencia digital premium.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
