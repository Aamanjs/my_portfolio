import React from 'react';
import './AboutSection.css'; // We'll create this CSS file next

const AboutSection = () => {
    return (
        // The ID links this section to the "About" button/link in the Navbar
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">
                    About <span className="highlight">Me</span>
                </h2>
                <div className="about-content">
    <div className="about-text">
        <p className="intro-text">
            Hello! I'm <strong>Aaman Sayyad</strong>, a dedicated <strong>Full Stack Developer</strong> passionate about building clean, scalable, and user-friendly enterprise applications and web applications.
        </p>

        <p>
            I specialize in enterprise-grade web development, with strong expertise in <strong>Java</strong> and the <strong>Spring Ecosystem</strong>. I focus on building scalable backends using <strong>Spring Boot</strong> and designing robust web architectures with <strong>Spring MVC</strong>. I have completed a comprehensive <strong>Full Stack Development</strong> course at <strong>CDAC Bangalore</strong>, which strengthened my practical understanding of object-oriented design and real-world project workflows.
        </p>

        <p>
            Beyond coding, I stay curious about emerging technologies, explore open-source contributions, and continuously work on enhancing my technical skills. Always excited to collaborate and create meaningful projects!
        </p>
    </div>

    <div className="about-info-box">
        <h3>Quick Facts</h3>
        <ul>
            <li><strong>Role:</strong> Full Stack Developer (JAVA)</li>
            <li><strong>Location:</strong> Navi Mumbai, India</li>
            <li><strong>Skills:</strong> Java, Spring Boot MVC, SQL, HTML, CSS, MongoDB</li>
            <li><strong>Course:</strong> Full Stack Development – CDAC Bangalore</li>
            <li><strong>Interests:</strong> Tech Trends, Open-Source</li>
        </ul>
    </div>
</div>

            </div>
        </section>
    );
};

export default AboutSection;