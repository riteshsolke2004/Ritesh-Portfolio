import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Shield, Code, Zap, Star, Medal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { title:'Hackathon Finalist',       org:'MIT Kurukshetra',      date:'2025', desc:'Finalist in a national-level hackathon for building an innovative AI-powered real estate intelligence platform. Competed among 200+ teams.', Icon:Trophy, gradient:'from-yellow-500 to-amber-500',  accent:'#fbbf24', category:'Award',         tag:'🏆' },
  { title:'AWS Cloud Practitioner',   org:'Amazon Web Services',  date:'2025', desc:'Demonstrated cloud computing knowledge and skills to effectively work with AWS core services, architecture, and best practices.',            Icon:Shield, gradient:'from-orange-500 to-yellow-500',accent:'#ff9900', category:'Certification',  tag:'☁️' },
  { title:'React JS Mastery',         org:'FreeCodeCamp',          date:'2024', desc:'Advanced certification in React.js covering hooks, context, state management, performance optimization, and modern React patterns.',          Icon:Code,   gradient:'from-cyan-400 to-blue-500',  accent:'#61dafb', category:'Certification',  tag:'⚛️' },
  { title:'Best Project Award',       org:'College Tech Fest',    date:'2023', desc:'Awarded for the most innovative full-stack web application among 100+ competing student projects at the annual college technology festival.',   Icon:Star,   gradient:'from-purple-500 to-pink-500', accent:'#c084fc', category:'Award',         tag:'⭐' },
  { title:'Docker & Kubernetes',      org:'TrainWithShubham',     date:'2025', desc:'Certified in containerization and container orchestration technologies for building and deploying scalable, production-ready applications.',   Icon:Zap,    gradient:'from-blue-500 to-indigo-600', accent:'#2496ed', category:'Certification',  tag:'🐳' },
  { title:'MongoDB Developer Cert',   org:'MongoDB Community',    date:'2024', desc:'Expert-level certification in MongoDB covering database design, complex aggregation pipelines, indexing, and performance optimization.',       Icon:Medal,  gradient:'from-green-500 to-emerald-600',accent:'#4db33d',category:'Certification',  tag:'🍃' },
  { title:'Git & GitHub Expert',      org:'Lets Upgrade',         date:'2024', desc:'Expert certification in Git version control, GitHub workflows, branching strategies, pull requests, and collaborative CI/CD pipeline setups.', Icon:Medal,  gradient:'from-red-500 to-rose-500',   accent:'#f05032', category:'Certification',  tag:'🔀' },
];

/* ── Flip Card ───────────────────────────────────────────────────── */
const FlipCard = ({ card, index }: { card: typeof CARDS[0]; index: number }) => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const iconRef  = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { Icon } = card;

  // Entrance stagger
  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(wrapRef.current,
      { opacity: 0, y: 50, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.5)',
        delay: index * 0.09,
        scrollTrigger: { trigger: wrapRef.current, start: 'top 88%' } }
    );
  }, []);

  const handleEnter = () => {
    setHovered(true);
    gsap.to(wrapRef.current, { y: -10, scale: 1.04, duration: 0.35, ease: 'power2.out' });
    gsap.to(iconRef.current, { scale: 1.18, duration: 0.35, ease: 'back.out(1.7)' });
  };

  const handleLeave = () => {
    setHovered(false);
    gsap.to(wrapRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
    gsap.to(iconRef.current, { scale: 1, duration: 0.4, ease: 'power3.out' });
  };

  const handleFlip = () => {
    if (!innerRef.current) return;
    const target = !flipped ? 180 : 0;
    gsap.to(innerRef.current, { rotateY: target, duration: 0.65, ease: 'power3.inOut' });
    setFlipped(f => !f);
  };

  return (
    <div ref={wrapRef} onClick={handleFlip}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="cursor-pointer h-64"
      style={{ perspective: '1000px' }}>

      <div ref={innerRef} className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}>

        {/* ── FRONT ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 px-5"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'linear-gradient(145deg, #0e0e24, #080818)',
            border: `1.5px solid ${hovered ? card.accent + '80' : card.accent + '35'}`,
            boxShadow: hovered ? `0 0 24px ${card.accent}25, inset 0 0 30px ${card.accent}08` : 'none',
            transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
          }}>

          {/* Ambient glow top-right */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 blur-2xl"
            style={{ background: card.accent }} />

          {/* Icon */}
          <div ref={iconRef} className={`p-5 rounded-2xl bg-gradient-to-br ${card.gradient}`}
            style={{ boxShadow: hovered ? `0 0 36px ${card.accent}80, 0 0 60px ${card.accent}30` : `0 0 24px ${card.accent}50`,
              transition: 'box-shadow 0.35s ease' }}>
            <Icon size={32} className="text-white" />
          </div>

          <div className="text-center">
            <span className="text-xs font-bold tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block"
              style={{ color: card.accent, background: card.accent + '18', border: `1px solid ${card.accent}30` }}>
              {card.tag} {card.category.toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-white mt-1 leading-tight">{card.title}</h3>
          </div>

          {/* Hint */}
          <p className="text-xs text-slate-600 absolute bottom-4 left-0 right-0 text-center tracking-widest">
            CLICK TO REVEAL
          </p>
        </div>

        {/* ── BACK ──────────────────────────────────────────────── */}
        <div className="absolute inset-0 rounded-2xl flex flex-col justify-between p-5"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(145deg, ${card.accent}18, #080818 60%)`,
            border: `1.5px solid ${card.accent}55`,
            boxShadow: `0 0 30px ${card.accent}25, inset 0 0 40px ${card.accent}08`,
          }}>

          {/* Top glow line */}
          <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${card.gradient}`} />

          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.gradient}`}
              style={{ boxShadow: `0 0 14px ${card.accent}60` }}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">{card.title}</h3>
              <p className="text-xs" style={{ color: card.accent }}>{card.org}</p>
            </div>
            <span className="ml-auto text-xs font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">{card.date}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed flex-1 mt-3 line-clamp-4">{card.desc}</p>

          {/* Glowing category badge */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-black tracking-widest px-3 py-1 rounded-full"
              style={{
                color: card.accent,
                background: card.accent + '22',
                border: `1.5px solid ${card.accent}50`,
                boxShadow: `0 0 10px ${card.accent}30`,
              }}>
              ✦ {card.category.toUpperCase()}
            </span>
            <span className="text-xs text-slate-600 tracking-widest">CLICK TO FLIP BACK</span>
          </div>

          {/* Bottom glow line */}
          <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r ${card.gradient} opacity-40`} />
        </div>
      </div>
    </div>
  );
};

/* ── Main ────────────────────────────────────────────────────────── */
export const Achievements = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
    );
  }, []);

  return (
    <section id="achievements" className="relative py-20 px-4 bg-black overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full"
          style={{ background:'radial-gradient(circle,rgba(251,191,36,0.07) 0%,transparent 70%)', filter:'blur(50px)' }} />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full"
          style={{ background:'radial-gradient(circle,rgba(192,132,252,0.07) 0%,transparent 70%)', filter:'blur(50px)' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.35em] text-amber-500 mb-3 uppercase">
            Click any card to reveal
          </p>
          <h2 ref={headingRef}
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 mb-4">
            Achievements
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Certifications, awards & recognitions — flip to explore each one
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CARDS.map((card, i) => <FlipCard key={i} card={card} index={i} />)}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-14 pt-8 border-t border-white/5">
          {[
            { v:'7', l:'Achievements' },
            { v:'5', l:'Certifications' },
            { v:'2', l:'Awards' },
            { v:'3+', l:'Years' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-black text-white">{s.v}</p>
              <p className="text-xs text-slate-500 mt-0.5 tracking-widest uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
