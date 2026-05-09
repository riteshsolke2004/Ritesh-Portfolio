import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Code,
  Calendar,
  Users,
  Award,
  Download,
  Mail,
  Terminal,
  Zap,
  Globe,
  Rocket
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // 1. Animate the glowing timeline line growing down as you scroll
    if (lineRef.current && containerRef.current) {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );
    }

    // 2. Timeline items fade and slide in as you scroll past them
    const items = gsap.utils.toArray('.story-item') as HTMLElement[];
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, x: 50, filter: 'blur(10px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
    });

    // 3. Stats section slamming down and counting up
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      
      gsap.fromTo(statCards,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        }
      );

      const numbers = statsRef.current.querySelectorAll('.stat-num');
      numbers.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const isPlus = el.getAttribute('data-target')?.includes('+');
        const isPercent = el.getAttribute('data-target')?.includes('%');
        
        gsap.fromTo(el, 
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
            onUpdate: function() {
              if (el) el.innerHTML = Math.round(this.targets()[0].innerHTML) + (isPlus ? '+' : '') + (isPercent ? '%' : '');
            }
          }
        );
      });
    }

  }, { scope: containerRef });

  const journey = [
    { 
      icon: Terminal, 
      title: 'The Spark', 
      year: '2022',
      description: 'My journey began with a simple "Hello World". I fell in love with coding, diving deep into HTML, CSS, and JavaScript. I built my first responsive website and realized I wanted to do this for a living.',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Zap, 
      title: 'The Frontend Grind', 
      year: '2023',
      description: 'I mastered the React ecosystem, learning TypeScript, modern state management, and highly interactive UI animations. I started building complex single-page applications.',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Globe, 
      title: 'Going Full-Stack', 
      year: '2024',
      description: 'I expanded my horizons to backend engineering. I learned Node.js, Express, FastAPI, and database management, allowing me to build end-to-end, full-stack applications.',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Rocket, 
      title: 'The Mastery & Beyond', 
      year: 'Present',
      description: 'Now, I focus on scalable cloud architectures (AWS/Docker) and AI integrations. I build enterprise-grade software and continuous delivery pipelines as a DevOps Engineer.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { target: '10+', label: 'Projects Completed', icon: Code, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { target: '2+', label: 'Years Experience', icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { target: '10+', label: 'Happy Clients', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { target: '100%', label: 'Satisfaction', icon: Award, color: 'text-orange-400', bg: 'bg-orange-500/10' }
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-black">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={containerRef}>
        
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* ── Left Side: Sticky Profile Card & Stats ── */}
          <div className="lg:col-span-5 h-fit lg:sticky lg:top-8 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Me.</span>
            </h2>
            
            <Card className="relative overflow-hidden p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-slate-700/50 transform group-hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <img src="/profile-picture.jpg" alt="Ritesh Solke" className="w-full h-full object-cover" />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-slate-900"></span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">Ritesh Solke</h3>
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm mb-6">
                  Full-Stack Web Developer
                </div>

                <div className="w-full space-y-3 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-slate-800/50 text-sm">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-slate-300 font-mono">riteshsolke12@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-slate-800/50 text-sm">
                    <Code className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300 font-mono">React + FastAPI</span>
                  </div>
                </div>

              </div>
            </Card>

            {/* Stats Section */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div key={i} className="stat-card p-4 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/50 flex flex-col items-center justify-center text-center group hover:bg-slate-800/80 transition-colors shadow-xl">
                    <div className={`p-2 rounded-full ${stat.bg} mb-3 group-hover:scale-110 transition-transform`}>
                      <StatIcon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <h4 
                      className="stat-num text-3xl font-black text-white tracking-tighter mb-1"
                      data-target={stat.target}
                    >
                      0
                    </h4>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Final explosive Resume Button */}
            <a href="/Ritesh Solke's CV.pdf" download className="block pb-8 lg:pb-0">
              <Button className="magnetic w-full h-14 text-base font-bold bg-white text-black hover:bg-slate-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] rounded-xl group">
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  DOWNLOAD FULL RESUME
                </span>
              </Button>
            </a>
          </div>

          {/* ── Right Side: Interactive Scroll Timeline ── */}
          <div className="lg:col-span-7 relative pt-8 lg:pt-0">
            
            {/* The Glowing Timeline Line */}
            <div className="absolute left-6 md:left-10 top-0 bottom-0 w-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                ref={lineRef} 
                className="w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
              />
            </div>

            <div className="space-y-16 ml-16 md:ml-24 pb-16">
              {journey.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="story-item relative">
                    {/* The glowing dot on the timeline */}
                    <div className={`absolute -left-16 md:-left-24 top-0 w-10 h-10 rounded-full bg-black border-2 border-slate-700 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,1)]`}>
                       <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg`} />
                    </div>

                    <h4 className={`text-sm font-bold tracking-widest uppercase mb-2 text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                      {item.year}
                    </h4>
                    
                    <Card className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                );
              })}



            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
