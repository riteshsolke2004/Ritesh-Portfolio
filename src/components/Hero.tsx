import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Play, Code, Brain, Rocket } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  const roles = [
    'Full Stack Developer',
    'AI/ML Engineer',
    'Tech Innovator'
  ];

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let charIndex = 0;
    let isDeleting = false;
    
    const typeInterval = setInterval(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        charIndex++;
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
      } else if (isDeleting && charIndex === 0) {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        isDeleting = false;
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = [];
    const particleCount = 100;
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x -= dx * 0.01;
          particle.y -= dy * 0.01;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
        
        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (distance2 < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance2 / 80)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePosition]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-cyan-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/80 to-slate-950" />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-8">
        {/* Floating elements - adjusted for navbar */}
        <div className="absolute -top-10 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        
        {/* Name with glitch effect */}
        <div className="relative mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 animate-pulse">
            Ritesh Solke
          </h1>
          <h1 className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300 transform translate-x-1 translate-y-1">
            Ritesh Solke
          </h1>
        </div>
        
        {/* Typing animation */}
        <div className="h-16 mb-8 flex items-center justify-center">
          <p className="text-2xl md:text-4xl text-slate-300 font-light">
            {typedText}<span className="animate-blink text-blue-400">|</span>
          </p>
        </div>
        
        {/* Description with glassmorphism */}
        <div className="backdrop-blur-sm bg-slate-800/20 rounded-2xl p-6 mb-10 border border-slate-700/30">
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto">
            Crafting intelligent solutions at the intersection of 
            <span className="text-blue-400 font-semibold"> Full Stack Development</span> and 
            <span className="text-purple-400 font-semibold"> Artificial Intelligence</span>. 
            Passionate about building the future, one line of code at a time.
          </p>
        </div>
        
        {/* Interactive skill icons */}
        {/* <div className="flex justify-center gap-8 mb-10">
          {[
            { icon: Code, label: 'Code', color: 'text-blue-400' },
            { icon: Brain, label: 'AI/ML', color: 'text-purple-400' },
            { icon: Rocket, label: 'Innovation', color: 'text-cyan-400' }
          ].map(({ icon: Icon, label, color }, index) => (
            <div
              key={label}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`p-4 rounded-full border border-slate-700/50 backdrop-blur-sm bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:scale-110 hover:rotate-6 ${color}`}>
                <Icon className="w-8 h-8" />
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-300">
                {label}
              </span>
            </div>
          ))}
        </div>
         */}
        {/* CTA buttons with enhanced effects */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          <Button
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5" />
              View My Work
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="border-2 border-slate-600 text-slate-200 hover:bg-slate-200 hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-slate-800/20 transform hover:scale-105 transition-all duration-300"
          >
            Let's Connect
          </Button>
        </div>
        
        {/* Social links with enhanced styling */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {[
            { icon: Github, href: 'https://github.com/riteshsolke2004', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/riteshsolke/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:riteshsolke12@gmail.com', label: 'Email' }
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : '_self'}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative p-4 rounded-full backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <Icon className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
              <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="group flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors duration-300"
          aria-label="Scroll to About section"
        >
          <span className="text-sm uppercase tracking-wider font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-500 group-hover:border-slate-300 rounded-full flex justify-center transition-colors duration-300">
            <div className="w-1 h-3 bg-slate-500 group-hover:bg-slate-300 rounded-full mt-2 animate-bounce transition-colors duration-300" />
          </div>
        </button>
      </div>
      
      {/* Floating geometric shapes - positioned to avoid navbar */}
      <div className="absolute top-1/3 left-10 w-4 h-4 border-2 border-blue-400/30 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
      <div className="absolute top-2/3 right-20 w-6 h-6 border-2 border-purple-400/30 animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
    </section>
  );
};