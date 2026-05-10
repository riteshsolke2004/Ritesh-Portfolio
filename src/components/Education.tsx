import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, BookOpen, TrendingUp, ChevronLeft, ChevronRight, Award, Calendar, MapPin } from 'lucide-react';
import { gsap } from 'gsap';

export const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const educationDB = [
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "JSPMS JAYAWANTRAO SAWANT COLLEGE OF ENGINEERING",
      location: "Pune, Maharashtra, India",
      duration: "2023 - 2027",
      grade: "9.1 CGPA",
      description: "Specialized in Full-Stack Development, Cloud Computing, and DevOps practices. Active member of coding clubs and led multiple technical projects.",
      achievements: [
        "Technical Lead of AI ROBOTICS CLUB",
        "Led college tech fest organizing committee",
      ],
      color: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.3)",
      solidColor: "#3b82f6",
      icon: GraduationCap,
      type: "DEGREE"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Jai Hind English Medium School & Junior College",
      location: "Dabhadi, Maharashtra",
      duration: "2021 - 2023",
      grade: "72.50%",
      description: "Focused on Science stream with Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving foundations.",
      achievements: [
        "3rd Place in state board examinations",
        "District Level Inspired Award Winner",
        "School science exhibition winner"
      ],
      color: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.3)",
      solidColor: "#a855f7",
      icon: BookOpen,
      type: "CERTIFICATE"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Janata Vidyalaya High School",
      location: "Aghar Bk, Maharashtra",
      duration: "2020 - 2021",
      grade: "90.00%",
      description: "Completed secondary education with distinction. Demonstrated excellence in Mathematics and Science subjects.",
      achievements: [
        "2nd Rank in SSC Board Exams",
        "School topper in Mathematics",
        "District level quiz competition winner",
      ],
      color: "from-orange-500 to-red-500",
      glowColor: "rgba(249, 115, 22, 0.3)",
      solidColor: "#f97316",
      icon: TrendingUp,
      type: "CERTIFICATE"
    }
  ];

  const handleNext = () => {
    animateTransition(() => {
      setActiveIndex((prev) => (prev + 1) % educationDB.length);
    }, 1);
  };

  const handlePrev = () => {
    animateTransition(() => {
      setActiveIndex((prev) => (prev === 0 ? educationDB.length - 1 : prev - 1));
    }, -1);
  };

  const animateTransition = (updateState: () => void, direction: number) => {
    if (!contentRef.current) return;
    
    // Slide out
    gsap.to(contentRef.current, {
      x: direction * -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        updateState();
        // Slide in
        gsap.fromTo(contentRef.current, 
          { x: direction * 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  // 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1500,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const current = educationDB[activeIndex];
  const Icon = current.icon;

  return (
    <section id="education" className="relative py-24 bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Ambience */}
      <div 
        className="absolute inset-0 transition-colors duration-1000 ease-in-out opacity-40 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${current.glowColor} 0%, transparent 60%)`
        }}
      />
      
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-16 text-center">
          Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">History.</span>
        </h2>

        {/* Carousel Container */}
        <div className="flex items-center justify-center w-full max-w-5xl gap-4 md:gap-8">
          
          {/* Prev Button */}
          <button 
            onClick={handlePrev}
            className="hidden md:flex p-4 rounded-full bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 text-white transition-all hover:scale-110 backdrop-blur-md z-20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Holographic Certificate Card */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-3xl rounded-3xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* The Glass Container */}
            <div className="relative w-full rounded-3xl p-1 bg-gradient-to-br from-white/20 via-white/5 to-white/0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              
              {/* Inner Border / Gloss */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
              
              {/* Content Wrapper */}
              <div 
                ref={contentRef}
                className="relative bg-[#0a0a0f]/80 backdrop-blur-3xl rounded-[22px] p-8 md:p-12 overflow-hidden h-[650px] md:h-[550px] flex flex-col"
              >
                {/* Certificate Background Elements */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${current.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none`} />
                
                {/* Header */}
                <div className="flex justify-between items-start mb-8 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/50 bg-black/50 text-xs font-mono font-bold tracking-widest text-slate-300 mb-4">
                      <Icon className="w-4 h-4" style={{ color: current.solidColor }} />
                      {current.type}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-xl">
                      {current.degree}
                    </h3>
                  </div>
                  <div className={`hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br ${current.color} p-0.5 shadow-2xl shrink-0`}>
                    <div className="w-full h-full bg-black/80 rounded-[14px] flex items-center justify-center">
                      <Award className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <MapPin className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Institution</p>
                        <p className="text-slate-200 font-medium text-sm md:text-base leading-snug">{current.institution}</p>
                        <p className="text-slate-400 text-sm mt-1">{current.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Duration</p>
                        <p className="text-slate-200 font-medium">{current.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Grade</p>
                        <p className="text-xl font-bold" style={{ color: current.solidColor }}>{current.grade}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description & Achievements */}
                <div className="relative z-10 flex-grow" style={{ transform: 'translateZ(10px)' }}>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                    {current.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Key Achievements</p>
                    {current.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 bg-gradient-to-r ${current.color} shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                        <p className="text-slate-300 text-sm">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination Dots (Mobile & Visual) */}
                <div className="absolute bottom-6 left-0 w-full flex justify-center gap-3 z-20">
                  {educationDB.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="hidden md:flex p-4 rounded-full bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 text-white transition-all hover:scale-110 backdrop-blur-md z-20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center justify-center gap-6 mt-8 z-20">
          <button 
            onClick={handlePrev}
            className="p-4 rounded-full bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 text-white active:scale-95 transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-slate-400 font-mono text-sm tracking-widest">
            {activeIndex + 1} / {educationDB.length}
          </span>
          <button 
            onClick={handleNext}
            className="p-4 rounded-full bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 text-white active:scale-95 transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
};
