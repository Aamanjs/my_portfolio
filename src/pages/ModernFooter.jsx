import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Aamanjs', label: 'GitHub', color: '#fff' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/aaman-sayyad-40405a212', label: 'LinkedIn', color: '#0077b5' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter', color: '#1da1f2' },
    { icon: Mail, url: 'mailto:aamanjs08@gmail.com', label: 'Email', color: '#ffc107' }
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'Mobile Apps',
    'Digital Marketing'
  ];

  return (
    <footer style={{
      position: 'relative',
      backgroundColor: '#000',
      color: '#fff',
      borderTop: '1px solid rgba(207, 255, 4, 0.2)',
      overflow: 'hidden'
    }}>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '50px',
          height: '50px',
          backgroundColor: '#ffc107',
          border: 'none',
          borderRadius: '50%',
          color: '#000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(207, 255, 4, 0.4)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.boxShadow = '0 6px 20px rgba(207, 255, 4, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(207, 255, 4, 0.4)';
        }}
      >
        <ArrowUp size={24} />
      </button>

      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{
              fontSize: '1.8rem',
              color: '#ffc107',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Aaman Sayyad
            </h3>
            <p style={{
              color: '#999',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Full Stack Developer & Designer creating beautiful, functional digital experiences.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '45px',
                    height: '45px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color === '#ffc107' ? 'rgba(207, 255, 4, 0.2)' : 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.boxShadow = `0 5px 15px ${social.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <social.icon size={20} style={{ color: social.color }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              color: '#ffc107',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '0.25rem 0',
                      transition: 'color 0.3s, transform 0.3s',
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#ffc107';
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#999';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              color: '#ffc107',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              Services
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {services.map((service, index) => (
                <li key={index} style={{
                  color: '#999',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'color 0.3s, transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffc107';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#999';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#ffc107',
                    borderRadius: '50%'
                  }} />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              color: '#ffc107',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              Get In Touch
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <a
                href="mailto:monika.magar@example.com"
                style={{
                  color: '#999',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffc107'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
              >
                aamanjs08@gmail.com
              </a>
              <p style={{ color: '#999', margin: 0 }}>+91 8169647394</p>
              <p style={{ color: '#999', margin: 0 }}>Navi Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          backgroundColor: 'rgba(207, 255, 4, 0.2)',
          margin: '2rem 0'
        }} />

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#999',
            fontSize: '0.95rem',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            © {new Date().getFullYear()} Aaman Sayyad. Made with
            <Heart 
              size={16} 
              style={{ color: '#ff4444' }}
              fill="#ff4444"
            />
            All rights reserved.
          </p>
          <p style={{
            color: '#666',
            fontSize: '0.85rem',
            margin: 0
          }}>
            Designed & Developed by Aaman Sayyad
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #ffc107, transparent)',
        opacity: 0.5
      }} />
    </footer>
  );
};

export default Footer;