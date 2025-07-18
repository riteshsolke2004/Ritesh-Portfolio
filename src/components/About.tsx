import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo(cardsRef.current?.children || [],
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const experiences = [
    {
      title: "Creative Development",
      description: "Specialized in creating interactive web experiences using Three.js, WebGL, and modern frameworks.",
      icon: "🎨"
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user interfaces with attention to detail and user experience.",
      icon: "✨"
    },
    {
      title: "Full-Stack Development",
      description: "Building robust applications from concept to deployment using cutting-edge technologies.",
      icon: "🚀"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient"
        >
          About Me
        </h2>
        
        <div ref={contentRef} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            I'm a passionate creative developer who bridges the gap between design and technology. 
            With expertise in 3D graphics, interactive animations, and modern web development, 
            I create digital experiences that captivate and inspire.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            My journey began with a fascination for pushing the boundaries of what's possible on the web. 
            Today, I specialize in creating immersive digital experiences that combine beautiful design 
            with cutting-edge technology.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <Card 
              key={index}
              className="glass-card p-8 text-center hover-glow transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce">
                {experience.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {experience.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-glow rounded-full opacity-10 animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-48 h-48 bg-gradient-secondary rounded-full opacity-10 animate-pulse-glow" />
      </div>
    </section>
  );
};