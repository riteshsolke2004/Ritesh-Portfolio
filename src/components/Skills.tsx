import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);

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
          toggleActions: "play none none reverse"
        }
      }
    );

    // Skills cards animation
    gsap.fromTo(skillsRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate progress bars
    progressRefs.current.forEach((progressRef, index) => {
      if (progressRef) {
        const progressBar = progressRef.querySelector('[data-progress]');
        if (progressBar) {
          gsap.fromTo(progressBar,
            { width: "0%" },
            {
              width: progressBar.getAttribute('data-progress') + "%",
              duration: 1.5,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: progressRef,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }
    });

  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Three.js/WebGL", level: 85 },
        { name: "CSS3/Tailwind", level: 92 }
      ]
    },
    {
      title: "3D & Animation",
      icon: "🎬",
      skills: [
        { name: "Three.js", level: 88 },
        { name: "GSAP", level: 85 },
        { name: "Blender", level: 75 },
        { name: "WebGL", level: 80 }
      ]
    },
    {
      title: "Backend & Tools",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 87 },
        { name: "Python", level: 82 },
        { name: "Docker", level: 78 },
        { name: "AWS/Cloud", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Skills & Expertise
        </h2>
        
        <div ref={skillsRef} className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex}
              className="glass-card p-8 hover-glow transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4 group-hover:animate-bounce">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    ref={el => {
                      if (el) progressRefs.current[categoryIndex * 4 + skillIndex] = el;
                    }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-primary rounded-full shadow-glow-primary"
                        data-progress={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Floating tech icons */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-8 mt-16 opacity-20">
          {['⚛️', '🔥', '💎', '🚀', '⚡', '🎨', '🛠️', '🔮'].map((icon, index) => (
            <div 
              key={index}
              className="text-4xl text-center animate-float"
              style={{ 
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${4 + index * 0.5}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-glow rounded-full opacity-10 animate-pulse-glow" />
        <div className="absolute bottom-1/4 -left-32 w-48 h-48 bg-gradient-secondary rounded-full opacity-10 animate-float" />
      </div>
    </section>
  );
};