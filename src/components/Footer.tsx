import React, { useState } from 'react';
import { Terminal, Power, ChevronRight, MapPin, Phone, Code2, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export const Footer = () => {
  const [isRebooting, setIsRebooting] = useState(false);

  const handleReboot = () => {
    if (isRebooting) return;
    setIsRebooting(true);
    
    // Simulate a system reboot delay before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset state after scroll completes
      setTimeout(() => {
        setIsRebooting(false);
      }, 1000);
    }, 600);
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/riteshsolke2004', icon: FaGithub, color: 'text-white hover:text-white', bg: 'hover:bg-[#333]' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/riteshsolke/', icon: FaLinkedin, color: 'text-[#0077b5] hover:text-white', bg: 'hover:bg-[#0077b5]' },
    { name: 'Instagram', href: 'https://www.instagram.com/_.ritesh._18/', icon: FaInstagram, color: 'text-[#E1306C] hover:text-white', bg: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent' },
    { name: 'Email', href: 'mailto:riteshsolke12@gmail.com', icon: SiGmail, color: 'text-[#ea4335] hover:text-white', bg: 'hover:bg-[#ea4335]' }
  ];

  const quickLinks = [
    { name: 'home', href: '#hero' },
    { name: 'about', href: '#about' },
    { name: 'projects', href: '#projects' },
    { name: 'skills', href: '#skills' },
    { name: 'education', href: '#education' },
    { name: 'achievements', href: '#achievements' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050508] border-t border-slate-800/80 overflow-hidden font-mono pt-20 pb-10">
      
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden z-0">
        <h1 className="text-[10vw] font-black text-white/[0.02] whitespace-nowrap tracking-tighter">
          &gt; SYSTEM_LOGOUT
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Top Status Bar */}
        <div className="flex items-center gap-3 mb-16 pb-4 border-b border-slate-800/50">
          <Terminal className="w-5 h-5 text-red-500" />
          <span className="text-red-500 font-bold tracking-widest text-sm">SESSION_TERMINATED</span>
          <div className="w-full h-[1px] bg-gradient-to-r from-red-500/20 to-transparent flex-grow ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Left Column: Identity & Contact */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-white tracking-widest mb-2">RITESH_SOLKE</h2>
              <p className="text-green-400 text-sm flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span className="typing-effect">FULL_STACK_ENGINEER</span>
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-black/50 border border-slate-800/50 space-y-4">
              <div className="text-slate-500 text-xs tracking-widest mb-2 border-b border-slate-800 pb-2">
                // SYSTEM_CONTACT_INFO
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm hover:text-white transition-colors cursor-default">
                <MapPin className="w-4 h-4 text-slate-500" />
                Pune, Maharashtra, India
              </div>
              <a href="mailto:riteshsolke12@gmail.com" className="flex items-center gap-3 text-slate-300 text-sm hover:text-green-400 transition-colors group">
                <Mail className="w-4 h-4 text-slate-500 group-hover:text-green-400 transition-colors" />
                riteshsolke12@gmail.com
              </a>
              <a href="tel:+918799993086" className="flex items-center gap-3 text-slate-300 text-sm hover:text-green-400 transition-colors group">
                <Phone className="w-4 h-4 text-slate-500 group-hover:text-green-400 transition-colors" />
                +91 8799993086
              </a>
            </div>
          </div>

          {/* Middle Column: Directories */}
          <div className="md:col-span-6 lg:col-span-4">
            <div className="text-slate-500 text-xs tracking-widest mb-6">
              // DIRECTORY_ACCESS
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="group flex items-center text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    <span className="text-slate-600 mr-2 group-hover:text-green-500 transition-colors">cd</span>
                    <span className="text-blue-400/80 group-hover:text-blue-400 transition-colors">/root/</span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-green-500 ml-2 animate-pulse">_</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Social Nodes */}
          <div className="md:col-span-6 lg:col-span-3">
            <div className="text-slate-500 text-xs tracking-widest mb-6">
              // EXTERNAL_NODES
            </div>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border border-slate-800/50 bg-black/30 transition-all duration-300 hover:-translate-y-1 ${social.bg} group`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${social.color} transition-colors`} />
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Footer Bottom: Reboot Sequence ── */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-slate-500 text-xs">
            © {currentYear} RITESH_SOLKE. ALL_RIGHTS_RESERVED.
          </div>

          {/* The Reboot Button */}
          <button
            onClick={handleReboot}
            disabled={isRebooting}
            className={`
              relative overflow-hidden group flex items-center gap-3 px-6 py-3 rounded-none border-2 transition-all duration-300 font-bold tracking-widest text-sm
              ${isRebooting 
                ? 'bg-red-500 text-white border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' 
                : 'bg-transparent text-red-500 border-red-500/50 hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
              }
            `}
          >
            {/* Glitch Overlay Effect */}
            <div className="absolute inset-0 bg-red-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
            
            <Power className={`w-4 h-4 ${isRebooting ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
            
            <span>
              {isRebooting ? 'REBOOTING SYSTEM...' : '[ INITIATE REBOOT ]'}
            </span>
            
            {!isRebooting && (
              <span className="absolute right-3 opacity-0 group-hover:opacity-100 text-red-400 animate-pulse">_</span>
            )}
          </button>
          
        </div>
      </div>
      
      <style>{`
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #4ade80;
          animation: typing 3s steps(40, end), blink-caret .75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #4ade80; }
        }
      `}</style>
    </footer>
  );
};
