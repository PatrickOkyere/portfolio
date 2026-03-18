// src/App.jsx - Simplified version with inline styles
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
  FiDatabase 
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

const App = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  return (
    <div style={{ 
      background: 'linear-gradient(to bottom right, #111827, #581c87, #6b21a8)',
      color: 'white',
      minHeight: '100vh'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
        <motion.div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, transparent, rgba(168, 85, 247, 0.1), transparent)',
            transform: `translateY(${backgroundY})`
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      transition={{ duration: 0.5 }}
      style={{ 
        position: 'fixed', 
        width: '100%', 
        zIndex: 50,
        transition: 'all 0.3s',
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1.5rem',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <motion.a 
          href="#" 
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          Portfolio
        </motion.a>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              style={{ 
                cursor: 'pointer', 
                background: 'transparent', 
                border: 'none', 
                color: 'white',
                fontSize: '1rem'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
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
      paddingTop: '5rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '6rem 1.5rem'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '3rem',
          alignItems: 'center'
        }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span style={{ 
                background: 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Patrick Okyere
              </span>
            </motion.h1>
            
            <motion.p 
              style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '2rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Full Stack Developer creating amazing digital experiences
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
            transition={{ duration: 0.8 }}
          >
            <div style={{ position: 'relative', width: '16rem', height: '16rem', margin: '0 auto' }}>
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                borderRadius: '50%',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{ 
                position: 'absolute', 
                inset: '0.5rem', 
                backgroundColor: '#111827',
                borderRadius: '50%',
                overflow: 'hidden'
              }}>
                <img 
  src="/Gemini_Generated_Image_rbi94brbi94brbi9 (1).png" 
  alt="Patrick Okyere" 
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/400';
    console.log('Image failed to load');
  }}
/>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const skills = [
    { icon: <FiCode style={{ fontSize: '2.5rem' }} />, name: 'Frontend', tech: 'React, Vue, Javascript' },
    { icon: <FiServer style={{ fontSize: '2.5rem' }} />, name: 'Backend', tech: 'Node.js, Python, Javascript, Node.js. Express.js' },
    { icon: <FiDatabase style={{ fontSize: '2.5rem' }} />, name: 'Database', tech: 'MongoDB, PostgreSQL, SQL' },
    { icon: <FiSmartphone style={{ fontSize: '2.5rem' }} />, name: 'Mobile', tech: 'React Native, Flutter' },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.h2 
          style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
        >
          Skills & Expertise
        </motion.h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div style={{ color: '#c084fc', marginBottom: '1rem' }}>{skill.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{skill.name}</h3>
              <p style={{ color: '#9ca3af' }}>{skill.tech}</p>
            </motion.div>
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
    description: 'Real-time analytics platform with machine learning insights',
    image: '/image.jpg', // Removed 'my-portfolio/public/'
    tags: ['React', 'TensorFlow.js', 'D3.js'],
    link: '#',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack marketplace with payment integration',
    image: '/images 2.jpg', // Removed 'my-portfolio/public/'
    tags: ['Next.js', 'Stripe', 'MongoDB'],
    link: '#',
  },
  {
    title: 'Social Media App',
    description: 'Real-time chat and content sharing platform',
    image: '/images 3.jpg', // Removed 'my-portfolio/public/'
    tags: ['React Native', 'Socket.io', 'Firebase'],
    link: '#',
  },
];

  // ... rest of your component code
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" style={{ padding: '5rem 0', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.h2 
          style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
        >
          Featured Projects
        </motion.h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div style={{ height: '12rem', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>{project.description}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      style={{ 
                        padding: '0.25rem 0.75rem', 
                        backgroundColor: 'rgba(168, 85, 247, 0.2)',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        color: '#d8b4fe'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <motion.a 
                  href={project.link}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: '#c084fc',
                    textDecoration: 'none'
                  }}
                  whileHover={{ x: 5 }}
                >
                  View Project <FiExternalLink />
                </motion.a>
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          ref={ref}
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Let's Work Together</h2>
          <p style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '2rem' }}>
            I'm always interested in Learning and hearing about new opportunities
          </p>
          
          <motion.a
            href="mailto:patrick.okyere@example.com"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(to right, #3b82f6, #a855f7)',
              borderRadius: '9999px',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              textDecoration: 'none'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMail /> Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.footer 
      ref={ref}
      style={{ 
        padding: '2rem 0', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        color: '#9ca3af'
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <p>© 2026 Patrick Okyere. All rights reserved.</p>
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
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '9999px',
      color: 'white',
      textDecoration: 'none'
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span>{label}</span>
  </motion.a>
);

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
`;
document.head.appendChild(style);

export default App;