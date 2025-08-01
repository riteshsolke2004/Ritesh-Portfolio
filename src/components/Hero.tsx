import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // GSAP Animations for text and buttons
    const tl = gsap.timeline({ delay: 0.5 });
    
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

    gsap.to(ctaRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Canvas Animation for Image Sequence
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Placeholder for image sequence (replace with your actual image URLs)
    const frameCount = 100; // Adjust based on your number of images
    const images: HTMLImageElement[] = [];
    const imageSrcPrefix = '/path/to/your/images/frame_'; // Replace with your image path
    const imageSrcSuffix = '.png'; // Adjust extension if needed

    // Load images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${imageSrcPrefix}${i.toString().padStart(4, '0')}${imageSrcSuffix}`;
      images.push(img);
    }

    let currentFrame = 0;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    const drawImage = (frameIndex: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[frameIndex];
      if (img.complete) {
        // Center and scale image to fit canvas
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    // Scroll handler
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(scrollY / maxScroll, 1);
      currentFrame = Math.floor(scrollFraction * (frameCount - 1));
      drawImage(currentFrame);
    };

    // Initial draw
    images[0].onload = () => drawImage(0);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', resizeCanvas);

    // Animation loop for smooth rendering
    function animate() {
      drawImage(currentFrame);
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      
      <div className="container mx-auto flex items-center justify-between px-6">
        <div ref={heroRef} className="relative z-10 max-w-2xl text-left">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb- text-gradient"
          >
            Ritesh Solke
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
          >
            Full Stack & AI/ML enthusiast | Passionate about building smart tech solutions and exploring innovation.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start justify-start gap-6 mb-12">
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
          
          <div ref={socialRef} className="flex items-center justify-start gap-6 mb-16">
            <a 
              href="https://github.com/riteshsolke2004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/riteshsolke/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:riteshsolke12@gmail.com"
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

        <div className="relative z-10 w-1/2 h-[500px] hidden lg:block">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-glow rounded-full opacity-30 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-secondary rounded-full opacity-20 animate-float" />
    </section>
  );
};