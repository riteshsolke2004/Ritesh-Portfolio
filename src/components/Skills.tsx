import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SVG Icon Components for Skills
const HtmlIcon = () => (
    <svg viewBox="0 0 1024 1024" className="w-20 h-20"><path fill="#E44D26" d="M128 904.9h768L848 119.1H176l-48 785.8z"/><path fill="#F16529" d="M512 847.8l263.7-71.5 64-648.3H512V847.8z"/><path fill="#EBEBEB" d="M288.7 348.8h223.3v85.2H333.1l6.7 82.5h172.2v85.2H346.5l10.8 120.7 154.7 41.8v91.4l-251-68.3-24-297.8h251zm223.3 85.2h-129l-4.5-50.5h133.5v50.5zm0 135.2h-180.7l-6 66.8 91.3 25.4v-40.7l-48.8-14-4.5-47.5h148.7v-85.2z"/><path fill="#FFF" d="M734.2 348.8H511.9v85.2h177.9l-16.1 180h-161.8v85.2h150.1l-14.3 162.2-135.8 37.9v91.4l251-68.3 35-373.4z"/></svg>
);

const CssIcon = () => (
    <svg viewBox="0 0 1024 1024" className="w-16 h-16"><path fill="#264DE4" d="M128 904.9h768L848 119.1H176l-48 785.8z"/><path fill="#2965F1" d="M512 847.8l263.7-71.5 64-648.3H512V847.8z"/><path fill="#EBEBEB" d="M288.7 348.8h223.3v85.2H333.1l6.7 82.5h172.2v85.2H346.5l10.8 120.7 154.7 41.8v91.4l-251-68.3-24-297.8h251zm223.3 85.2h-129l-4.5-50.5h133.5v50.5zm0 135.2h-180.7l-6 66.8 91.3 25.4v-40.7l-48.8-14-4.5-47.5h148.7v-85.2z"/><path fill="#FFF" d="M734.2 348.8H511.9v85.2h177.9l-16.1 180h-161.8v85.2h150.1l-14.3 162.2-135.8 37.9v91.4l251-68.3 35-373.4z"/></svg>
);

const JavaScriptIcon = () => (
    <svg viewBox="0 0 128 128" className="w-20 h-20"><path fill="#F7DF1E" d="M0 0h128v128H0z"/><path d="M104.7 103.9c-2.3 2.3-5.5 3.5-9.6 3.5-4.2 0-7.5-1.3-9.9-4-2.4-2.6-3.6-6-3.6-10.2 0-4.2 1.2-7.6 3.6-10.2 2.4-2.6 5.7-4 9.9-4 4.1 0 7.3 1.2 9.6 3.5 2.3 2.3 3.4 5.5 3.4 9.5 0 4.1-1.1 7.2-3.4 9.4zm-7.6-16.9c-1.3-1.3-3-2-5.1-2-2.1 0-3.8.7-5 2.1s-1.9 3.2-1.9 5.4c0 2.1.6 3.9 1.9 5.3 1.3 1.4 3 2.1 5.1 2.1 2.1 0 3.8-.7 5.1-2.1 1.3-1.4 1.9-3.2 1.9-5.3.1-2.2-.5-4.1-1.9-5.5zm-30.8 16.9c-2.3 2.3-5.5 3.5-9.6 3.5-4.2 0-7.5-1.3-9.9-4-2.4-2.6-3.6-6-3.6-10.2 0-4.2 1.2-7.6 3.6-10.2 2.4-2.6 5.7-4 9.9-4 4.1 0 7.3 1.2 9.6 3.5 2.3 2.3 3.4 5.5 3.4 9.5 0 4.1-1.1 7.2-3.4 9.4zm-7.6-16.9c-1.3-1.3-3-2-5.1-2-2.1 0-3.8.7-5 2.1s-1.9 3.2-1.9 5.4c0 2.1.6 3.9 1.9 5.3 1.3 1.4 3 2.1 5.1 2.1 2.1 0 3.8-.7 5.1-2.1 1.3-1.4 1.9-3.2 1.9-5.3.1-2.2-.5-4.1-1.9-5.5z"/></svg>
);

const ReactIcon = () => (
  <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-cyan-400"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16"><path fill="#007ACC" d="M0 0h128v128H0z"/><path fill="#FFF" d="M23.1 93.3h18.2v-51h29.2v-12h-76.6v12h29.2v51zm60-52.6c0-1.8.3-3.5.8-5.2s1.2-3.2 2.1-4.5 2-2.4 3.3-3.3 2.7-1.6 4.4-2.1 3.4-.8 5.2-.8c2.9 0 5.6.4 8.1 1.3s4.6 2.1 6.3 3.6 3 3.3 4 5.4 1.5 4.5 1.5 7.1v49.8h-16.7v-49.5c0-1.8-.2-3.3-.7-4.5s-1.2-2.1-2.1-2.7-2-1-3.2-1c-1.3 0-2.4.3-3.4.8s-1.8 1.4-2.5 2.5-.9 2.5-.9 4.1v49.3h-16.2v-49.8z"/></svg>
);

const ThreeJSIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.618L19.09 9 12 12.382 4.91 9 12 4.618zM4 16.382V9.618l8 4.444v6.764L4 16.382zm16 0L12 20.826v-6.764l8-4.444v6.764z" fill="currentColor" className="text-gray-400"/></svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 133 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16"><path d="M66.5 0C29.774 0 0 29.774 0 66.5c0 10.963 2.668 21.28 7.373 30.13C12.94 106.96 20.353 115 29.25 115c12.28 0 20.25-10.138 20.25-20.25 0-6.14-2.92-11.41-7.373-14.757-4.451-3.35-10.137-4.451-16.274-2.226-4.451 1.113-8.013 4.452-11.134 7.675C20.353 91.03 18.127 96.3 18.127 102.438c0 4.451 4.148 8.013 8.013 8.013 2.226 0 5.156-1.113 6.94-2.226 5.567-5.567 8.013-13.633 8.013-21.363 0-14.758 11.245-26.68 25.427-26.68 14.182 0 25.427 11.922 25.427 26.68 0 7.73-2.446 15.796-8.013 21.363-1.784 1.113-4.714 2.226-6.94 2.226-3.865 0-8.013-3.562-8.013-8.013 0-6.139-2.226-11.407-6.59-16.975-3.121-3.224-6.682-6.562-11.134-7.675-6.138-2.225-11.823-1.101-16.274 2.226-4.452 3.346-7.373 8.617-7.373 14.757 0 10.112 8.013 20.25 20.25 20.25 8.897 0 16.31-8.04 21.185-18.158C96.332 97.72 99 87.397 99 77.438c0-36.726-29.774-66.5-66.5-66.5H66.5z" transform="translate(17 2.188)" fill="#38BDF8"></path></svg>
);

const GsapIcon = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16"><path fill="#88CE02" d="M83.2,20.3c-2.4-2.4-5.6-3.9-9.1-3.9c-3.6,0-7,1.6-9.5,4.2c-2.6,2.7-4.2,6.3-4.2,10.2c0,3.9,1.5,7.4,4.1,10.1 c2.6,2.7,6.1,4.2,9.7,4.2c3.5,0,6.7-1.5,9.1-3.9c2.4-2.4,3.9-5.6,3.9-9.1C87.1,25.9,85.6,22.7,83.2,20.3z M78,38.2 c-1.6,1.6-3.6,2.6-5.8,2.6c-2.2,0-4.2-0.9-5.8-2.5c-1.6-1.6-2.6-3.7-2.6-5.9c0-2.2,1-4.3,2.6-5.9c1.6-1.6,3.7-2.6,5.9-2.6 c2.2,0,4.3,1,5.9,2.6c1.6,1.6,2.6,3.7,2.6,5.9C80.6,34.5,79.6,36.6,78,38.2z M45.8,16.4h-9.9v16.1L24.8,16.4h-9.9v35.3h7.8V35.6 l11.1,16.1h9.9V16.4z"/></svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-3.5h-2v-3h2V8.5h3v2h2v3h-2v3.5h-3z" fill="#306998"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 8.5v3.5h2v3h-2V21h-3v-2h-2v-3h2v-3.5h3z" fill="#FFD43B"/></svg>
);

const FastApiIcon = () => (
    <svg viewBox="0 0 24 24" className="w-16 h-16"><path fill="#009688" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,6V12.5H17.5V14.5H10.5V6H12.5Z" /></svg>
);

const MongoDbIcon = () => (
    <svg viewBox="0 0 24 24" className="w-16 h-16"><path fill="#4DB33D" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.42 18.94,16.5 17.2,17.9L12,12.7V4M11,4V10.7L5.5,15.2C4.5,14 4,12.5 4,11A8,8 0 0,1 11,4Z" /></svg>
);

const SqlIcon = () => (
    <svg viewBox="0 0 24 24" className="w-16 h-16"><path fill="#00758F" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,6V10H8V12H11V16H13V12H16V10H13V6H11Z" /></svg>
);


const frontendSkills = [
  { name: 'HTML', Icon: HtmlIcon },
  { name: 'CSS', Icon: CssIcon },
  { name: 'JavaScript', Icon: JavaScriptIcon },
  { name: 'React', Icon: ReactIcon },
  { name: 'TypeScript', Icon: TypeScriptIcon },
  { name: 'Three.js', Icon: ThreeJSIcon },
  { name: 'Tailwind CSS', Icon: TailwindIcon },
  { name: 'GSAP', Icon: GsapIcon },
];

const backendSkills = [
  { name: 'Python', Icon: PythonIcon },
  { name: 'FastAPI', Icon: FastApiIcon },
  { name: 'MongoDB', Icon: MongoDbIcon },
  { name: 'SQL', Icon: SqlIcon },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const frontendSkillsRef = useRef<HTMLDivElement>(null);
  const backendSkillsRef = useRef<HTMLDivElement>(null);

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

    gsap.fromTo(frontendSkillsRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: frontendSkillsRef.current,
          start: "top 80%",
        }
      }
    );
    
    gsap.fromTo(backendSkillsRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: backendSkillsRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Skills & Expertise
        </h2>
        
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-primary">Frontend</h3>
            <div ref={frontendSkillsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {frontendSkills.map((skill) => (
                <Card 
                key={skill.name}
                className="glass-card p-6 flex flex-col items-center justify-center text-center hover-glow transition-all duration-300 hover:scale-110 group"
                >
                <skill.Icon />
                <p className="mt-4 text-sm font-semibold text-foreground">{skill.name}</p>
                </Card>
            ))}
            </div>
        </div>

        <div>
            <h3 className="text-3xl font-bold text-center mb-8 text-primary">Backend</h3>
            <div ref={backendSkillsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center">
            {backendSkills.map((skill) => (
                <Card 
                key={skill.name}
                className="glass-card p-6 flex flex-col items-center justify-center text-center hover-glow transition-all duration-300 hover:scale-110 group"
                >
                <skill.Icon />
                <p className="mt-4 text-sm font-semibold text-foreground">{skill.name}</p>
                </Card>
            ))}
            </div>
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-glow rounded-full opacity-10 animate-pulse-glow" />
        <div className="absolute bottom-1/4 -left-32 w-48 h-48 bg-gradient-secondary rounded-full opacity-10 animate-float" />
      </div>
    </section>
  );
};