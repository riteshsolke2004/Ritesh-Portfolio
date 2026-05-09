import { useEffect, useRef } from 'react';
import { getLenis } from '@/components/SmoothScroll';
import { gsap } from 'gsap';
import {
  X,
  Github,
  Calendar,
  Tag,
  Star,
  ArrowUpRight,
  Globe,
  Code2,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: string;
  featured: boolean;
  year: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  highlights?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  // ── Trap wheel & touch events so Lenis never sees them ──────────────
  useEffect(() => {
    const scrollEl = scrollBodyRef.current;
    if (!scrollEl) return;

    const stopProp = (e: Event) => e.stopPropagation();

    // Wheel: stop propagation so Lenis doesn't intercept it
    scrollEl.addEventListener('wheel', stopProp, { passive: true });
    scrollEl.addEventListener('touchmove', stopProp, { passive: true });

    return () => {
      scrollEl.removeEventListener('wheel', stopProp);
      scrollEl.removeEventListener('touchmove', stopProp);
    };
  }, [project]);

  // ── Open animation ───────────────────────────────────────────────────
  useEffect(() => {
    if (!project) return;

    // Stop Lenis + lock native scroll so background never moves
    getLenis()?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(modalRef.current, { y: 50, opacity: 0, scale: 0.96 });
    gsap.set(imageRef.current, { clipPath: 'inset(100% 0 0 0)' });
    gsap.set(contentRef.current?.children ?? [], { y: 24, opacity: 0 });
    gsap.set(tagsRef.current?.children ?? [], { scale: 0.75, opacity: 0 });

    tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
      .to(modalRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.5 }, '-=0.15')
      .to(imageRef.current, { clipPath: 'inset(0% 0 0 0)', duration: 0.55 }, '-=0.25')
      .to(contentRef.current?.children ?? [], { y: 0, opacity: 1, stagger: 0.06, duration: 0.4 }, '-=0.3')
      .to(tagsRef.current?.children ?? [], { scale: 1, opacity: 1, stagger: 0.04, ease: 'back.out(1.7)', duration: 0.3 }, '-=0.2');

    return () => { tl.kill(); };
  }, [project]);

  // ── Close animation ──────────────────────────────────────────────────
  const handleClose = () => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.in' },
      onComplete: () => {
        getLenis()?.start();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        onClose();
      },
    });

    tl.to(contentRef.current?.children ?? [], { y: 16, opacity: 0, stagger: 0.025, duration: 0.25 })
      .to(modalRef.current, { y: 30, opacity: 0, scale: 0.96, duration: 0.3 }, '-=0.1')
      .to(overlayRef.current, { opacity: 0, duration: 0.25 }, '-=0.15');
  };

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!project) return null;

  const highlights = project.highlights ?? [
    'Built with modern tech stack and best practices',
    'Fully responsive across all screen sizes',
    'Performance-optimised with fast load times',
    'Clean, maintainable code architecture',
  ];

  return (
    /* Overlay — covers full screen, modal pushed below navbar */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9000] flex items-start justify-center overflow-y-auto"
      style={{
        backgroundColor: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(10px)',
        paddingTop: '80px',      /* clear the fixed navbar */
        paddingBottom: '24px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      {/*
        Modal — two-part layout:
          ① Fixed-height image strip (no scroll)
          ② Scrollable content body (scroll stays inside)
        Total modal height capped at 85vh.
      */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl rounded-2xl border border-slate-700/60 shadow-2xl flex flex-col flex-shrink-0"
        style={{
          background: 'linear-gradient(160deg, rgba(5,5,22,0.99) 0%, rgba(8,8,28,0.99) 100%)',
          maxHeight: 'calc(100vh - 104px)',   /* viewport minus navbar+padding */
        }}
      >
        {/* ── ① Image strip (fixed, not scrolled) ────────────────────── */}
        <div ref={imageRef} className="relative h-44 flex-shrink-0 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.72) saturate(1.15)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050f] via-[#05050f]/20 to-transparent" />

          {/* Status */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm ${project.status === 'Live' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Live' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {project.status}
            </span>
          </div>

          {/* Year */}
          <div className="absolute top-3 right-14">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/40 border border-white/10 text-slate-300 backdrop-blur-sm">
              <Calendar className="w-3 h-3" />{project.year}
            </span>
          </div>

          {/* Featured */}
          {project.featured && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 backdrop-blur-sm">
                <Star className="w-3 h-3 fill-current" /> Featured
              </span>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/55 border border-white/10 text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/30 hover:rotate-90 transition-all duration-250"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── ② Scrollable content body ───────────────────────────────── */}
        <div
          ref={scrollBodyRef}
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(59,130,246,0.35) transparent',
          }}
        >
          <div ref={contentRef} className="p-5 md:p-6 space-y-5">

            {/* Title row */}
            <div>
              <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-medium mb-2">
                {project.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">{project.title}</h2>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {project.longDescription ?? project.description}
            </p>

            {/* Highlights */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" /> Key Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-slate-300">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-purple-400" /> Tech Stack
              </h3>
              <div ref={tagsRef} className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:border-blue-500/50 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200 cursor-default">
                    <Tag className="w-2.5 h-2.5 opacity-50" />{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pb-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 group relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/20"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Globe className="w-4 h-4" />
                View Live Demo
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:w-auto group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-200 border border-slate-600/60 bg-slate-800/50 hover:bg-slate-700/60 hover:border-slate-500 hover:text-white transition-all duration-300 hover:scale-[1.03]"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            </div>

          </div>
        </div>

        {/* Bottom glow strip */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/35 to-transparent rounded-b-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export default ProjectModal;
