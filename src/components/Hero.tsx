import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate hero elements
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(socialRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.2"
    );

    // Floating animation for CTA
    gsap.to(ctaRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      
      <div ref={heroRef} className="relative z-10 text-center px-6 max-w-4xl">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 text-gradient"
        >
          Creative
          <span className="block neon-text">Developer</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Building immersive digital experiences with cutting-edge technology and creative design
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary-glow hover-glow px-8 py-4 text-lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Connect
          </Button>
        </div>
        
        <div ref={socialRef} className="flex items-center justify-center gap-6 mb-16">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="mailto:hello@example.com"
            className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        
        <button 
          onClick={scrollToAbout}
          className="animate-bounce text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="w-8 h-8" />
        </button>
      </div>
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-glow rounded-full opacity-30 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-secondary rounded-full opacity-20 animate-float" />
    </section>
  );
};