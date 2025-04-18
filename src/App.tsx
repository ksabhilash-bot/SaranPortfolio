"use client"

import { useEffect, useRef } from "react"
import s from './pic/s.jpg'
import Cursor from './components/Cursor'
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Instagram, Mail, Palette, Layout, Monitor, PenTool, ChevronDown, ExternalLink } from "lucide-react"

// Using an optional import with fallback
const profileImage = "/placeholder.svg?height=400&width=400"

// Animated section component for reuse
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

// Animated card component
const AnimatedCard = ({ children, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative bg-[#0F172A] rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20"
    >
      {children}
    </motion.div>
  )
}

function App() {
  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Animated background
  const backgroundRef = useRef(null)

  useEffect(() => {
    // Create animated background with particles
    const createParticles = () => {
      const canvas = backgroundRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const particles = []
      const particleCount = 100

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.1})`,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
        })
      }

      function animate() {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i]
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()

          p.x += p.speedX
          p.y += p.speedY

          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
        }
      }

      animate()
    }

    createParticles()

    const handleResize = () => {
      if (backgroundRef.current) {
        backgroundRef.current.width = window.innerWidth
        backgroundRef.current.height = window.innerHeight
        createParticles()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="bg-[#0F172A] text-white min-h-screen relative">
      <Cursor />
      {/* Animated Background Canvas */}
      <canvas ref={backgroundRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30" />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-pink-500/10 to-transparent pointer-events-none" />
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-4 flex flex-col items-center text-center z-10"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8 relative"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg shadow-purple-500/20">
              <img src={s || "/placeholder.svg"} alt="Saran N S" className="w-full h-full object-cover" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="absolute -bottom-2 right-0 bg-purple-500 rounded-full p-3"
            >
              <Palette size={24} />
            </motion.div>
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
            >
              Saran N S
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl md:text-3xl text-gray-300 mb-6"
            >
              UI/UX & Graphic Designer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-2xl mx-auto text-lg text-gray-400 mb-8"
            >
              Crafting digital experiences that blend aesthetics with functionality. Specialized in creating intuitive
              interfaces and memorable brand identities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-purple-600/20"
              >
                View My Work
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                  <ChevronDown size={20} />
                </motion.div>
              </motion.a>
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=saranns810@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-pink-600/20"
              >
                Get in Touch
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Work Section */}
      <section id="work" className="py-20 bg-[#1E293B] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-transparent h-20 pointer-events-none" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 relative">
              Featured Work
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mobile App Design",
                description: "A clean and modern UI design for a fitness tracking application",
                image: "https://lh7-us.googleusercontent.com/iIS_pCALWqGScsc4M5t3IcZHcFbnSffzfRBXKGdywbzuDe6BwJmQsx72GYdc2KRLRUUPSbIFg98t3FEL_QWeAdiXpg0l1MQpb6FJOiZU0JNlaE1Jr8zDLeCsHl6qdkidePxxLRnFXJT3dMk3U_NuWNA",
                category: "UI/UX Design",
               
              },
              {
                title: "Brand Identity",
                description: "Complete branding package for a sustainable fashion brand",
                image: "https://img.freepik.com/free-vector/cartoon-graphic-design-landing-page_52683-70881.jpg",
                category: "Graphic Design",
                
                
              },
              {
                title: "Web Platform",
                description: "User experience design for an educational platform",
                image: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=800&q=80",
                category: "UI/UX Design",
                
                
              },
            ].map((project, index) => (
              <AnimatedCard key={index} index={index}>
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 * index }}
                    className="text-purple-400 text-sm"
                  >
                    {project.category}
                  </motion.span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <motion.a
                    href="https://www.behance.net/saransaj1"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    View Project <ExternalLink size={16} />
                  </motion.a>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-transparent h-20 pointer-events-none" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 relative">
              What I Do
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Monitor className="text-purple-400" size={28} />,
                title: "UI Design",
                description: "Creating beautiful, intuitive interfaces that users love to interact with.",
                color: "purple",
              },
              {
                icon: <Layout className="text-pink-400" size={28} />,
                title: "UX Design",
                description: "Designing seamless user experiences through research and testing.",
                color: "pink",
              },
              {
                icon: <PenTool className="text-purple-400" size={28} />,
                title: "Graphic Design",
                description: "Creating stunning visuals that communicate your brand's message.",
                color: "purple",
              },
            ].map((skill, index) => (
              <AnimatedSection key={index} delay={0.2 * index}>
                <motion.div
                  className={`p-8 bg-[#1E293B] rounded-xl hover:shadow-lg hover:shadow-${skill.color}-500/20 transition-all duration-300`}
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className={`w-14 h-14 bg-${skill.color}-600/20 rounded-lg flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
                  <p className="text-gray-400">{skill.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#1E293B] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-transparent h-20 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-8">Let's Create Something Amazing</h2>
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <p className="text-gray-400 mb-12 text-lg">
                I'm always excited to collaborate on new projects and bring creative ideas to life. Feel free to reach
                out through any of these channels.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=saranns810@gmail.com"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                  className="w-full md:w-auto bg-[#0F172A] border border-purple-500/30 rounded-xl p-6 flex items-center justify-center gap-4 transition-all duration-300 group"
                >
                  <motion.div whileHover={{ rotate: 15 }} className="text-purple-400 group-hover:text-purple-300">
                    <Mail size={24} />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Email me at</p>
                    <p className="text-lg font-medium">saranns810@gmail.com</p>
                  </div>
                </motion.a>
                <motion.a
                  href="https://instagram.com/_saran.saj"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(219, 39, 119, 0.1)" }}
                  className="w-full md:w-auto bg-[#0F172A] border border-pink-500/30 rounded-xl p-6 flex items-center justify-center gap-4 transition-all duration-300 group"
                >
                  <motion.div whileHover={{ rotate: 15 }} className="text-pink-400 group-hover:text-pink-300">
                    <Instagram size={24} />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Follow me on</p>
                    <p className="text-lg font-medium">Instagram</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 relative">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            © {new Date().getFullYear()} Saran N S. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}

export default App

