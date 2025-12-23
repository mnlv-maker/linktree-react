import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const isMobile = window.innerWidth <= 640;
    const particleCount = isMobile ? 25 : 50;
    
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }
      
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(93, 109, 142, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    let animationId;
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(93, 109, 142, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const profileData = {
    image: '/img/ftoperfil.jpg',
    name: 'Luis Antuña Valdez',
    bio: 'Desarrollador de Software',
    verified: true
  };

  const links = [
    { 
      title: 'Gmail', 
      url: 'mailto:luima040407@gmail.com', 
      icon: 'mail',
      description: 'Envíame un correo para colaboraciones o consultas.',
      color: '#EA4335'
    },
    { 
      title: 'GitHub', 
      url: 'https://github.com/mnlv-maker', 
      icon: 'github',
      description: 'Revisa mis proyectos y repositorios de código.',
      color: '#181717'
    },
    { 
      title: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/luisantunavaldez/', 
      icon: 'linkedin',
      description: 'Conéctate conmigo profesionalmente.',
      color: '#0A66C2'
    },
    { 
      title: 'WhatsApp', 
      url: 'https://wa.me/18299214761', 
      icon: 'whatsapp',
      description: 'Escríbeme directamente por WhatsApp.',
      color: '#25D366'
    },
    { 
      title: 'Portfolio', 
      url: 'https://portfolio.com', 
      icon: 'briefcase',
      description: 'Explora mis trabajos y proyectos destacados.',
      color: '#8B5CF6'
    },
    { 
      title: 'X/Twitter', 
      url: 'https://twitter.com', 
      icon: 'twitter',
      description: 'Sígueme para actualizaciones y contenido.',
      color: '#000000'
    }
  ];

  const getIcon = (iconName) => {
    const icons = {
      mail: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>,
      github: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>,
      linkedin: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
      briefcase: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>,
      twitter: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>,
      whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    };
    return icons[iconName] || icons.briefcase;
  };

  return (
    <div className="container">
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      
      <div className="grid-background"></div>
      
      <div className="radial-gradient"></div>

      <div className={`content ${isVisible ? 'visible' : ''}`}>
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-image-wrapper">
              <img 
                src={profileData.image} 
                alt={profileData.name}
                className="profile-image"
              />
              {profileData.verified && (
                <div className="verified-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="verified-icon">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profileData.name}</h1>
              <p className="profile-bio">{profileData.bio}</p>
            </div>
          </div>
        </div>

        <div className="links-container">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`link-card ${hoveredLink === index ? 'hovered' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="link-icon" style={{ color: link.color }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {getIcon(link.icon)}
                </svg>
              </div>
              <div className="link-content">
                <div className="link-title">{link.title}</div>
                {hoveredLink === index && (
                  <div className="link-description">
                    {link.description}
                  </div>
                )}
              </div>
              <div className="link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <div className="link-glow"></div>
            </a>
          ))}
        </div>

        <div className="footer">
          <div className="footer-content">
            <p className="copyright">© 2025 {profileData.name}</p>
            <div className="footer-links">
              <a href="#privacy" className="footer-link">Privacy</a>
              <span className="footer-dot">•</span>
              <a href="#terms" className="footer-link">Terms</a>
            </div>
          </div>
          <button className="cta-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cta-icon">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            Build your link page
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;