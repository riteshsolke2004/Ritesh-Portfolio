import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Terminal } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "BIOS Date 05/10/26 01:15:45 Ver 1.00",
  "CPU: Quantum Processor Core",
  "Memory Test: 64000K OK",
  "Initializing Boot Sequence...",
  "[ OK ] Loading core architecture",
  "[ OK ] Mounting interactive components",
  "[ OK ] Compiling visual shaders",
  "[ OK ] Establishing secure connection...",
  "Starting RITESH_PORTFOLIO.exe"
];

export const Loader = ({ onComplete }: LoaderProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [linesVisible, setLinesVisible] = useState(0);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // 1. Line by line boot sequence (Slower)
    let i = 0;
    const interval = setInterval(() => {
      setLinesVisible((prev) => {
        const next = prev + 1;
        if (next >= BOOT_LINES.length) {
          clearInterval(interval);
        }
        return next;
      });
    }, 500); // Slower typing (500ms per line)

    // 2. Progress bar and percentage
    const tl = gsap.timeline();

    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 4.5, // Matches 9 lines * 500ms
      ease: "power1.inOut",
      onUpdate: () => {
        if (progressTextRef.current) {
          progressTextRef.current.innerText = `${Math.floor(progressObj.val)}%`;
        }
      }
    }, 0);

    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 4.5,
      ease: "power1.inOut",
    }, 0);

    // 3. When finished booting
    tl.to({}, { duration: 0.3 }); // small pause
    
    tl.call(() => setBooting(false)); // Swap to "Access Granted"

    tl.to({}, { duration: 0.7 }); // hold access granted

    // 4. Zoom past camera effect
    tl.to(containerRef.current, {
      scale: 15,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1.2,
      ease: "power4.in",
    });

    tl.to(wrapperRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.4");

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[999] flex items-center justify-center bg-black overflow-hidden font-mono selection:bg-green-500/30 p-4">
      {/* Scanline overlay over the entire background */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)' }} />

      {/* Ambient glow behind terminal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(ellipse,rgba(139,92,246,0.15) 0%,transparent 70%)', filter:'blur(60px)' }} />

      {/* Terminal window */}
      <div ref={containerRef} className="w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 relative z-10"
        style={{ boxShadow:'0 0 60px rgba(139,92,246,0.1), 0 0 120px rgba(59,130,246,0.05)' }}>
        
        {/* Title bar (matches Contact section) */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
          style={{ background:'linear-gradient(90deg,#0d0d1f,#0a0a18)' }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <Terminal size={12} className="text-slate-500" />
            <span className="text-xs text-slate-500 font-mono">system@boot ~ bash</span>
          </div>
        </div>

        {/* Output area */}
        <div className="p-6 md:p-10 font-mono text-sm md:text-base flex flex-col justify-center" 
             style={{ background:'#080814', minHeight: '360px' }}>
          
          {booting ? (
            <div className="flex flex-col space-y-1 w-full max-w-2xl mx-auto">
              {/* Render lines sequentially */}
              {BOOT_LINES.slice(0, linesVisible).map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="mr-3 opacity-40 text-slate-500">{String(idx + 1).padStart(2, '0')}</span>
                  <span className={line.includes('[ OK ]') ? 'text-slate-300' : 'text-slate-400'}>
                    {line.includes('[ OK ]') ? (
                      <>
                        <span className="text-green-400 font-bold">[ OK ]</span> {line.replace('[ OK ] ', '')}
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </div>
              ))}
              
              {/* Blinking cursor */}
              <div className="mt-2 animate-pulse w-2.5 h-5 bg-violet-400" />
              
              {/* Progress Bar at the bottom */}
              <div className="mt-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="opacity-60 text-slate-400 text-xs tracking-widest uppercase">Booting System...</span>
                  <span ref={progressTextRef} className="font-bold text-violet-400">0%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 relative overflow-hidden border border-white/10">
                  <div 
                    ref={progressBarRef} 
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]" 
                    style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }} 
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-3 animate-pulse"
                  style={{ textShadow: '0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(139,92,246,0.3)' }}>
                Access Granted
              </h1>
              <p className="text-violet-400 tracking-[0.5em] text-xs md:text-sm">INITIALIZING WORKSPACE</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loader;
