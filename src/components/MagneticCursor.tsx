import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const magneticElements = document.querySelectorAll('.magnetic');
    
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Use GSAP ticker instead of RAF for better sync
    const animate = () => {
      cursorPosRef.current.x = lerp(cursorPosRef.current.x, mouseRef.current.x, 0.15);
      cursorPosRef.current.y = lerp(cursorPosRef.current.y, mouseRef.current.y, 0.15);

      gsap.set(cursor, {
        x: cursorPosRef.current.x,
        y: cursorPosRef.current.y,
        xPercent: -50,
        yPercent: -50,
      });
    };

    // Add to GSAP ticker for perfect sync
    gsap.ticker.add(animate);

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        scale: 1.2,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener('mousemove', handleMouseMove);
      magneticElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  });

  return (
    <div
      ref={cursorRef}
      className="magnetic-cursor"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    />
  );
};

export default MagneticCursor;
