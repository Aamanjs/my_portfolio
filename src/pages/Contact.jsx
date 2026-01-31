import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Particle Background Component
function ParticleNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let can_w = window.innerWidth;
    let can_h = window.innerHeight;
    
    canvas.width = can_w;
    canvas.height = can_h;

    const BALL_NUM = 30;
    const ball_color = { r: 207, g: 255, b: 4 };
    const R = 2;
    let balls = [];
    const alpha_f = 0.03;
    const link_line_width = 0.8;
    const dis_limit = 260;
    const mouse_ball = { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' };

    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function randomArrayItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomSidePos(length) {
      return Math.ceil(Math.random() * length);
    }

    function getRandomSpeed(pos) {
      const min = -1, max = 1;
      switch(pos) {
        case 'top':
          return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
        case 'right':
          return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
        case 'bottom':
          return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
        case 'left':
          return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
        default:
          return [0, 0];
      }
    }

    function getRandomBall() {
      const pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
      const speed = getRandomSpeed(pos);
      
      const positions = {
        top: { x: randomSidePos(can_w), y: -R },
        right: { x: can_w + R, y: randomSidePos(can_h) },
        bottom: { x: randomSidePos(can_w), y: can_h + R },
        left: { x: -R, y: randomSidePos(can_h) }
      };

      return {
        ...positions[pos],
        vx: speed[0],
        vy: speed[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      };
    }

    function renderBalls() {
      balls.forEach(b => {
        if (!b.type) {
          ctx.fillStyle = `rgba(${ball_color.r},${ball_color.g},${ball_color.b},${b.alpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
        }
      });
    }

    function updateBalls() {
      const new_balls = [];
      balls.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        
        if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
          new_balls.push(b);
        }
        
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
      });
      
      balls = new_balls;
    }

    function getDisOf(b1, b2) {
      const delta_x = Math.abs(b1.x - b2.x);
      const delta_y = Math.abs(b1.y - b2.y);
      return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    function renderLines() {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const fraction = getDisOf(balls[i], balls[j]) / dis_limit;
          
          if (fraction < 1) {
            const alpha = (1 - fraction).toString();
            ctx.strokeStyle = `rgba(150,150,150,${alpha})`;
            ctx.lineWidth = link_line_width;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function addBallIfy() {
      if (balls.length < BALL_NUM) {
        balls.push(getRandomBall());
      }
    }

    function render() {
      ctx.clearRect(0, 0, can_w, can_h);
      renderBalls();
      renderLines();
      updateBalls();
      addBallIfy();
      requestAnimationFrame(render);
    }

    function initBalls(num) {
      for (let i = 1; i <= num; i++) {
        balls.push({
          x: randomSidePos(can_w),
          y: randomSidePos(can_h),
          vx: getRandomSpeed('top')[0],
          vy: getRandomSpeed('top')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        });
      }
    }

    const handleResize = () => {
      can_w = window.innerWidth;
      can_h = window.innerHeight;
      canvas.width = can_w;
      canvas.height = can_h;
    };

    const handleMouseEnter = () => {
      if (!balls.some(b => b.type === 'mouse')) {
        balls.push(mouse_ball);
      }
    };

    const handleMouseLeave = () => {
      balls = balls.filter(b => !b.type);
    };

    const handleMouseMove = (e) => {
      mouse_ball.x = e.clientX;
      mouse_ball.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousemove', handleMouseMove);

    initBalls(BALL_NUM);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        zIndex: 0
      }}
    />
  );
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 👇 REPLACE THESE WITH YOUR ACTUAL IDS FROM STEP 1
      const serviceId = 'service_jypaebg';
      const templateId = 'template_os1y4lk';
      const publicKey = 'ddJKetixl1XuuVJyJ';

      // Create an object that matches the variables in your EmailJS template
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // Send the email
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          // Clear form after success
          setFormData({ name: '', email: '', subject: '', message: '' });
          setErrors({});
        })
        .catch((err) => {
          console.log('FAILED...', err);
          alert('Failed to send the message. Please try again.');
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Aamanjs', label: 'GitHub' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/aaman-sayyad-40405a212', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'aamanjs08@gmail.com', label: 'Email' },
    { icon: Phone, text: '+91 81696 47394', label: 'Phone' },
    { icon: MapPin, text: 'Navi Mumbai, India', label: 'Location' }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}
    >
      <ParticleNetwork />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        width: '100%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff',
            marginBottom: '1rem',
            fontWeight: '700'
          }}>
            Let's <span style={{ color: '#ffc107' }}>Connect!</span>
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#ccc',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            I'm currently open to new opportunities and projects. Send me a message, and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(207, 255, 4, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${errors.name ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}`,
                    borderRadius: '10px',
                    color: '#484848',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                  onBlur={(e) => e.target.style.borderColor = errors.name ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}
                />
                {errors.name && <span style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${errors.email ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}`,
                    borderRadius: '10px',
                    color: '#484848',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                  onBlur={(e) => e.target.style.borderColor = errors.email ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}
                />
                {errors.email && <span style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${errors.subject ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}`,
                    borderRadius: '10px',
                    color: '#484848',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                  onBlur={(e) => e.target.style.borderColor = errors.subject ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}
                />
                {errors.subject && <span style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.subject}</span>}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${errors.message ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}`,
                    borderRadius: '10px',
                    color: '#484848',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                  onBlur={(e) => e.target.style.borderColor = errors.message ? '#ff4444' : 'rgba(0, 0, 0, 0.3)'}
                />
                {errors.message && <span style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#ffc107',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(248, 232, 82, 0.85)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                }}
              >
                <Send size={20} />
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Info Panel */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(207, 255, 4, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s'
          }}>
            <h3 style={{ color: '#ffc107', marginBottom: '2rem', fontSize: '1.5rem' }}>Contact Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {contactInfo.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  transition: 'transform 0.3s, background-color 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.backgroundColor = 'rgba(207, 255, 4, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(207, 255, 4, 0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <item.icon size={20} style={{ color: '#ffc107' }} />
                  </div>
                  <div>
                    <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>{item.label}</p>
                    <p style={{ color: '#787878', margin: '0.25rem 0 0 0' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(207, 255, 4, 0.2)', paddingTop: '2rem' }}>
              <h4 style={{ color: '#515151', marginBottom: '1rem', fontSize: '1.2rem' }}>Follow Me</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(207, 255, 4, 0.5)';
                      e.currentTarget.style.backgroundColor = 'rgba(207, 255, 4, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <social.icon size={24} style={{ color: '#ffc107' }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;