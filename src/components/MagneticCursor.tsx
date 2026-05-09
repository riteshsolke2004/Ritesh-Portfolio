import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const MagneticCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // ── Mouse move: update target position ──────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // True magnetic pull on each .magnetic element
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = Math.max(rect.width, rect.height) * 0.85;

        if (dist < threshold) {
          const strength = (1 - dist / threshold);
          gsap.to(el, {
            x: dx * strength * 0.45,
            y: dy * strength * 0.45,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.55,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
          });
        }
      });
    };

    // ── Cursor tick: smooth follow ───────────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      dotPosRef.current.x = lerp(dotPosRef.current.x, mouseRef.current.x, 0.25);
      dotPosRef.current.y = lerp(dotPosRef.current.y, mouseRef.current.y, 0.25);
      ringPosRef.current.x = lerp(ringPosRef.current.x, mouseRef.current.x, 0.08);
      ringPosRef.current.y = lerp(ringPosRef.current.y, mouseRef.current.y, 0.08);

      gsap.set(dot, { x: dotPosRef.current.x, y: dotPosRef.current.y, xPercent: -50, yPercent: -50 });
      gsap.set(ring, { x: ringPosRef.current.x, y: ringPosRef.current.y, xPercent: -50, yPercent: -50 });
    };

    gsap.ticker.add(tick);

    // ── Hover states: cursor scale on interactive elements ───────────────
    const handleEnter = () => {
      gsap.to(dot, { scale: 2.5, backgroundColor: 'rgba(139,92,246,0.8)', duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 1.5, borderColor: 'rgba(139,92,246,0.6)', duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(dot, { scale: 1, backgroundColor: 'rgba(59,130,246,0.8)', duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 1, borderColor: 'rgba(59,130,246,0.5)', duration: 0.3 });
    };

    // ── Snap-back for magnetic elements on mouse leave ───────────────────
    const handleMagneticLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    };

    // Attach hover to all interactive elements
    const interactives = document.querySelectorAll<HTMLElement>('a, button, .magnetic');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    const magneticEls = document.querySelectorAll<HTMLElement>('.magnetic');
    magneticEls.forEach((el) => {
      el.addEventListener('mouseleave', handleMagneticLeave);
    });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', handleMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      magneticEls.forEach((el) => {
        el.removeEventListener('mouseleave', handleMagneticLeave);
      });
    };
  });

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'rgba(59,130,246,0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          backdropFilter: 'blur(2px)',
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(59,130,246,0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default MagneticCursor;
