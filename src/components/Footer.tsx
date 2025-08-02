import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Instagram, Heart, ArrowUp, Code, MapPin } from 'lucide-react';

export const Footer = () => {
  const footerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      
      const footer = footerRef.current;
      if (!footer) return;
      
      const rect = footer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, hsl(217 91% 60% / 0.1), transparent 40%)`;
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
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-900/20',
      description: 'Check out my code'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/riteshsolke/',
      icon: Linkedin,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-900/20',
      description: 'Connect professionally'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/_.ritesh._18/',
      icon: Instagram,
      color: 'hover:text-pink-400',
      bgColor: 'hover:bg-pink-900/20',
      description: 'Follow my journey'
    },
    {
      name: 'Email',
      href: 'mailto:riteshsolke12@gmail.com',
      icon: Mail,
      color: 'hover:text-red-400',
      bgColor: 'hover:bg-red-900/20',
      description: 'Get in touch'
    }
  ];

  const quickLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef}
      className="relative bg-background border-t border-border/20 overflow-hidden"
    >
      {/* Interactive glow effect */}
      <div 
        ref={glowRef}
        className="absolute inset-0 opacity-50 transition-opacity duration-300 pointer-events-none"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-4xl font-black text-gradient mb-2">Ritesh Solke</h3>
              <div className="flex items-center gap-2 text-primary mb-4">
                <Code className="w-5 h-5" />
                <span className="text-lg font-semibold">Full Stack & AI/ML Developer</span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-md">
              Passionate about crafting intelligent solutions at the intersection of technology and innovation. 
              Let's build something extraordinary together.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:riteshsolke12@gmail.com" className="hover:text-primary transition-colors">
                  riteshsolke12@gmail.com
                </a>
              </div>
            </div>

            {/* Social links with enhanced styling */}
            <div className="flex gap-4">
              {socialLinks.map(({ name, href, icon: Icon, color, bgColor, description }) => (
                <div key={name} className="group relative">
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`
                      relative p-4 rounded-2xl border border-border/50 backdrop-blur-sm bg-card/30
                      transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:border-border
                      ${color} ${bgColor} hover-glow magnetic group
                    `}
                  >
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border/50 text-card-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="text-center">
                        <div className="font-semibold">{name}</div>
                        <div className="text-xs text-muted-foreground">{description}</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border/50"></div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter/CTA section - Reordered for mobile */}
          <div className="lg:col-span-1 lg:order-last order-third">
            <h4 className="text-xl font-bold text-foreground mb-6 relative">
              Let's Connect
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
            </h4>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Interested in collaboration or have a project in mind? I'd love to hear from you!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-glow text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 neon-glow hover-glow"
            >
              <Mail className="w-4 h-4" />
              Start a Conversation
            </a>
          </div>

          {/* Quick links - Will appear below "Start a Conversation" on mobile */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-foreground mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </h4>
            <nav className="space-y-4">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse"></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm mb-2">
              © {currentYear} Ritesh Solke. All rights reserved.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            aria-label="Back to top"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <div className="p-2 rounded-full border border-border/50 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-20 right-20 w-1 h-1 bg-secondary/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
    </footer>
  );
};