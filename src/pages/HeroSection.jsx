
import React from 'react';
import './HeroSection.css';
import ProfileImage from './Aaman_Transparent (1).png';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useEffect } from "react";




const HeroSection = () => {
  const socialLinks = [
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/aaman-sayyad-40405a212" },
    { icon: FaGithub, url: "https://github.com/Aamanjs" },
    
  ];
  useEffect(() => {
  const roles = [
    "Front-End Developer",
    "Back-End Developer",
    "Full Stack Developer"
  ];

  let index = 0;
  const typingElement = document.querySelector(".typing-text");

  function updateText() {
    typingElement.textContent = roles[index];
    index = (index + 1) % roles.length;
  }

  updateText();
  const interval = setInterval(updateText, 2500);

  return () => clearInterval(interval);
}, []);


  return (
    <>
      {/* 👇 Add "id='home'" to connect with Navbar Link */}
      <section id="home" className="hero-container">
        <div className="hero-content">
          <p className="greeting">Hi There,</p>
          <h1 className="name-title">
            I'm Aaman <span className="sable-highlight">Sayyad</span>
          </h1>
          <p className="subtitle">
  I am a <span className="typing-text"></span>
</p>


 
  <a href="/Aaman_Sayyad_ResumeL.pdf" download className="resume-button">
    ⬇ Resume
  </a>


          <div className="social-links">
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-wrapper"
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-image-container">
          <img src={ProfileImage} alt="Profile" className="profile-img" />
        </div>
      </section>

     
    </>
  );
};

export default HeroSection;
