import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Briefcase, Code2, Award } from 'lucide-react';
import { gsap } from 'gsap';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'education', label: 'Education', icon: Briefcase },
  { id: 'achievements', label: 'Achievements', icon: Award },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  // Handle scroll to update active section
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = navItems.map(item => document.getElementById(item.id));
          const scrollPosition = window.scrollY + window.innerHeight / 2; // Center of screen
          
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // macOS Dock Hover Effect Logic using GSAP
  const handleMouseEnter = (index: number) => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll('.dock-item');
    
    items.forEach((item, i) => {
      const distance = Math.abs(index - i);
      let scale = 1;
      let y = 0;
      
      if (distance === 0) {
        scale = 1.15; // Hovered item (toned down for text)
        y = -4;
      } else if (distance === 1) {
        scale = 1.05; // Adjacent items
        y = -2;
      }
      
      gsap.to(item, {
        scale,
        y,
        duration: 0.3,
        ease: 'power2.out',
        transformOrigin: 'bottom center'
      });
    });
  };

  const handleMouseLeave = () => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll('.dock-item');
    gsap.to(items, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <>
      {/* ── Desktop Floating macOS Dock (Top Center) ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden lg:block">
        <div 
          ref={dockRef}
          className="flex items-center gap-1 p-2 rounded-full bg-slate-900/60 backdrop-blur-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
          onMouseLeave={handleMouseLeave}
        >
          
          {/* Video Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="dock-item relative overflow-hidden rounded-full w-10 h-10 shrink-0 border border-slate-700/50 shadow-xl ml-1 mr-2"
            onMouseEnter={() => handleMouseEnter(-1)}
          >
            <video 
              src="/logo.mp4?v=1" 
              autoPlay loop muted playsInline
              className="w-full h-full object-cover scale-[1.3]"
            />
          </button>

          {/* Divider */}
          <div className="w-[1px] h-10 bg-white/10 mx-1 mb-1 rounded-full" />

          {/* Navigation Links */}
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => handleMouseEnter(index)}
                className="dock-item relative group flex flex-col items-center justify-center px-4 h-10 rounded-full transition-colors"
              >
                {/* Background active state */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`} />
                
                <span className={`relative z-10 transition-colors duration-300 font-medium text-sm tracking-wide ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.label}
                </span>

                {/* Active Dot Indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Mobile Top Header & Menu ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] lg:hidden">
        <div className="p-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            {/* Logo */}
            <button onClick={() => scrollToSection('hero')} className="relative overflow-hidden rounded-xl w-10 h-10 shrink-0 border border-slate-700/50">
              <video src="/logo.mp4?v=1" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </button>
            
            {/* Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setMobileMenuOpen(false)} />
        
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-slate-950 rounded-t-3xl border-t border-white/10 p-6 pb-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-8" />
          
          <div className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </div>
                  {isActive && <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};
