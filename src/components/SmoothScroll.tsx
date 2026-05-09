import { useEffect } from 'react';
import Lenis from 'lenis';

// Global Lenis instance so other components can pause/resume it
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};
