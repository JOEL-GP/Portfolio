import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    tag: 'Web Design',
    title: 'Landing Page para Eventos',
    desc: 'Diseño de landing pages con integración de mapas y confirmación vía API de WhatsApp.',
    emoji: '🚀',
    size: 'featured'
  },
  {
    id: 2,
    tag: 'Creative',
    title: 'Cartas de Invitación Digitales',
    desc: 'Invitaciones interactivas y animadas, totalmente responsivas para compartir por redes.',
    emoji: '🎫'
  },
  {
    id: 3,
    tag: 'Systems',
    title: 'Sistema de Soporte',
    desc: 'Diseño de workflow para categorización de tickets y control de tiempos de respuesta.',
    emoji: '🤖'
  },
  {
    id: 4,
    tag: 'Próximamente',
    title: 'Próximos Proyectos IA',
    desc: 'Pronto subiré aplicaciones usando IAs locales y nuevas tecnologías del ecosistema.',
    emoji: '⏳',
    size: 'wide'
  }
]

const skills = [
  { icon: '🌐', name: 'WordPress & Elementor' },
  { icon: '💻', name: 'HTML / CSS / JS' },
  { icon: '🎬', name: 'OBS Studio & Streaming' },
  { icon: '🤖', name: 'IA Aplicada & Prompts' },
  { icon: '🗄️', name: 'SQL & Git/GitHub' },
  { icon: '🔧', name: 'Soporte & Reparación PC' },
  { icon: '📊', name: 'Trello & Gestión' },
  { icon: '🎨', name: 'Flyers & Diseño Visual' }
]

const words = ['Analista de Sistemas', 'Desarrollador Web', 'Entusiasta de la IA', 'Freelancer Creativo']

function App() {
  const [typedText, setTypedText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const particlesRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const particlesContainer = particlesRef.current
    if (!particlesContainer) return

    const colors = ['rgba(0, 255, 170, 0.6)', 'rgba(123, 97, 255, 0.5)', 'rgba(116, 172, 223, 0.4)']
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`
      particle.style.animationDelay = `${Math.random() * 20}s`
      particlesContainer.appendChild(particle)
    }
  }, [])

  useEffect(() => {
    let currentIndex = 0
    let currentWord = ''
    let isDeleting = false

    const type = () => {
      const word = words[wordIndex]
      
      if (isDeleting) {
        currentWord = word.substring(0, currentIndex - 1)
        currentIndex--
      } else {
        currentWord = word.substring(0, currentIndex + 1)
        currentIndex++
      }

      setTypedText(currentWord)

      let delay = isDeleting ? 30 : 80

      if (!isDeleting && currentIndex === word.length) {
        delay = 2500
        isDeleting = true
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false
        setWordIndex((prev) => (prev + 1) % words.length)
        delay = 300
      }

      setTimeout(type, delay)
    }

    setTimeout(type, 1500)
  }, [wordIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      })

      gsap.to('.hero-glow', {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.from('.nav-inner > *', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })

      ScrollTrigger.batch('.reveal', {
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
        })
      })

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out'
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.bento-card')
    cards.forEach(card => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  }

  return (
    <div className="app">
      <div id="particles-container" ref={particlesRef}></div>
      
      <div className="katana-cursor" id="katana-cursor">
        <div className="cursor-dot"></div>
      </div>

      <nav className="navbar" id="navbar">
        <div className="nav-inner">
          <a href="#inicio" className="logo">
            <svg className="flag-icon" viewBox="0 0 30 20" width="28" height="18">
              <rect y="0" width="30" height="7" fill="#74ACDF"/>
              <rect y="7" width="30" height="6" fill="#FFFFFF"/>
              <rect y="13" width="30" height="7" fill="#74ACDF"/>
              <circle cx="15" cy="10" r="2.5" fill="#F6B40E" stroke="#85340A" strokeWidth="0.3"/>
            </svg>
            <span className="logo-text">Joel<span className="logo-accent">Dev</span></span>
          </a>
          <ul className="nav-links">
            <li><a href="#inicio" className="nav-link">Inicio</a></li>
            <li><a href="#sobre-mi" className="nav-link">Sobre Mí</a></li>
            <li><a href="#portafolio" className="nav-link">Portafolio</a></li>
            <li><a href="#contacto" className="nav-link">Contacto</a></li>
            <li><a href="cv.html" className="nav-link nav-cta">Ver CV</a></li>
          </ul>
        </div>
      </nav>

      <section id="inicio" className="hero" ref={heroRef}>
        <div className="hero-bg-wrapper">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="kaneki-one-eye-tokyo-ghoul-moewalls-com.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="scanlines"></div>
          <div className="grain-overlay"></div>
        </div>
        
        <div className="hero-glow"></div>

        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-eyebrow">
              <span className="eyebrow-line"></span>
              <span className="mono-text">Analista de Sistemas · Creador Digital</span>
            </p>
            <h1 className="hero-title" ref={titleRef} data-text="Joel Paredes">
              Joel<br/><span className="title-accent">Paredes</span>
            </h1>
            <div className="hero-typing">
              <span className="mono-text typing-prefix">&gt;&nbsp;</span>
              <span className="mono-text typed-output">{typedText}</span>
              <span className="cursor">_</span>
            </div>
            <p className="hero-description">
              Transformo ideas en experiencias digitales. Soporte técnico, gestión de contenidos y exploración constante de <strong>Inteligencia Artificial</strong>.
            </p>
            <p className="hero-location mono-text">
              📍 J.J. Castelli, Chaco, Argentina
            </p>
            <div className="hero-actions">
              <a href="#portafolio" className="btn btn-primary">
                <span>Ver Proyectos</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
              <a href="cv.html" className="btn btn-ghost">
                <span>Mi CV</span>
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="mono-text">scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <section id="sobre-mi" className="about">
        <div className="section-header">
          <span className="section-tag mono-text reveal">01</span>
          <h2 className="section-title reveal">Sobre Mí <i className="ph ph-sword">⚔️</i></h2>
          <p className="section-subtitle mono-text reveal">// Conoce mi perfil y lo que manejo</p>
        </div>

        <div className="about-grid">
          <div className="about-terminal glass-card reveal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title mono-text">joel@portfolio:~$</span>
            </div>
            <div className="terminal-body">
              <p><span className="cmd">&gt;</span> Analista de Sistemas con experiencia práctica en <strong>administración web</strong>, producción audiovisual, soporte técnico y gestión de contenidos digitales.</p>
              <p><span className="cmd">&gt;</span> Manejo de herramientas de <strong>automatización e IA aplicada</strong>. Proactivo, con facilidad para aprender nuevas tecnologías.</p>
              <p><span className="cmd">&gt;</span> Actualmente explorando el mundo de las <strong>Inteligencias Artificiales</strong>: Open Claw, Open Code, IAs locales y todo lo que viene.</p>
            </div>
          </div>

          <div className="about-accent">
            <div className="accent-blob"></div>
          </div>

          <div className="about-skills">
            <h3 className="skills-label mono-text reveal">Tech Stack</h3>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div key={i} className="skill-tag glass-card reveal" style={{animationDelay: `${i * 0.05}s`}}>
                  <span className="skill-icon">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portafolio" className="portfolio" onMouseMove={handleMouseMove}>
        <div className="section-header">
          <span className="section-tag mono-text reveal">02</span>
          <h2 className="section-title reveal">Portafolio <i className="ph ph-sword">⚔️</i></h2>
          <p className="section-subtitle mono-text reveal">// Proyectos y trabajos realizados</p>
        </div>

        <div className="bento-grid">
          {projects.map((project, i) => (
            <article 
              key={project.id} 
              className={`bento-card glass-card reveal ${project.size === 'featured' ? 'bento-featured' : ''} ${project.size === 'wide' ? 'bento-wide' : ''}`}
              ref={el => cardsRef.current[i] = el}
            >
              <div className="card-glow"></div>
              <div className="card-content">
                <span className="card-tag mono-text">{project.tag}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.desc}</p>
                <a href="#" className="card-link" target="_blank">
                  <span>Ver Demo</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </a>
              </div>
              <div className="card-visual">
                <span className="card-emoji">{project.emoji}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="contact-grid">
          <div className="contact-text reveal">
            <div className="section-header section-header--left">
              <span className="section-tag mono-text">03</span>
              <h2 className="section-title">Hablemos</h2>
              <p className="section-subtitle mono-text">// ¿Listo para arrancar tu proyecto?</p>
            </div>
            <p className="contact-description">
              Diseño, software, automatización e inteligencia artificial. Escribime y hagamos realidad tu idea.
            </p>
          </div>

          <div className="contact-card glass-card reveal">
            <a href="mailto:joeleliaspared@gmail.com" className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <span className="contact-label mono-text">Email</span>
                <span className="contact-value">joeleliaspared@gmail.com</span>
              </div>
            </a>
            <a href="tel:+543644165579" className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <span className="contact-label mono-text">Teléfono</span>
                <span className="contact-value">3644165579</span>
              </div>
            </a>
            <a href="https://github.com/JOEL-GP" className="contact-item" target="_blank">
              <span className="contact-icon">🐙</span>
              <div>
                <span className="contact-label mono-text">GitHub</span>
                <span className="contact-value">JOEL-GP</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-flag">
            <svg viewBox="0 0 90 60" width="50" height="33">
              <rect y="0" width="90" height="20" fill="#74ACDF"/>
              <rect y="20" width="90" height="20" fill="#FFFFFF"/>
              <rect y="40" width="90" height="20" fill="#74ACDF"/>
              <circle cx="45" cy="30" r="7" fill="#F6B40E" stroke="#85340A" strokeWidth="0.8"/>
            </svg>
          </div>
          <p className="footer-copy mono-text">&copy; <span id="year"></span> Joel Paredes — Hecho en Argentina 🇦🇷</p>
          <p className="footer-sub mono-text">Analista de Sistemas · Todos los derechos reservados</p>
          <p className="footer-credit mono-text">Creado con ❤️ y la asistencia de <a href="https://antigravity.google" target="_blank">Antigravity AI</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
