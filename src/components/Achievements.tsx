import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Shield, Code, Zap, Star, Medal, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { title:'Hackathon Finalist',       org:'MIT Kurukshetra',      date:'2025', desc:'Finalist in a national-level hackathon for building an innovative AI-powered real estate intelligence platform. Competed among 200+ teams.', Icon:Trophy, accent:'#fbbf24', category:'Award',         tag:'🏆' },
  { title:'AWS Cloud Practitioner',   org:'Amazon Web Services',  date:'2025', desc:'Demonstrated cloud computing knowledge and skills to effectively work with AWS core services, architecture, and best practices.',            Icon:Shield, accent:'#ff9900', category:'Certification',  tag:'☁️' },
  { title:'React JS Mastery',         org:'FreeCodeCamp',          date:'2024', desc:'Advanced certification in React.js covering hooks, context, state management, performance optimization, and modern React patterns.',          Icon:Code,   accent:'#61dafb', category:'Certification',  tag:'⚛️' },
  { title:'Best Project Award',       org:'College Tech Fest',    date:'2023', desc:'Awarded for the most innovative full-stack web application among 100+ competing student projects at the annual college technology festival.',   Icon:Star,   accent:'#c084fc', category:'Award',         tag:'⭐' },
  { title:'Docker & Kubernetes',      org:'TrainWithShubham',     date:'2025', desc:'Certified in containerization and container orchestration technologies for building and deploying scalable, production-ready applications.',   Icon:Zap,    accent:'#2496ed', category:'Certification',  tag:'🐳' },
  { title:'MongoDB Developer Cert',   org:'MongoDB Community',    date:'2024', desc:'Expert-level certification in MongoDB covering database design, complex aggregation pipelines, indexing, and performance optimization.',       Icon:Medal,  accent:'#4db33d',category:'Certification',  tag:'🍃' },
  { title:'Git & GitHub Expert',      org:'Lets Upgrade',         date:'2024', desc:'Expert certification in Git version control, GitHub workflows, branching strategies, pull requests, and collaborative CI/CD pipeline setups.', Icon:Award,  accent:'#f05032', category:'Certification',  tag:'🔀' },
];

/* ── Hexagon Card ───────────────────────────────────────────────────── */
const HexCard = ({ card, index }: { card: typeof CARDS[0]; index: number }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { Icon } = card;

  // Entrance stagger animation
  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(wrapRef.current,
      { opacity: 0, scale: 0.5, rotation: -15 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.5)',
        delay: index * 0.1,
        scrollTrigger: { trigger: wrapRef.current, start: 'top 85%' } }
    );
  }, [index]);

  return (
    <div 
      ref={wrapRef}
      className="relative flex justify-center items-center w-[220px] h-[250px] md:w-[280px] md:h-[320px] shrink-0 snap-center transition-all duration-500 ease-out group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      style={{
        zIndex: hovered ? 50 : 10,
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        filter: hovered ? `drop-shadow(0 0 25px ${card.accent}80)` : 'drop-shadow(0 0 8px rgba(255,255,255,0.05))',
      }}
    >
      {/* Outer Hexagon (Glowing Border) */}
      <div 
        className="absolute inset-0 transition-colors duration-500"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: hovered ? card.accent : '#1e293b',
        }}
      />
      
      {/* Inner Hexagon (Dark Background) */}
      <div 
        className="absolute inset-[2px] transition-all duration-500 flex flex-col items-center justify-center p-4 md:p-6 text-center"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: hovered ? `radial-gradient(circle at center, #0f172a, #050508)` : '#050508',
        }}
      >
        {/* Dynamic Content Swap based on Hover */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-500 ${hovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div 
            className="p-3 md:p-4 rounded-2xl mb-3 md:mb-4 transition-transform duration-500"
            style={{ 
              background: `radial-gradient(circle, ${card.accent}40, transparent)`,
              boxShadow: `0 0 20px ${card.accent}20` 
            }}
          >
            <Icon color={card.accent} className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
          </div>
          <span className="text-[10px] md:text-xs font-bold tracking-widest px-2 md:px-3 py-1 rounded-full mb-2 md:mb-3 bg-white/5 text-slate-400 border border-white/10">
            {card.tag} {card.category.toUpperCase()}
          </span>
          <h3 className="text-white font-bold text-sm md:text-lg leading-tight">{card.title}</h3>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-500 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <Icon color={card.accent} className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2 opacity-50" />
          <h3 className="text-white font-black text-xs md:text-sm leading-tight mb-1 md:mb-2" style={{ color: card.accent }}>{card.title}</h3>
          <p className="text-[10px] md:text-xs text-slate-300 leading-relaxed line-clamp-3 md:line-clamp-4 mb-2 md:mb-3">{card.desc}</p>
          <div className="w-full h-px bg-white/10 mb-1 md:mb-2" />
          <p className="text-[9px] md:text-[10px] text-slate-500 font-mono tracking-widest uppercase">{card.org}</p>
          <p className="text-[9px] md:text-[10px] font-bold mt-1" style={{ color: card.accent }}>{card.date}</p>
        </div>
      </div>
    </div>
  );
};

export const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );
    }
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 px-4 bg-[#020204] overflow-hidden">
      
      {/* Sci-Fi Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Hexagon wireframe background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.923' viewBox='0 0 60 103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 103.923px' }} />
        
        {/* Glowing orbs */}
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4 tracking-widest uppercase">
            <Shield className="w-4 h-4 mr-2" /> Classified Records
          </div>
          <h2 ref={headingRef} className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Certifications</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base tracking-wide">
            Hover over any data node to decrypt the classified details.
          </p>
        </div>

        {/* Hexagon Grid Layout */}
        <div className="flex sm:flex-wrap sm:justify-center items-center gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto overflow-x-auto py-12 px-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CARDS.map((card, idx) => (
            <HexCard key={idx} card={card} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
