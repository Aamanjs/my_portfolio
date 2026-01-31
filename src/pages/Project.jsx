import React from 'react';
import './Project.css';
// Assuming global styles (.section-title, .highlight, .section-container) are available.
import { motion } from "framer-motion";
const ProjectSection = () => {
    // Mock data for project display
    const projects = [
      {
    title: "OVS – Online Voting System",
    description:
      "OVS (Online Voting System) is my post graduation project. A secure, transparent web platform that automates elections to eliminate manual errors. Features role-based access and centralized data handling for efficient, accurate result generation.",
    tech: ["Java", "Spring Boot", "MySQL", "JavaScript", "HTML", "CSS"],
    live: "#", // add deployed link here if you host it
    github: "https://github.com/Aamanjs/online-voting-system",
    badge: "Post Graduation Project",
  },
  {
    title: "DDDS – Driver Drowsiness Detection System",
    description:
      "DDDS (Driver Drowsiness Detection System) is my final year project. Developed an IoT system detecting drowsiness via ML. Features alcohol and crash sensors that trigger alerts and share GPS location during accidents.",
    tech: ["Python", "TensorFlow.js", "Deep Learning", "IoT"],
    live: "#", // add deployed link here if you host it
    github: "https://github.com/MonikaMagar/SOUL-Sign-Language-Translator",
    badge: "Final Year Project (BE)",
  },
  {
    title: "EMS – Event Management System",
    description:
      "A feature-rich responsive event platform was designed using HTML and CSS to showcase schedules and venue details. Focuses on clean UI architecture, modern styling, and organized content presentation.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive UI", "React"],
    live: "#",
    github: "https://github.com/Aamanjs/VAPEMS",
  },
  {
    title: "Market Analysis Dashboard",
    description: "A responsive admin dashboard for monitoring sales, inventory, and user activity, built with React and utilizing D3.js for data visualization.",
    tech: ["PowerBI", "HTML", "CSS"],
    live: "#",
    github: "#"
  }   
  ];
    

    const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: "spring",
    },
  }),
};

    return (
        // Adding a new ID for project navigation (if you decide to add it to the Navbar later)
        <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          My Featured <span className="highlight">Projects</span>
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              {project.badge && (
                <span className="project-badge">{project.badge}</span>
              )}

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-button live-button"
                >
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-button github-button"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
