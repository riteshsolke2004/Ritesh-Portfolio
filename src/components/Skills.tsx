import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal } from '@/hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

/* ── All skills by orbit ─────────────────────────────────────────── */
interface Skill { name: string; icon: string; color: string; level: number; exp: string; }

// Base orbit radii (desktop). Scaled down on smaller screens.
const BASE_R = [110, 195, 278];

// Inner = DevOps | Middle = Backend | Outer = Frontend
const ORBITS: { skills: Skill[]; duration: number; label: string }[] = [
  {
    label: 'DevOps',
    duration: 20,
    skills: [
      { name:'Docker', icon:'/icons/docker.svg',  color:'#2496ed', level:70, exp:'1 yr' },
      { name:'Git',    icon:'/icons/git.svg',     color:'#f05032', level:88, exp:'3 yrs' },
      { name:'AWS',    icon:'/icons/aws.svg',     color:'#ff9900', level:65, exp:'0.5 yr' },
    ],
  },
  {
    label: 'Backend',
    duration: 36,
    skills: [
      { name:'Node.js',  icon:'/icons/nodejs.svg',     color:'#68a063', level:80, exp:'1.5 yrs' },
      { name:'Python',   icon:'/icons/python.svg',     color:'#4b8bbe', level:85, exp:'2 yrs' },
      { name:'FastAPI',  icon:'/icons/fastapi.svg',    color:'#059669', level:82, exp:'1 yr' },
      { name:'Flask',    icon:'/icons/flask.svg',      color:'#c084fc', level:72, exp:'1 yr' },
      { name:'Express',  icon:'/icons/express.svg',    color:'#aaaaaa', level:76, exp:'1 yr' },
      { name:'MongoDB',  icon:'/icons/mongodb.svg',    color:'#4db33d', level:78, exp:'1.5 yrs' },
    ],
  },
  {
    label: 'Frontend',
    duration: 54,
    skills: [
      { name:'HTML',        icon:'/icons/html5.svg',      color:'#e44d26', level:95, exp:'3 yrs' },
      { name:'CSS',         icon:'/icons/css3.svg',       color:'#264de4', level:90, exp:'3 yrs' },
      { name:'JavaScript',  icon:'/icons/javascript.svg', color:'#f0db4f', level:92, exp:'3 yrs' },
      { name:'TypeScript',  icon:'/icons/typescript.svg', color:'#3178c6', level:78, exp:'1 yr' },
      { name:'React',       icon:'/icons/react.svg',      color:'#61dafb', level:90, exp:'2 yrs' },
      { name:'Next.js',     icon:'/icons/nextjs.svg',     color:'#ffffff', level:75, exp:'1 yr' },
      { name:'TailwindCSS', icon:'/icons/tailwind.svg',   color:'#38bdf8', level:85, exp:'1.5 yrs' },
    ],
  },
];

const RING_COLORS = ['#60a5fa', '#a78bfa', '#34d399'];

/* ── Planet ──────────────────────────────────────────────────────── */
const Planet = ({
  skill, startAngle, radius, duration, paused, planetSize, onHover,
}: {
  skill: Skill; startAngle: number; radius: number; duration: number;
  paused: boolean; planetSize: number; onHover: (s: Skill | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const angleRef = useRef(startAngle);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const speed = (2 * Math.PI) / (duration * 60);
    const tick = () => {
      angleRef.current += paused ? speed * 0.06 : speed;
      const x = Math.cos(angleRef.current) * radius;
      const y = Math.sin(angleRef.current) * radius;
      if (ref.current) gsap.set(ref.current, { x, y, xPercent: -50, yPercent: -50 });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [radius, duration, paused]);

  const enter = () => {
    setHov(true); onHover(skill);
    gsap.to(ref.current, { scale: 1.4, duration: 0.4, ease: 'back.out(1.7)' });
  };
  const leave = () => {
    setHov(false); onHover(null);
    gsap.to(ref.current, { scale: 1, duration: 0.35, ease: 'power3.out' });
  };

  const sz = hov ? planetSize * 1.15 : planetSize;
  const iconSz = sz * 0.55;

  return (
    <div ref={ref} onMouseEnter={enter} onMouseLeave={leave}
      className="absolute top-1/2 left-1/2 cursor-pointer flex flex-col items-center gap-0.5"
      style={{ willChange: 'transform' }}>
      <div className="rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          width: sz, height: sz,
          background: hov ? `radial-gradient(circle, ${skill.color}30, #080820)` : '#0c0c22',
          border: `2px solid ${hov ? skill.color : skill.color + '60'}`,
          boxShadow: hov ? `0 0 20px ${skill.color}70, 0 0 40px ${skill.color}25` : `0 0 6px ${skill.color}20`,
        }}>
        <img src={skill.icon} alt={skill.name}
          style={{ width: iconSz, height: iconSz, objectFit: 'contain' }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
      </div>
      <span className="font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none"
        style={{
          fontSize: Math.max(9, planetSize * 0.18),
          color: hov ? skill.color : 'rgba(180,190,210,0.7)',
          textShadow: hov ? `0 0 8px ${skill.color}` : 'none',
        }}>
        {skill.name}
      </span>
    </div>
  );
};

/* ── Ring SVG ────────────────────────────────────────────────────── */
const Ring = ({ r, color }: { r: number; color: string }) => (
  <svg className="absolute top-1/2 left-1/2 pointer-events-none"
    style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}>
    <circle cx={r} cy={r} r={r - 1} fill="none" stroke={color}
      strokeWidth="1.2" strokeDasharray="4 8" opacity={0.3} />
  </svg>
);

/* ── Main ────────────────────────────────────────────────────────── */
export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef   = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const legendRef  = useRef<HTMLDivElement>(null);
  const headingRef = useTextReveal<HTMLHeadingElement>({ start: 'top 85%', duration: 0.85, stagger: 0.12 });

  const [paused, setPaused]   = useState(false);
  const [hovered, setHovered] = useState<Skill | null>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale]     = useState(1);   // orbit scale factor

  // Responsive: measure available width, compute scale
  const computeScale = useCallback(() => {
    if (!wrapRef.current) return;
    const available = wrapRef.current.clientWidth;
    // Full orbit needs BASE_R[2]*2 + planet margin (~660px on desktop)
    const needed = BASE_R[2] * 2 + 80;
    const maxScale = 1;
    const minScale = 0.42;
    const s = Math.min(maxScale, Math.max(minScale, available / needed));
    setScale(s);
  }, []);

  useEffect(() => {
    computeScale();
    const ro = new ResizeObserver(computeScale);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [computeScale]);

  // Entrance animation
  useEffect(() => {
    if (!orbitRef.current) return;
    gsap.fromTo(orbitRef.current, { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: orbitRef.current, start: 'top 80%', onEnter: () => setVisible(true) } });
  }, []);

  useEffect(() => {
    if (!legendRef.current) return;
    gsap.fromTo(legendRef.current.children, { y: 16, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.045, duration: 0.45, ease: 'power3.out',
        scrollTrigger: { trigger: legendRef.current, start: 'top 88%' } });
  }, []);

  // Derived sizes
  const scaledR   = BASE_R.map(r => r * scale);
  const canvasSize = (BASE_R[2] + 64) * 2 * scale;
  const planetSize = Math.round(Math.max(44, 68 * scale));  // min 44px, max 68px
  const sunSize    = Math.round(Math.max(54, 80 * scale));

  return (
    <section id="skills" ref={sectionRef} className="relative pt-16 pb-24 bg-black px-4 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <h2 ref={headingRef} className="text-5xl md:text-6xl font-bold text-center mb-3 text-gradient">
          Skills & Expertise
        </h2>
        <p className="text-center text-slate-500 text-sm mb-10">
          Hover the orbit to slow it · hover a planet to reveal details
        </p>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

          {/* Orbit wrapper — measured for scale */}
          <div ref={wrapRef} className="w-full lg:w-auto flex justify-center lg:flex-shrink-0">
            <div ref={orbitRef} className="relative"
              style={{ width: canvasSize, height: canvasSize }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => { setPaused(false); setHovered(null); }}>

              {/* Sun — spinning </> code tag */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">

                {/* Sonar pulse rings */}
                {[1, 1.6, 2.2].map((s, i) => (
                  <div key={i} className="absolute rounded-full border border-blue-500/20"
                    style={{
                      width: sunSize * s, height: sunSize * s,
                      animation: `ping ${1.8 + i * 0.6}s cubic-bezier(0,0,0.2,1) infinite`,
                      animationDelay: `${i * 0.5}s`,
                      opacity: 0,
                    }} />
                ))}

                {/* Outer rotating dashed ring */}
                <div className="absolute rounded-full border-2 border-dashed border-blue-400/40"
                  style={{
                    width: sunSize + 16, height: sunSize + 16,
                    animation: 'spin 8s linear infinite',
                  }} />

                {/* Core circle */}
                <div className="relative rounded-full flex flex-col items-center justify-center"
                  style={{
                    width: sunSize, height: sunSize,
                    background: 'radial-gradient(circle at 35% 35%, #1e3a5f, #0a0a1e)',
                    border: '2px solid rgba(99,179,237,0.5)',
                    boxShadow: '0 0 24px rgba(59,130,246,0.6), 0 0 50px rgba(139,92,246,0.3), inset 0 0 20px rgba(59,130,246,0.1)',
                  }}>

                  {/* </> symbol */}
                  <span
                    className="font-black tracking-tighter select-none"
                    style={{
                      fontSize: Math.max(14, sunSize * 0.32),
                      background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))',
                      lineHeight: 1,
                    }}>
                    {'</>'}
                  </span>

                  {/* Subtitle */}
                  <span className="mt-1 font-semibold tracking-widest"
                    style={{
                      fontSize: Math.max(7, sunSize * 0.11),
                      color: 'rgba(148,163,184,0.7)',
                    }}>
                    FULL STACK
                  </span>
                </div>
              </div>

              {/* Rings */}
              {scaledR.map((r, i) => <Ring key={i} r={r} color={RING_COLORS[i]} />)}

              {/* Planets */}
              {visible && ORBITS.map((orbit, oi) =>
                orbit.skills.map((skill, si) => (
                  <Planet key={`${oi}-${si}`} skill={skill}
                    startAngle={(2 * Math.PI * si) / orbit.skills.length + oi * 0.8}
                    radius={scaledR[oi]} duration={orbit.duration}
                    paused={paused} planetSize={planetSize} onHover={setHovered} />
                ))
              )}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md">
            {/* Hovered card */}
            <div className="mb-6 min-h-[130px]">
              {hovered ? (
                <div className="p-5 rounded-2xl border transition-all duration-300"
                  style={{
                    background: `radial-gradient(ellipse at top left,${hovered.color}18,transparent 70%),rgba(8,8,24,0.92)`,
                    borderColor: hovered.color + '50',
                    boxShadow: `0 0 28px ${hovered.color}20`,
                  }}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={hovered.icon} alt={hovered.name} className="w-11 h-11 object-contain flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white text-xl leading-tight">{hovered.name}</p>
                      <p className="text-sm" style={{ color: hovered.color }}>{hovered.exp} experience</p>
                    </div>
                    <span className="ml-auto text-2xl font-black" style={{ color: hovered.color }}>{hovered.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{
                      width: `${hovered.level}%`,
                      background: hovered.color,
                      boxShadow: `0 0 10px ${hovered.color}`,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.015] flex items-center gap-3">
                  <span className="text-2xl">🪐</span>
                  <p className="text-slate-400 text-sm">Hover any planet to see experience details</p>
                </div>
              )}
            </div>

            {/* All technologies legend — grouped by orbit */}
            {ORBITS.map(orbit => (
              <div key={orbit.label} className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: orbit.label === 'Frontend' ? '#34d399' : orbit.label === 'Backend' ? '#a78bfa' : '#60a5fa' }}>
                  {orbit.label}
                </p>
                <div ref={orbit.label === 'DevOps' ? legendRef : undefined} className="flex flex-wrap gap-2">
                  {orbit.skills.map(skill => (
                    <div key={skill.name}
                      onMouseEnter={() => setHovered(skill)}
                      onMouseLeave={() => setHovered(null)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border cursor-default transition-all duration-200 hover:scale-105"
                      style={{ borderColor: skill.color + '50', color: skill.color, background: skill.color + '18' }}>
                      <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};