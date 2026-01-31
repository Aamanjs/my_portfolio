import React from 'react';
import { motion } from 'framer-motion';
import './SkillsSection.css';

// Import real icons from react-icons
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { SiMysql ,SiSpring, SiMongodb, SiJavascript, SiTypescript, SiTailwindcss } from 'react-icons/si';

const SkillsSection = () => {
  const skills = [
    { name: "Java", icon: <FaJava color="#fb6161" />, color: "#61DAFB" },
    { name: "Spring", icon: <SiSpring color="#47A248" />, color: "#47A248" },
    { name: "React", icon: <FaReact color="#61DAFB" />, color: "#61DAFB" },
    { name: "MySQL", icon: <SiMysql color="#1572B6" />, color: "#61DAFB" },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" />, color: "#47A248" },
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" />, color: "#F7DF1E" },
    { name: "Node.js", icon: <FaNodeJs color="#47A248" />, color: "#47A248" },
    { name: "HTML5", icon: <FaHtml5 color="#E44D26" />, color: "#E44D26" },
    { name: "CSS3", icon: <FaCss3Alt color="#1572B6" />, color: "#1572B6" },
    { name: "Git & GitHub", icon: <FaGitAlt color="#181717" />, color: "#181717" },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, type: "spring" },
    }),
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="section-title">
          My <span className="highlight">Skills</span>
        </h2>
        <p className="skills-intro">
          A Full Stack Developer proficient in the JAVA full stack and modern development practices.
        </p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
