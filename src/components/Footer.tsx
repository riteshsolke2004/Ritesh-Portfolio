import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Instagram, Heart, ArrowUp, Code, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const footer = footerRef.current;
      if (!footer) return;
      
      const rect = footer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.1), transparent 40%)`;
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      return () => footer.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/riteshsolke2004',
      icon: Github,
      color: 'hover:text-gray-100',
      bgColor: 'hover:bg-gray-700/30',
      borderColor: 'hover:border-gray-500'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/riteshsolke/',
      icon: Linkedin,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-600/30',
      borderColor: 'hover:border-blue-500'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/_.ritesh._18/',
      icon: Instagram,
      color: 'hover:text-pink-400',
      bgColor: 'hover:bg-pink-600/30',
      borderColor: 'hover:border-pink-500'
    },
    {
      name: 'Email',
      href: 'mailto:riteshsolke12@gmail.com',
      icon: Mail,
      color: 'hover:text-red-400',
      bgColor: 'hover:bg-red-600/30',
      borderColor: 'hover:border-red-500'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef}
      className="relative bg-black border-t border-slate-800/50 overflow-hidden"
    >
      {/* Interactive glow effect */}
      <div 
        ref={glowRef}
        className="absolute inset-0 opacity-50 transition-opacity duration-300 pointer-events-none"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-3">
                Ritesh Solke
              </h3>
              <div className="flex items-center gap-2 text-blue-400 mb-4">
                <Code className="w-5 h-5" />
                <span className="text-lg font-semibold text-slate-300">Full Stack & DevOps Developer</span>
              </div>
            </div>
            
            <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-md">
              Passionate about crafting innovative solutions at the intersection of technology and creativity. 
              Let's build something extraordinary together.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:riteshsolke12@gmail.com" className="hover:text-blue-400 transition-colors">
                  riteshsolke12@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+918799993086" className="hover:text-blue-400 transition-colors">
                  +91 8799993086
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map(({ name, href, icon: Icon, color, bgColor, borderColor }) => (
                <div key={name} className="group relative">
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`
                      relative p-3 rounded-xl border border-slate-700/50 backdrop-blur-sm bg-slate-900/30
                      transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${borderColor}
                      ${color} ${bgColor} flex items-center justify-center
                    `}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      {name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-700"></div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* CTA section */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Let's Connect
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
            </h4>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Interested in collaboration or have a project in mind? I'd love to hear from you!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </a>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse"></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm mb-2">
              © {currentYear} Ritesh Solke. All rights reserved.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-105"
            aria-label="Back to top"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <div className="p-2 rounded-full border border-slate-700/50 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
    </footer>
  );
};
