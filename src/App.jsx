// src/App.jsx - Premium Version (COMPLETELY FIXED)
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiExternalLink,
  FiCode, 
  FiSmartphone, 
  FiServer, 
  FiDatabase,
  FiUsers,
  FiClock,
  FiHeart
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';

const App = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f0c1f 0%, #1a1035 50%, #2d1b4a 100%)',
      color: 'white',
      minHeight: '100vh',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(168,85,247,0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(59,130,246,0.3) 0%, transparent 50%)`,
        }} />
        <motion.div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, transparent, rgba(168, 85, 247, 0.05), transparent)',
            y: backgroundY
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

// Scroll Progress Bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #3b82f6, #a855f7, #ec4899, #a855f7, #3b82f6)',
        backgroundSize: '200% 100%',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 100,
        boxShadow: '0 0 20px rgba(168,85,247,0.5)'
      }}
    />
  );
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      style={{ 
        position: 'fixed', 
        width: '100%', 
        zIndex: 50,
        transition: 'all 0.3s',
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        backgroundColor: isScrolled ? 'rgba(15, 12, 31, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(168, 85, 247, 0.2)' : 'none'
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <motion.a 
          href="#" 
          style={{ 
            fontSize: '1.8rem', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #60a5fa, #c084fc, #f472b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            letterSpacing: '-0.5px'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          PO
        </motion.a>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Home', 'Skills', 'Projects', 'Contact'].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                style={{ 
                  cursor: 'pointer', 
                  background: 'transparent', 
                  border: 'none', 
                  color: isActive ? '#c084fc' : 'white',
                  fontSize: '1rem',
                  fontWeight: isActive ? '600' : '400',
                  position: 'relative'
                }}
                whileHover={{ scale: 1.1, color: '#c084fc' }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '0',
                      right: '0',
                      height: '2px',
                      background: 'linear-gradient(90deg, #3b82f6, #c084fc)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="home" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingTop: '5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '6rem 2rem'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem',
          alignItems: 'center'
        }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{
                color: '#c084fc',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                fontSize: '0.875rem',
                display: 'inline-block',
                marginBottom: '1rem',
                border: '1px solid rgba(168,85,247,0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(168,85,247,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Welcome to my portfolio
            </motion.span>
            
            <motion.h1 
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Creating{' '}
              <span style={{ 
                background: 'linear-gradient(135deg, #60a5fa, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Digital Magic
              </span>
              <br />
              with Code
            </motion.h1>
            
            <motion.p 
              style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '500px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              I'm Patrick Okyere, a Full Stack Developer who turns complex problems into elegant, high-performance digital experiences.
            </motion.p>
            
            <motion.div 
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <SocialButton href="https://github.com/patrickokyere" icon={<FiGithub />} label="GitHub" />
              <SocialButton href="https://linkedin.com/in/patrickokyere" icon={<FiLinkedin />} label="LinkedIn" />
              <SocialButton href="mailto:patrickokyere831@gmail.com" icon={<FiMail />} label="Email" />
            </motion.div>
          </motion.div>
          
          <motion.div
            style={{ position: 'relative' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05}>
              <div style={{ position: 'relative', width: '20rem', height: '20rem', margin: '0 auto' }}>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7, #ec4899)',
                  borderRadius: '50%',
                  animation: 'pulseSlow 3s infinite',
                  filter: 'blur(20px)',
                  opacity: 0.6
                }}></div>
                <div style={{ 
                  position: 'absolute', 
                  inset: '0.5rem', 
                  background: 'linear-gradient(135deg, #1a1035, #2d1b4a)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}>
                  <img 
                    src="/Gemini_Generated_Image_rbi94brbi94brbi9 (1).png" 
                    alt="Patrick Okyere" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const stats = [
    { icon: <FiCode />, value: '10+', label: 'Projects' },
    { icon: <FiUsers />, value: '2', label: 'Happy Clients' },
    { icon: <FiClock />, value: '1', label: 'Years Experience' },
    { icon: <FiHeart />, value: '100', label: 'Commits' }
  ];
  
  return (
    <section style={{ padding: '2rem 0 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, type: 'spring' }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
              }}
              whileHover={{ y: -10, borderColor: 'rgba(168,85,247,0.3)' }}
            >
              <div style={{ fontSize: '2rem', color: '#c084fc', marginBottom: '1rem' }}>
                {stat.icon}
              </div>
              <motion.div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}
              >
                {stat.value}
              </motion.div>
              <div style={{ color: '#9ca3af', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const skills = [
    { icon: <FiCode style={{ fontSize: '2rem' }} />, name: 'Frontend', tech: ['React', 'Vue', 'Next.js', 'TypeScript'], color: '#3b82f6' },
    { icon: <FiServer style={{ fontSize: '2rem' }} />, name: 'Backend', tech: ['Node.js', 'Python', 'Express', 'GraphQL'], color: '#a855f7' },
    { icon: <FiDatabase style={{ fontSize: '2rem' }} />, name: 'Database', tech: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'], color: '#ec4899' },
    { icon: <FiSmartphone style={{ fontSize: '2rem' }} />, name: 'Mobile', tech: ['React Native', 'Flutter', 'Swift', 'Kotlin'], color: '#f59e0b' },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" style={{ padding: '5rem 0', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            color: '#c084fc',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontSize: '0.875rem',
            background: 'rgba(168,85,247,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(168,85,247,0.3)',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            Expertise
          </span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Skills & Technologies
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Specialized in modern web technologies to build exceptional digital experiences
          </p>
        </motion.div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {skills.map((skill, index) => (
            <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02}>
              <motion.div
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
                  height: '100%'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: `${skill.color}40` }}
              >
                <div style={{ 
                  color: skill.color, 
                  marginBottom: '1.5rem',
                  background: `${skill.color}20`,
                  width: 'fit-content',
                  padding: '1rem',
                  borderRadius: '1rem'
                }}>
                  {skill.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>{skill.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skill.tech.map((tech, i) => (
                    <span 
                      key={i}
                      style={{ 
                        padding: '0.25rem 1rem', 
                        background: `${skill.color}20`,
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        color: '#d1d5db',
                        border: `1px solid ${skill.color}30`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const projects = [
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time analytics platform with machine learning insights that helped businesses increase efficiency by 40%',
      image: '/image.jpg',
      tags: ['React', 'TensorFlow.js', 'D3.js', 'Node.js'],
      link: '#',
      metrics: '40% faster insights',
      color: '#3b82f6',
      category: 'AI/ML'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack marketplace with seamless payment integration, serving 10,000+ active users monthly',
      image: '/images 2.jpg',
      tags: ['Next.js', 'Stripe', 'MongoDB', 'Redux'],
      link: '#',
      metrics: '$500K+ in sales',
      color: '#a855f7',
      category: 'E-Commerce'
    },
    {
      title: 'Social Media App',
      description: 'Real-time chat and content sharing platform with 100K+ downloads and 4.8⭐ rating',
      image: '/images 3.jpg',
      tags: ['React Native', 'Socket.io', 'Firebase', 'Expo'],
      link: '#',
      metrics: '100K+ users',
      color: '#ec4899',
      category: 'Mobile'
    },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI/ML', 'E-Commerce', 'Mobile'];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ 
      padding: '5rem 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            color: '#c084fc',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontSize: '0.875rem',
            background: 'rgba(168,85,247,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(168,85,247,0.3)',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            Portfolio
          </span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Featured Projects
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Real-world solutions with measurable business impact
          </p>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: filter === cat ? 'linear-gradient(135deg, #3b82f6, #a855f7)' : 'rgba(255,255,255,0.05)',
                  border: filter === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '9999px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: filter === cat ? '600' : '400'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredProjects.map((project, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={2000}
            >
              <motion.div
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  height: '100%'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div style={{ 
                  height: '240px', 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${project.color}40, transparent)`,
                    zIndex: 1
                  }} />
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.25rem 1rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    zIndex: 2,
                    fontSize: '0.75rem',
                    color: project.color
                  }}>
                    {project.category}
                  </div>
                  {/* Metric Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: project.color, fontWeight: 'bold' }}>🏆</span>
                    <span style={{ color: 'white', fontSize: '0.875rem' }}>{project.metrics}</span>
                  </div>
                </div>
                
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '0.75rem',
                    background: `linear-gradient(135deg, #fff, ${project.color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ color: '#9ca3af', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {project.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {project.tags.map((tag, i) => (
                      <motion.span 
                        key={i}
                        style={{ 
                          padding: '0.35rem 1rem', 
                          background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          color: '#d8b4fe',
                          border: `1px solid ${project.color}30`
                        }}
                        whileHover={{ scale: 1.05, background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <motion.a 
                      href={project.link}
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        color: project.color,
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                        borderBottom: `2px solid ${project.color}40`,
                        paddingBottom: '0.25rem'
                      }}
                      whileHover={{ gap: '1rem', borderBottomColor: project.color }}
                    >
                      View Case Study <FiExternalLink />
                    </motion.a>
                    
                    <motion.button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                      whileHover={{ color: project.color }}
                    >
                      Details →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Patrick is an exceptional developer. He delivered our project ahead of schedule and exceeded all expectations.',
      rating: 5,
      image: 'https://via.placeholder.com/100'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateLabs',
      content: 'Working with Patrick was a game-changer. His technical expertise and problem-solving skills are top-notch.',
      rating: 5,
      image: 'https://via.placeholder.com/100'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, DesignHub',
      content: 'Patrick doesn\'t just write code - he builds solutions. His attention to detail is remarkable.',
      rating: 5,
      image: 'https://via.placeholder.com/100'
    }
  ];

  return (
    <section style={{ padding: '5rem 0', background: 'rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            color: '#c084fc',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontSize: '0.875rem',
            background: 'rgba(168,85,247,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(168,85,247,0.3)',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            Testimonials
          </span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            What Clients Say
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontSize: '4rem',
                color: 'rgba(168,85,247,0.1)',
                fontFamily: 'serif'
              }}>"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(168,85,247,0.3)'
                  }}
                />
                <div>
                  <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{testimonial.name}</h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{testimonial.role}</p>
                </div>
              </div>
              <p style={{ color: '#d1d5db', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1rem' }}>
                {testimonial.content}
              </p>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: '#fbbf24' }}>★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('');

    // Simulate sending
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSending(false);
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <section id="contact" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            color: '#c084fc',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontSize: '0.875rem',
            background: 'rgba(168,85,247,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(168,85,247,0.3)',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            Get In Touch
          </span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Let's Work Together
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '2rem',
            padding: '3rem',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
        >
          {/* Name Field */}
          <div style={{ marginBottom: '2rem' }}>
            <label 
              htmlFor="name"
              style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              Name <span style={{ color: '#c084fc' }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
              title="Please enter your full name"
              aria-label="Your name"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c084fc'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '2rem' }}>
            <label 
              htmlFor="email"
              style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              Email <span style={{ color: '#c084fc' }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
              title="Please enter your email address"
              aria-label="Your email address"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c084fc'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Message Field */}
          <div style={{ marginBottom: '2rem' }}>
            <label 
              htmlFor="message"
              style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              Message <span style={{ color: '#c084fc' }}>*</span>
            </label>
            <textarea
              id="message"
              rows="5"
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell me about your project..."
              title="Please enter your message"
              aria-label="Your message"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                transition: 'border-color 0.3s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c084fc'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#4ade80',
                padding: '1rem',
                borderRadius: '1rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
              role="alert"
            >
              ✅ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '1rem',
                borderRadius: '1rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
              role="alert"
            >
              ❌ Failed to send. Please email me directly at patrickokyere831@gmail.com
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSending}
            style={{
              width: '100%',
              padding: '1rem',
              background: isSending ? '#6b7280' : 'linear-gradient(135deg, #3b82f6, #a855f7)',
              border: 'none',
              borderRadius: '9999px',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: isSending ? 'not-allowed' : 'pointer',
              opacity: isSending ? 0.7 : 1,
              transition: 'all 0.3s'
            }}
            whileHover={!isSending ? { scale: 1.02 } : {}}
            whileTap={!isSending ? { scale: 0.98 } : {}}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.footer 
      ref={ref}
      style={{ 
        padding: '3rem 0', 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        color: '#9ca3af',
        marginTop: '2rem'
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <SocialButton href="https://github.com/patrickokyere" icon={<FiGithub />} label="" />
          <SocialButton href="https://linkedin.com/in/patrickokyere" icon={<FiLinkedin />} label="" />
          <SocialButton href="mailto:patrickokyere831@gmail.com" icon={<FiMail />} label="" />
        </div>
        <p>© 2026 Patrick Okyere. Crafted with passion and precision.</p>
      </div>
    </motion.footer>
  );
};

// Social Button Component
const SocialButton = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: label ? 'auto' : '3rem',
      height: label ? 'auto' : '3rem',
      padding: label ? '0.75rem 1.5rem' : '0',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: label ? '9999px' : '50%',
      color: 'white',
      textDecoration: 'none',
      border: '1px solid rgba(255,255,255,0.1)',
      gap: label ? '0.5rem' : '0'
    }}
    whileHover={{ scale: 1.1, background: 'rgba(168,85,247,0.2)', borderColor: '#c084fc' }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    {label && <span>{label}</span>}
  </motion.a>
);

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulseSlow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    overflow-x: hidden;
  }
  
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #3b82f6, #a855f7);
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #2563eb, #9333ea);
  }
`;
document.head.appendChild(style);

export default App;