import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, ChevronRight, Send, User, MessageSquare } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { resumeData } from './data/resume.js';
import Cursor from './Cursor';
import ParticleWave from './ParticleWave';
import CyberAvatar from './CyberAvatar';

// Animation Variations
const typingContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const typingChar = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
};

const fadeInUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "linear" } }
};

const flipIn = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: { opacity: 1, rotateX: 0, transition: { duration: 0.5, ease: "easeOut", type: "spring", bounce: 0.4 } }
};

const slideRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "linear" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Header = () => (
  <motion.header
    className="header"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: "linear" }}
  >
    <div className="container">
      <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--neon-pink)', letterSpacing: '2px' }}>
        {resumeData.personalInfo.name.split(' ')[0]}<span style={{ color: 'var(--neon-cyan)' }}>_SYSTEM</span>
      </div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </motion.header>
);

const Hero = () => {
  const { name, title, summary } = resumeData.personalInfo;
  return (
    <section id="about" className="hero">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={typingContainer} initial="hidden" animate="visible" className="hero-subtitle">
            {"// SYSTEM.READY".split('').map((char, index) => (
              <motion.span key={index} variants={typingChar}>{char}</motion.span>
            ))}
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="hero-title glitch"
            data-text={name}
          >
            {name}
          </motion.h1>
          <motion.h2 variants={fadeInUp} style={{ color: 'var(--neon-cyan)', marginBottom: '1.5rem', textShadow: 'var(--neon-glow)' }}>{title}</motion.h2>
          <motion.p variants={fadeInUp} className="hero-desc">{summary}</motion.p>
          <motion.div variants={fadeInUp} className="social-links">
            <motion.a whileHover={{ y: -5 }} href={`mailto:${resumeData.personalInfo.email}`} className="social-icon"><Mail size={20} /></motion.a>
            <motion.a whileHover={{ y: -5 }} href={`tel:${resumeData.personalInfo.phone}`} className="social-icon"><Phone size={20} /></motion.a>
            <motion.a whileHover={{ y: -5 }} href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={20} /></motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => (
  <section id="skills" className="section">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Technical Skills
      </motion.h2>
      <motion.div
        className="skills-container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {Object.entries(resumeData.skills).map(([category, skills]) => (
          <motion.div key={category} variants={fadeInUp} className="skill-category">
            <h3>{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <div className="skill-tags">
              {skills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="section">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>
      <div className="timeline">
        {resumeData.experience.map((exp, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideRight}
          >
            <span className="timeline-period">{exp.period || 'Past'} | {exp.location || 'Remote'}</span>
            <h3 className="timeline-title">{exp.role}</h3>
            <div className="timeline-subtitle">{exp.company}</div>
            <ul className="timeline-desc">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="section">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>
      <motion.div
        className="projects-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {resumeData.projects.map((project, index) => (
          <motion.div
            key={index}
            variants={flipIn}
            className="cyber-panel project-card"
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0], transition: { duration: 0.2 } }}
          >
            <h3>{project.title}</h3>
            <div className="project-org">{project.organization}</div>
            <ul>
              {project.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Education = () => (
  <section id="education" className="section">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Education
      </motion.h2>
      <div className="timeline">
        {resumeData.education.map((edu, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideRight}
          >
            <span className="timeline-period">{edu.period}</span>
            <h3 className="timeline-title">{edu.degree}</h3>
            <div className="timeline-subtitle">{edu.institution}</div>
            <p style={{ color: 'var(--text-secondary)' }}>{edu.grade}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const { email, phone, linkedin } = resumeData.personalInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // connecting to the api endpoint specified
      const response = await fetch('api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Transmission failed:", err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Contact_System
        </motion.h2>

        <div className="contact-wrapper">
          <motion.div
            className="contact-info"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div className="contact-details">
                <label>Email_Link</label>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="contact-item">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div className="contact-details">
                <label>Comm_Line</label>
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="contact-item">
              <div className="contact-icon">
                <FaLinkedin size={24} />
              </div>
              <div className="contact-details">
                <label>Network_Node</label>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
            </motion.div>
          </motion.div>

          {status === 'success' ? (
            <motion.div
              className="contact-form cyber-panel"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
              <div style={{ color: 'var(--neon-cyan)', fontSize: '2rem', marginBottom: '1rem' }}>UPLINK_SUCCESSFUL</div>
              <p>Your message has been received by the system.</p>
              <button
                onClick={() => setStatus('idle')}
                className="submit-btn"
                style={{ width: 'auto', marginTop: '1rem' }}
              >
                SEND ANOTHER
              </button>
            </motion.div>
          ) : (
            <motion.form
              className="contact-form"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    name="name"
                    type="text"
                    placeholder="USER_NAME"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input
                    name="email"
                    type="email"
                    placeholder="USER_EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <ChevronRight className="input-icon" size={18} />
                  <input
                    name="subject"
                    type="text"
                    placeholder="SUBJECT_HEADER"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <MessageSquare className="input-icon" size={18} />
                  <textarea
                    name="message"
                    placeholder="TRANSMIT_MESSAGE"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={status === 'sending'}
              >
                <span>{status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                <Send size={18} />
              </button>
              {status === 'error' && (
                <div style={{ color: 'var(--neon-pink)', marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem' }}>
                  SYSTEM_ERROR: UPLINK_FAILED. PLEASE_TRY_LATER.
                </div>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <motion.footer
    className="footer"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
  >
    <div className="container">
      <p>&copy; {new Date().getFullYear()} {resumeData.personalInfo.name}. Built with React & Framer Motion.</p>
    </div>
  </motion.footer>
);

function App() {
  return (
    <div className="app-container">
      <ParticleWave />
      <Cursor />
      <Header />
      <main className="main-content">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CyberAvatar />
    </div>
  );
}

export default App;
