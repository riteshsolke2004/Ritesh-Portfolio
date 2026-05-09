import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, X, Minus, Square } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── Command definitions ──────────────────────────────────────────── */
type Line = { type: 'cmd' | 'out' | 'link' | 'gap'; text?: string; href?: string; label?: string; color?: string };

const COMMANDS: Record<string, Line[]> = {
  help: [
    { type:'out', text:'Available commands:', color:'#a78bfa' },
    { type:'gap' },
    { type:'out', text:'  contact    → email & phone number',          color:'#94a3b8' },
    { type:'out', text:'  social     → GitHub, LinkedIn, Instagram',   color:'#94a3b8' },
    { type:'out', text:'  location   → where I am based',              color:'#94a3b8' },
    { type:'out', text:'  clear      → clear the terminal',            color:'#94a3b8' },
    { type:'gap' },
    { type:'out', text:'Tip: click any suggestion chip below ↓',       color:'#475569' },
  ],
  contact: [
    { type:'out', text:'── Contact Info ──────────────────────', color:'#34d399' },
    { type:'link', text:'📧  riteshsolke12@gmail.com',           href:'mailto:riteshsolke12@gmail.com', label:'Email',  color:'#f87171' },
    { type:'link', text:'📞  +91 8799993086',                    href:'tel:+918799993086',              label:'Phone',  color:'#34d399' },
    { type:'gap' },
    { type:'out', text:'Response time: ~24 hours',               color:'#475569' },
  ],
  social: [
    { type:'out', text:'── Social Links ──────────────────────', color:'#60a5fa' },
    { type:'link', text:'⬡   GitHub   → github.com/riteshsolke2004',        href:'https://github.com/riteshsolke2004',                 label:'GitHub',    color:'#e2e8f0' },
    { type:'link', text:'in  LinkedIn → linkedin.com/in/riteshsolke',       href:'https://www.linkedin.com/in/riteshsolke/',           label:'LinkedIn',  color:'#60a5fa' },
    { type:'link', text:'◎   Instagram → instagram.com/_.ritesh._18',       href:'https://instagram.com/_.ritesh._18',                 label:'Instagram', color:'#f472b6' },
  ],
  location: [
    { type:'out', text:'── Location ──────────────────────────', color:'#fbbf24' },
    { type:'link', text:'📍  Pune, Maharashtra, India',           href:'https://maps.app.goo.gl/66Urrva2gPQ7bTVH8', label:'Maps', color:'#fbbf24' },
    { type:'out', text:'🕐  Timezone: IST (UTC +5:30)',           color:'#94a3b8' },
    { type:'out', text:'🌐  Open to remote opportunities',        color:'#94a3b8' },
  ],
  hire: [
    { type:'out', text:'── Availability ──────────────────────', color:'#34d399' },
    { type:'out', text:'🟢  Status     : OPEN TO WORK',           color:'#34d399' },
    { type:'out', text:'⚡  Role       : Full Stack Developer',    color:'#94a3b8' },
    { type:'out', text:'📅  Available  : June 2025 onwards',      color:'#94a3b8' },
    { type:'out', text:'🤝  Prefers    : Full-time / Internship', color:'#94a3b8' },
    { type:'gap' },
    { type:'out', text:'Run `contact` to reach out directly.',    color:'#475569' },
  ],
  whoami: [
    { type:'out', text:'── whoami ────────────────────────────',  color:'#c084fc' },
    { type:'out', text:'Ritesh Solke',                            color:'#ffffff' },
    { type:'out', text:'Full Stack Developer | Pune, India',      color:'#94a3b8' },
    { type:'gap' },
    { type:'out', text:'Building: React · Node.js · Python · AWS', color:'#60a5fa' },
    { type:'out', text:'Passionate about clean code & great UX.', color:'#94a3b8' },
  ],
};

const SUGGESTIONS = ['help', 'contact', 'social', 'location', 'clear'];

/* ── Typewriter line ─────────────────────────────────────────────── */
const TypeLine = ({ line, onDone }: { line: Line; onDone: () => void }) => {
  const [text, setText] = useState('');
  const src = line.text || '';

  useEffect(() => {
    if (line.type === 'gap') { onDone(); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(src.slice(0, i));
      if (i >= src.length) { clearInterval(id); onDone(); }
    }, line.type === 'cmd' ? 40 : 12);
    return () => clearInterval(id);
  }, []);

  if (line.type === 'gap') return <div className="h-2" />;

  if (line.type === 'link') {
    return (
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm" style={{ color: line.color }}>{text}</span>
        {text === src && (
          <a href={line.href} target="_blank" rel="noopener noreferrer"
            className="text-xs px-2 py-0.5 rounded border font-semibold transition-all duration-200 hover:scale-105"
            style={{ color: line.color, borderColor: line.color + '60', background: line.color + '15' }}>
            open →
          </a>
        )}
      </div>
    );
  }

  return (
    <p className="font-mono text-sm leading-relaxed"
      style={{ color: line.type === 'cmd' ? '#e2e8f0' : (line.color || '#94a3b8') }}>
      {line.type === 'cmd' && <span style={{ color:'#a78bfa' }}>$ </span>}
      {text}
      {text.length < src.length && <span className="animate-pulse">█</span>}
    </p>
  );
};

/* ── History block (command + its output) ────────────────────────── */
const HistoryBlock = ({ cmd, lines, onDone }: { cmd: string; lines: Line[]; onDone: () => void }) => {
  const [lineIdx, setLineIdx] = useState(-1);   // -1 = typing command
  const all: Line[] = [{ type:'cmd', text: cmd }, ...lines];

  const advance = useCallback(() => {
    setLineIdx(i => {
      const next = i + 1;
      if (next >= all.length) { onDone(); return i; }
      return next;
    });
  }, [all.length, onDone]);

  useEffect(() => { advance(); }, []);

  return (
    <div className="space-y-0.5">
      {all.slice(0, lineIdx + 1).map((line, i) => (
        <TypeLine key={i} line={line} onDone={i === lineIdx ? advance : () => {}} />
      ))}
    </div>
  );
};

/* ── Main ────────────────────────────────────────────────────────── */
export const Contact = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const termRef     = useRef<HTMLDivElement>(null);
  const outputRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const [input, setInput]       = useState('');
  const [history, setHistory]   = useState<{ cmd: string; lines: Line[] }[]>([]);
  const [busy, setBusy]         = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);

  // Entrance
  useEffect(() => {
    if (!termRef.current) return;
    gsap.fromTo(termRef.current, { opacity:0, y:50, scale:0.96 },
      { opacity:1, y:0, scale:1, duration:0.9, ease:'back.out(1.3)',
        scrollTrigger: { trigger: termRef.current, start:'top 80%' } });
  }, []);

  // Auto-scroll output
  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior:'smooth' });
  }, [history]);

  // Boot message
  useEffect(() => {
    setTimeout(() => {
      runCmd('help');
    }, 600);
  }, []);

  const runCmd = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') { setHistory([]); return; }
    const lines = COMMANDS[cmd] ?? [
      { type:'out', text:`Command not found: "${cmd}"`, color:'#f87171' },
      { type:'out', text:'Type `help` for available commands.',   color:'#475569' },
    ];
    setBusy(true);
    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setHistory(h => [...h, { cmd, lines }]);
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCmd(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    }
  };

  return (
    <section id="contact" ref={sectionRef}
      className="relative py-20 px-4 bg-black overflow-hidden">

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background:'radial-gradient(ellipse,rgba(139,92,246,0.06) 0%,transparent 70%)', filter:'blur(60px)' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.35em] text-violet-400 mb-3 uppercase">Get In Touch</p>
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 mb-4">
            Let's Connect
          </h2>
          <p className="text-slate-400 text-sm">Interactive terminal — type a command or click a suggestion</p>
        </div>

        {/* Terminal window */}
        <div ref={termRef} className="rounded-2xl overflow-hidden border border-white/10"
          style={{ boxShadow:'0 0 60px rgba(139,92,246,0.1), 0 0 120px rgba(59,130,246,0.05)' }}
          onClick={() => inputRef.current?.focus()}>

          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
            style={{ background:'linear-gradient(90deg,#0d0d1f,#0a0a18)' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" onClick={() => setHistory([])} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center flex items-center justify-center gap-2">
              <Terminal size={12} className="text-slate-500" />
              <span className="text-xs text-slate-500 font-mono">ritesh@portfolio ~ bash</span>
            </div>
          </div>

          {/* Output area */}
          <div ref={outputRef}
            className="font-mono p-5 space-y-3 overflow-y-auto overscroll-contain"
            style={{ background:'#080814', minHeight:340, maxHeight:400 }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}>

            {/* Welcome */}
            <p className="text-xs text-slate-600 mb-4">Portfolio Terminal v1.0.0 — Type <span className="text-violet-400">help</span> to get started.</p>

            {history.map((h, i) => (
              <HistoryBlock key={i} cmd={h.cmd} lines={h.lines}
                onDone={() => { if (i === history.length - 1) setBusy(false); }} />
            ))}

            {/* Input row */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-violet-400 font-mono text-sm select-none">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={busy}
                autoFocus
                spellCheck={false}
                className="flex-1 bg-transparent outline-none font-mono text-sm text-white caret-violet-400 disabled:opacity-40"
                placeholder={busy ? '' : 'type a command…'}
              />
              <span className="text-xs text-slate-600 font-mono">{busy ? '⏳' : '●'}</span>
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="px-5 py-3 border-t border-white/5 flex flex-wrap gap-2"
            style={{ background:'#080814' }}>
            <span className="text-xs text-slate-600 font-mono mr-1 self-center">quick:</span>
            {SUGGESTIONS.map(s => (
              <button key={s}
                disabled={busy}
                onClick={() => { runCmd(s); inputRef.current?.focus(); }}
                className="px-2.5 py-0.5 rounded font-mono text-xs border border-violet-500/25 text-violet-300 bg-violet-500/8 hover:bg-violet-500/20 hover:border-violet-400/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-slate-600 mt-4 font-mono">
          ↑ ↓ arrow keys for command history · click red ● to clear
        </p>
      </div>
    </section>
  );
};
