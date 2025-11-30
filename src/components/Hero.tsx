import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Award, Mail as MailIcon, Github, Linkedin, Mail, Instagram, GraduationCap, Trophy } from 'lucide-react';
import profileImage from '../../public/profile-picture.jpg';

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  // THROTTLED mouse tracking
  useEffect(() => {
    let lastUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < 16) return;
      lastUpdate = now;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Optimized particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];
    const particleCount = 80;
    
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
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x -= dx * 0.01;
          particle.y -= dy * 0.01;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
        
        particles.slice(index + 1, index + 6).forEach(otherParticle => {
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
      
      rafIdRef.current = requestAnimationFrame(animate);
    };
    
    rafIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [mousePosition]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24 md:pt-20">

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1]"
        style={{ background: 'transparent' }}
      />
      
      <div className="absolute inset-0 bg-black z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/5 via-purple-950/5 to-cyan-950/5 z-[3]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black z-[4]" />
      
      <div className="relative z-[10] px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Profile Image Section */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative group mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-slate-700/50 backdrop-blur-sm shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={profileImage} 
                  alt="Ritesh Solke" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
            </div>

            {/* NEW: Education & Achievements Buttons */}
            <div className="flex gap-4 w-full max-w-md">
              <Button
                onClick={() => scrollToSection('education')}
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-0 rounded-xl py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"

              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-semibold">Education</span>
                </div>
              </Button>

              <Button
                onClick={() => scrollToSection('achievements')}
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white border-0 rounded-xl py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"

              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Achievements</span>
                </div>
              </Button>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-6">
            <div>
              <p className="text-2xl md:text-3xl text-slate-300 font-light mb-2">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 font-bold text-3xl md:text-5xl">Ritesh Solke</span>
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-slate-200 font-medium">
              | Full Stack Developer | DevOps Engineer |
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {['MERN Stack', 'FARM Stack', 'DevOps Engineer', 'AI Enthusiast'].map((tag, index) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm backdrop-blur-sm hover:bg-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Info cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="backdrop-blur-sm bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:bg-slate-800/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <p className="text-sm text-slate-400 font-medium">Location</p>
                </div>
                <p className="text-slate-200">Pune, Maharashtra, India</p>
              </div>
              
              <div className="backdrop-blur-sm bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:bg-slate-800/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-purple-400" />
                  <p className="text-sm text-slate-400 font-medium">Expertise</p>
                </div>
                <p className="text-slate-200">Full-Stack Development</p>
              </div>
              
              
            </div>
            
            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-xl text-slate-300 font-semibold mb-4">Connect</h3>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                {[
                  { 
                    icon: Github, 
                    href: 'https://github.com/riteshsolke2004', 
                    label: 'GitHub',
                    hoverColor: 'hover:bg-gray-700/30 hover:border-gray-500',
                    iconHoverColor: 'group-hover:text-gray-100',
                    glowColor: 'group-hover:shadow-gray-500/20'
                  },
                  { 
                    icon: Linkedin, 
                    href: 'https://www.linkedin.com/in/riteshsolke/', 
                    label: 'LinkedIn',
                    hoverColor: 'hover:bg-blue-600/30 hover:border-blue-500',
                    iconHoverColor: 'group-hover:text-blue-400',
                    glowColor: 'group-hover:shadow-blue-500/20'
                  },
                  { 
                    icon: Mail, 
                    href: 'mailto:riteshsolke12@gmail.com', 
                    label: 'Email',
                    hoverColor: 'hover:bg-red-600/30 hover:border-red-500',
                    iconHoverColor: 'group-hover:text-red-400',
                    glowColor: 'group-hover:shadow-red-500/20'
                  },
                  { 
                    icon: Instagram, 
                    href: 'https://instagram.com/_.ritesh._18', 
                    label: 'Instagram',
                    hoverColor: 'hover:bg-pink-600/30 hover:border-pink-500',
                    iconHoverColor: 'group-hover:text-pink-400',
                    glowColor: 'group-hover:shadow-pink-500/20'
                  },
                ].map(({ icon: Icon, href, label, hoverColor, iconHoverColor, glowColor }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group relative p-3 rounded-full backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 ${hoverColor} transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg ${glowColor}`}
                  >
                    <Icon className={`w-6 h-6 text-slate-300 ${iconHoverColor} transition-colors duration-300`} />
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-1/3 left-10 w-4 h-4 border-2 border-blue-400/30 rotate-45 animate-spin z-[5]" style={{ animationDuration: '8s' }} />
      <div className="absolute top-2/3 right-20 w-6 h-6 border-2 border-purple-400/30 animate-pulse z-[5]" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400/30 rounded-full animate-bounce z-[5]" style={{ animationDelay: '1s' }} />
    </section>
  );
};
