import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Terminal, Code2, Play } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import profileImage from '../../public/profile-picture.jpg';
import { gsap } from 'gsap';

export const Hero = () => {
  const [codeText, setCodeText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const fullCode = `const developer = {
  name: "Ritesh Solke",
  roles: ["Full Stack", "DevOps Engineer"],
  location: "Pune, India",
  skills: ["React", "Node.js", "AWS", "Docker"],
  passion: "Building digital experiences",
  
  isAvailableForHire: true,
  
  sayHi: function() {
    console.log("Welcome to my portfolio!");
  }
};

developer.sayHi();`;

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(fullCode.slice(0, i));
      i++;
      if (i > fullCode.length) {
        clearInterval(interval);
      }
    }, 40); // typing speed

    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Syntax highlighting logic
  const highlightCode = (code: string) => {
    let html = code
      .replace(/const|function/g, '<span style="color: #c678dd">$&</span>')
      .replace(/developer/g, '<span style="color: #e5c07b">developer</span>')
      .replace(/name:|roles:|location:|skills:|passion:|isAvailableForHire:|sayHi:/g, match => `<span style="color: #e06c75">${match}</span>`)
      .replace(/"(.*?)"/g, '<span style="color: #98c379">"$1"</span>')
      .replace(/true/g, '<span style="color: #d19a66">true</span>')
      .replace(/console\.log/g, '<span style="color: #56b6c2">console.log</span>')
      .replace(/\{|\}|\[|\]|\(|\)/g, match => `<span style="color: #abb2bf">${match}</span>`);
    return { __html: html };
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24 md:pt-20">
      
      {/* ── Original Background Maintained ── */}
      <div className="absolute inset-0 bg-black z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/5 via-purple-950/5 to-cyan-950/5 z-[3]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black z-[4]" />

      <div className="relative z-[10] px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Side: Profile & Actions ── */}
          <div className="flex flex-col items-center lg:items-start order-2 lg:order-1">
            
            {/* Profile Image with Glow */}
            <div className="relative group mb-10 mt-8 lg:mt-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-slate-700/50 backdrop-blur-sm shadow-2xl transform group-hover:scale-105 transition-transform duration-500 z-10">
                <img
                  src={profileImage}
                  alt="Ritesh Solke"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative planets orbiting profile */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl z-0" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl z-0" />
            </div>

            {/* Title / Intro */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Ritesh</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-medium">
                Engineering scalable solutions & seamless experiences.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { icon: FaGithub, href: 'https://github.com/riteshsolke2004', label: 'GitHub', defaultColor: 'text-white', hoverColor: 'hover:bg-[#333] hover:text-white hover:border-[#333] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/riteshsolke/', label: 'LinkedIn', defaultColor: 'text-[#0077b5]', hoverColor: 'hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]' },
                { icon: SiGmail, href: 'mailto:riteshsolke12@gmail.com', label: 'Email', defaultColor: 'text-[#ea4335]', hoverColor: 'hover:bg-[#ea4335] hover:text-white hover:border-[#ea4335] hover:shadow-[0_0_20px_rgba(234,67,53,0.4)]' },
                { icon: FaInstagram, href: 'https://instagram.com/_.ritesh._18', label: 'Instagram', defaultColor: 'text-[#E1306C]', hoverColor: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]' },
              ].map(({ icon: Icon, href, label, defaultColor, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`magnetic p-3.5 rounded-2xl border border-slate-700/50 bg-slate-800/30 ${defaultColor} transition-all duration-300 hover:scale-110 hover:-translate-y-1 backdrop-blur-sm ${hoverColor}`}
                  aria-label={label}
                >
                  <Icon className="w-7 h-7 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Side: Live Code Editor (Idea 2) ── */}
          <div className="order-1 lg:order-2 w-full perspective-1000">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-[#1e1e2e] shadow-2xl transform transition-transform duration-500 hover:rotate-y-2 hover:rotate-x-2"
                 style={{ boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)' }}>
              
              {/* VS Code Mac Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#181825] border-b border-slate-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Code2 className="w-4 h-4" />
                  <span>profile.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Editor Content Area */}
              <div className="flex">
                {/* Line Numbers */}
                <div className="py-4 px-4 text-right text-slate-500 text-sm font-mono select-none bg-[#181825]/50 border-r border-slate-700/30">
                  {fullCode.split('\n').map((_, i) => (
                    <div key={i} className="leading-relaxed opacity-50">{i + 1}</div>
                  ))}
                </div>

                {/* Typed Code */}
                <div className="p-4 w-full overflow-x-auto">
                  <pre className="text-sm font-mono leading-relaxed text-slate-300 whitespace-pre">
                    <code dangerouslySetInnerHTML={highlightCode(codeText)} />
                    <span 
                      className="inline-block w-2 h-4 ml-1 bg-blue-400 align-middle"
                      style={{ opacity: showCursor ? 1 : 0 }} 
                    />
                  </pre>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
