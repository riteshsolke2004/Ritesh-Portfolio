import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Terminal, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    { type:'out', text:'  hire       → work availability & roles',     color:'#94a3b8' },
    { type:'out', text:'  whoami     → quick intro',                   color:'#94a3b8' },
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
    { type:'out', text:'🌐  Open to remote & relocation opportunities', color:'#94a3b8' },
  ],
  hire: [
    { type:'out', text:'── Availability ──────────────────────', color:'#34d399' },
    { type:'out', text:'🟢  Status     : OPEN TO WORK',           color:'#34d399' },
    { type:'out', text:'⚡  Role       : Full Stack Developer / DevOps Engineer', color:'#94a3b8' },
    { type:'out', text:'📅  Available  : Immediate / June 2025 onwards', color:'#94a3b8' },
    { type:'out', text:'🤝  Prefers    : Full-time / Internship / Contract', color:'#94a3b8' },
    { type:'gap' },
    { type:'out', text:'Switch to Form tab or run `contact` to connect.', color:'#475569' },
  ],
  whoami: [
    { type:'out', text:'── whoami ────────────────────────────',  color:'#c084fc' },
    { type:'out', text:'Ritesh Solke',                            color:'#ffffff' },
    { type:'out', text:'Full Stack Developer & DevOps Enthusiast | Pune, India', color:'#94a3b8' },
    { type:'gap' },
    { type:'out', text:'Stack: React · Node.js · Python · Docker · AWS', color:'#60a5fa' },
    { type:'out', text:'Passionate about scalable systems & polished UX.', color:'#94a3b8' },
  ],
};

const SUGGESTIONS = ['help', 'contact', 'hire', 'social', 'location', 'whoami', 'clear'];

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
    }, line.type === 'cmd' ? 35 : 10);
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
  const [lineIdx, setLineIdx] = useState(-1);
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

/* ── Main Contact Component ──────────────────────────────────────── */
export const Contact = () => {
  const { toast } = useToast();
  const sectionRef  = useRef<HTMLDivElement>(null);
  const termRef     = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const outputRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);

  const [viewMode, setViewMode] = useState<'form' | 'terminal'>('form');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  // Terminal state
  const [input, setInput]           = useState('');
  const [history, setHistory]       = useState<{ cmd: string; lines: Line[] }[]>([]);
  const [busy, setBusy]             = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);

  // Entrance
  useEffect(() => {
    const el = termRef.current || formWrapRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity:0, y:40, scale:0.98 },
      { opacity:1, y:0, scale:1, duration:0.8, ease:'power3.out',
        scrollTrigger: { trigger: el, start:'top 82%' } });
  }, [viewMode]);

  // Auto-scroll terminal output
  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior:'smooth' });
  }, [history]);

  // Boot terminal with help command when first switched
  useEffect(() => {
    if (viewMode === 'terminal' && history.length === 0) {
      setTimeout(() => {
        runCmd('help');
      }, 400);
    }
  }, [viewMode]);

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

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('riteshsolke12@gmail.com');
    setCopiedEmail(true);
    toast({
      title: "Email Copied!",
      description: "riteshsolke12@gmail.com has been copied to your clipboard.",
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in your name, email, and message.",
      });
      return;
    }

    setSubmitting(true);
    
    // Direct mailto link preparation
    const mailtoSubject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
    const mailtoBody = encodeURIComponent(`Hi Ritesh,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    const mailtoLink = `mailto:riteshsolke12@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      toast({
        title: "Opening Email Client",
        description: "Your default email app is opening to send this message to riteshsolke12@gmail.com.",
      });
      setSubmitting(false);
    }, 400);
  };

  return (
    <section id="contact" ref={sectionRef}
      className="relative py-24 px-4 bg-black overflow-hidden">

      {/* ── Background & Unique Cyber Circuit Trace Grid ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h30l10 10h40M0 60h50l10-10h20M20 0v30M60 50v30' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3Ccircle cx='30' cy='20' r='2' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='60' r='2' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full"
          style={{ background:'radial-gradient(ellipse,rgba(139,92,246,0.14) 0%,rgba(59,130,246,0.08) 50%,transparent 70%)', filter:'blur(80px)' }} />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-[0.35em] text-violet-400 mb-3 uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-violet-400" />
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
            Whether you have an opportunity, an open-source project, or just want to chat tech — my inbox is always open.
          </p>

          {/* Dual View Toggle Switcher */}
          <div className="inline-flex p-1 bg-white/[0.05] border border-white/10 rounded-full backdrop-blur-md">
            <button
              onClick={() => setViewMode('form')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                viewMode === 'form'
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare size={14} />
              Quick Contact Form
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                viewMode === 'terminal'
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal size={14} />
              Interactive CLI Terminal
            </button>
          </div>
        </div>

        {/* ── MODE 1: Quick Contact Form (Recruiter-friendly GUI) ── */}
        {viewMode === 'form' && (
          <div ref={formWrapRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Contact Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
                
                <h3 className="text-xl font-bold text-white mb-2">Direct Contact</h3>
                <p className="text-xs text-slate-400 mb-6">Reach out directly via email, phone, or LinkedIn.</p>

                <div className="space-y-4">
                  {/* Email with 1-click copy */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono uppercase text-violet-400 flex items-center gap-1.5">
                        <Mail size={12} /> Email
                      </span>
                      <button
                        onClick={copyEmailToClipboard}
                        className="text-xs flex items-center gap-1 text-slate-400 hover:text-violet-300 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <a href="mailto:riteshsolke12@gmail.com" className="text-sm font-medium text-white hover:text-violet-300 transition-colors break-all">
                      riteshsolke12@gmail.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all">
                    <span className="text-[11px] font-mono uppercase text-emerald-400 flex items-center gap-1.5 mb-1">
                      <Phone size={12} /> Phone / WhatsApp
                    </span>
                    <a href="tel:+918799993086" className="text-sm font-medium text-white hover:text-emerald-300 transition-colors">
                      +91 8799993086
                    </a>
                  </div>

                  {/* Location */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-mono uppercase text-amber-400 flex items-center gap-1.5 mb-1">
                      <MapPin size={12} /> Location
                    </span>
                    <p className="text-sm font-medium text-white">Pune, Maharashtra, India</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Open to Remote & Hybrid Roles</p>
                  </div>


                </div>

                {/* Social pill links */}
                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="https://github.com/riteshsolke2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    GitHub <ExternalLink size={10} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/riteshsolke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    LinkedIn <ExternalLink size={10} />
                  </a>
                  <a
                    href="https://instagram.com/_.ritesh._18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-pink-400 flex items-center gap-1 transition-colors"
                  >
                    Instagram <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <form 
                onSubmit={handleFormSubmit}
                className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, timeline, or open role..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  <span>{submitting ? 'Preparing Email...' : 'Send Message'}</span>
                  <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── MODE 2: Interactive Terminal ── */}
        {viewMode === 'terminal' && (
          <div ref={termRef} className="rounded-2xl overflow-hidden border border-white/10 max-w-4xl mx-auto"
            style={{ boxShadow:'0 0 60px rgba(139,92,246,0.1), 0 0 120px rgba(59,130,246,0.05)' }}
            onClick={() => inputRef.current?.focus()}>

            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
              style={{ background:'linear-gradient(90deg,#0d0d1f,#0a0a18)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" onClick={() => setHistory([])} title="Clear terminal" />
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
              <p className="text-xs text-slate-600 mb-4">Portfolio Terminal v1.1.0 — Type <span className="text-violet-400">help</span> to get started.</p>

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

            {/* Hint */}
            <div className="px-5 py-2.5 bg-black/60 border-t border-white/5 text-center">
              <p className="text-xs text-slate-600 font-mono">
                ↑ ↓ arrow keys for command history · click red ● to clear
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

