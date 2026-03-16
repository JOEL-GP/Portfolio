import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    tag: 'SYS_ARCH',
    title: 'Ecosistema de Gestión Digital',
    desc: 'Arquitectura y despliegue de plataformas de gestión optimizadas para flujos de trabajo dinámicos, integrando APIs de comunicación directa.',
    icon: '[/>]'
  },
  {
    id: 2,
    tag: 'UI_DEV',
    title: 'Interfaces de Alta Fidelidad',
    desc: 'Diseño de experiencias interactivas con un enfoque en la estética visual y rendimiento, utilizando tecnologías de punta para una navegación fluida.',
    icon: '[UI]'
  },
  {
    id: 3,
    tag: 'INFRA',
    title: 'Soporte Técnico de Nivel Pro',
    desc: 'Optimización de hardware y software, garantizando la continuidad operativa y seguridad en entornos de alto rendimiento.',
    icon: '[HW]'
  },
  {
    id: 4,
    tag: 'AI_INT',
    title: 'Integración de IA Generativa',
    desc: 'Exploración y aplicación de modelos de lenguaje locales y herramientas de automatización para potenciar la productividad creativa.',
    icon: '[AI]'
  }
]

const skills = ['WEB_ARCHITECT', 'MODERN_STACK', 'MEDIA_PROD', 'AI_ENGINEERING', 'DATA_MGMT', 'SYSTEM_SUPPORT', 'AGILE_FLOW', 'VISUAL_DESIGN']

const words = ['Analista de Sistemas', 'Concept Architect', 'AI Implementation', 'Creative Developer']

function App() {
  const [typedText, setTypedText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const heroRef = useRef(null)
  const particlesRef = useRef(null)
  const terminalRef = useRef(null)

  // Status logs for the terminal effect
  const [logs, setLogs] = useState([
    { time: '00:00:00', msg: 'INITIALIZING_SYSTEM...', status: 'OK' }
  ])

  useEffect(() => {
    // Add fake terminal logs over time
    const newLogs = [
      { delay: 1000, log: { time: '00:00:01', msg: 'LOADING_CORE_MODULES...', status: 'OK' } },
      { delay: 2500, log: { time: '00:00:02', msg: 'SECURITY_PASS...', status: 'VERIFIED' } },
      { delay: 4000, log: { time: '00:00:04', msg: 'LOAD_SKILL_TREE...', status: 'TRUE' } },
      { delay: 5500, log: { time: '00:00:05', msg: 'SYSTEM_READY.', status: 'ONLINE' } }
    ]

    const timeouts = newLogs.map(({ delay, log }) => 
      setTimeout(() => {
        setLogs(prev => [...prev.slice(-3), log]) // Keep last 4 logs
      }, delay)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [])


  useEffect(() => {
    const cursor = document.getElementById('katana-cursor')
    if (cursor) {
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
    }
  }, [])

  useEffect(() => {
    const particlesContainer = particlesRef.current
    if (!particlesContainer) return
    const colors = ['rgba(0, 255, 102, 0.4)', 'rgba(0, 255, 102, 0.1)'] // Matrix green particles
    for (let i = 0; i < 30; i++) {
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
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      })

      gsap.from('.nav-inner > *', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
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
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="app">
      <div id="particles-container" ref={particlesRef}></div>
      {/* Keeping Katana cursor as an option, but making it toxic green via CSS logic or default */}
      <div className="katana-cursor" id="katana-cursor" style={{ background: '#00ff66', width: '15px', height: '15px', borderRadius: '0' }}></div>

      <nav className="navbar">
        <div className="nav-inner">
          <a href="#" className="logo">
            <span className="logo-text">SYS<span className="logo-accent">_</span>ADMIN</span>
          </a>
          <ul className="nav-links hidden md:flex">
            <li><a href="#inicio" className="nav-link">[HOME]</a></li>
            <li><a href="#sobre-mi" className="nav-link">[ABOUT]</a></li>
            <li><a href="#portafolio" className="nav-link">[DATA]</a></li>
            <li><a href="#contacto" className="nav-link">[PING]</a></li>
            <li><a href="cv.html" className="nav-link nav-cta">EXEC_CV</a></li>
          </ul>
        </div>
      </nav>

      <section id="inicio" className="hero" ref={heroRef}>
        <div className="hero-bg-wrapper">
          {/* Using BASE_URL for Vite so it works on gh-pages */}
          <video autoPlay muted loop playsInline className="hero-video">
            <source src={`${import.meta.env.BASE_URL}kaneki-one-eye-tokyo-ghoul-moewalls-com.mp4`} type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="grid-overlay"></div>
          <div className="scanline"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <span className="sys-boot-text">&gt; SYSTEM_BOOT_SEQUENCE_INITIATED...</span>
            <h1 className="hero-title">
              JOEL_<br/><span className="title-accent">PAREDES</span>
            </h1>
            <div className="hero-description font-mono">
              &gt; {typedText}<span className="cursor" style={{ color: '#00ff66' }}>_</span>
              <br/><br/>
              Especialista en arquitectura de sistemas y creación de productos digitales de alta gama. Fusionando tecnología de precisión con estética cyber-samurai.
            </div>

            <div className="terminal-box mb-8" ref={terminalRef}>
              {logs.map((log, i) => (
                <div key={i} className="term-line">
                  <span className="term-time">[{log.time}]</span>
                  <span className="term-msg">{log.msg}</span>
                  <span className="term-status ml-auto">{log.status}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a href="#portafolio" className="btn btn-primary">ACCEDER_DATOS</a>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="about">
        <div className="section-header reveal" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <span className="section-tag">01 / Profile_Data</span>
          <h2 className="section-title">Filosofía de Trabajo</h2>
        </div>

        <div className="bento-grid">
          <div className="tech-panel reveal" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className="panel-header">
              <span className="panel-id">SEQ_01</span>
              <span className="text-[#00ff66] opacity-50">[ARCH]</span>
            </div>
            <div>
              <h3 className="card-title">Visión Técnica</h3>
              <p className="card-desc">Como Analista de Sistemas, mi enfoque se centra en la eficiencia operativa y la escalabilidad. Diseño ecosistemas digitales que responden a necesidades reales con precisión quirúrgica, como una hoja bien afilada.</p>
            </div>
          </div>

          <div className="tech-panel reveal" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className="panel-header">
              <span className="panel-id">SEQ_02</span>
              <span className="text-[#00ff66] opacity-50">[AI]</span>
            </div>
            <div>
              <h3 className="card-title">Innovación IA</h3>
              <p className="card-desc">Implementación proactiva de soluciones basadas en IA generativa para optimizar y automatizar flujos creativos.</p>
            </div>
          </div>

          <div className="tech-panel reveal" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className="panel-header">
              <span className="panel-id">SEQ_03</span>
              <span className="text-[#00ff66] opacity-50">[SKILLS]</span>
            </div>
            <div>
              <h3 className="card-title">Skill Tree</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] text-xs font-mono rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portafolio" className="portfolio">
        <div className="section-header reveal" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <span className="section-tag">02 / Mission_Logs</span>
          <h2 className="section-title">Proyectos Destacados</h2>
        </div>

        <div className="bento-grid">
          {projects.map((project) => (
            <div key={project.id} className="tech-panel reveal" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <div className="panel-header">
                <span className="panel-id">LOG_{project.id.toString().padStart(2, '0')}</span>
                <span className="text-[#00ff66] opacity-50 font-mono text-sm">{project.tag}</span>
              </div>
              <div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.desc}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-[#00ff66]/20 pt-4">
                <span className="text-xl text-[#00ff66] opacity-80 font-mono">{project.icon}</span>
                <span className="text-[10px] font-mono opacity-50 text-[#00ff66]">STATUS: DEPLOYED</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <span className="section-tag">03 / Comms_Link</span>
            <h2 className="section-title">Establecer Conexión.</h2>
            <p className="text-xl text-[#a0c4ac] mt-6 font-mono max-w-md">Sistema disponible para aceptar nuevos protocolos de proyectos estratégicos.</p>
          </div>
          <div className="space-y-4 reveal flex flex-col justify-center" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <a href="mailto:joeleliaspared@gmail.com" className="btn btn-primary w-full justify-between">
              <span>PING_EMAIL</span>
              <span className="underline opacity-80 lowercase">joeleliaspared@gmail.com</span>
            </a>
            <a href="https://github.com/JOEL-GP" className="btn btn-primary w-full justify-between">
              <span>ACCESS_GITHUB</span>
              <span className="underline opacity-80 uppercase">JOEL-GP</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer bg-black/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-mono text-sm text-[#00ff66] opacity-60 mb-2">
            &copy; 2024 Joel Paredes — NODE: J.J. Castelli, Chaco.
          </p>
          <p className="font-mono text-xs text-[#a0c4ac] opacity-50 uppercase tracking-widest">
            Este sitio fue generado con IA generativa para una experiencia digital premium.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
