import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

    // Projects stagger animation
    gsap.fromTo(projectsRef.current?.children || [],
      { y: 80, opacity: 0, rotationX: 15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const projects = [
    {
      title: "Health Monitor System",
      description:"This project is a Health Monitor System that continuously tracks key vital signs like heart rate, temperature, and oxygen level. It uses sensors to collect real-time data and displays it on a user-friendly interface. The system helps in early detection of health abnormalities and is ideal for personal or remote patient monitoring.",
      image: "/project-health-monitor.png",
      tags: ["React.js", "Python", "Fastapi", "Machine Learning"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "AI-Powered Sentiment Analysis",
      description: "This project classifies the sentiment of user reviews into positive, negative, or neutral categories using a machine learning model trained on labeled data. It relies on feature extraction techniques and manual preprocessing rather than advanced NLP libraries.",
      image: "/project-sentiment-analysis.png",
      tags: ["React", "Python", "MongoDB", "Fastapi"],
      liveUrl: "#",
      githubUrl: "https://github.com/riteshsolke2004/opinion-pulse-monitor.git"
    },
    {
      title: "Cyberpunk Game Interface",
      description: "A futuristic game UI with neon aesthetics, animated elements, and immersive sound design for enhanced user experience.",
      image: "/project-cyberpunk-game.png",
      tags: ["Vue.js", "CSS3", "WebAudio", "GSAP"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 px-6 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Featured Projects
        </h2>
        
        <div ref={projectsRef} className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="glass-card overflow-hidden hover-glow transition-all duration-500 hover:scale-105 group"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary group-hover:neon-text transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      variant="secondary"
                      className="bg-secondary/20 text-secondary border-secondary/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary-glow hover-glow"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-glow rounded-full opacity-5 animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-secondary rounded-full opacity-5 animate-float" />
      </div>
    </section>
  );
};