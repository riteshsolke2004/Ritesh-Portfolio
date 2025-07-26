import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
        }
      }
    );

    gsap.fromTo(imageRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(contentRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );
    
    listItemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5 + index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          }
        }
      );
    });

  }, []);

  const highlights = [
    "Interactive Frontend Development with React & Three.js",
    "Robust Backend Solutions with Python & FastAPI",
    "AI-Powered Applications & Machine Learning Models"
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
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative w-full h-96">
            <img src="/ai-developer.png" alt="AI Developer" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-glow opacity-30 rounded-full" />
          </div>
          
          <div ref={contentRef}>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Hi, I'm Ritesh Solke, a passionate and curious computer engineering student with a strong interest in web development, machine learning, and AI-based solutions. 
              I enjoy building interactive and dynamic applications that solve real-world problems.
            </p>
            
            <ul className="space-y-4">
              {highlights.map((text, index) => (
                <li key={index} ref={el => listItemsRef.current[index] = el} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1" />
                  <span className="text-lg text-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};