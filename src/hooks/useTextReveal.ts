import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealOptions {
  /** If true, fires immediately on mount (no scroll trigger) — use for hero */
  immediate?: boolean;
  /** GSAP ScrollTrigger start value, default "top 85%" */
  start?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration per word */
  duration?: number;
  /** Stagger between words */
  stagger?: number;
}

/**
 * Splits the text content of the ref'd element into word-masked spans
 * and animates them up from behind a clip mask using GSAP.
 */
export function useTextReveal<T extends HTMLElement>(options: TextRevealOptions = {}) {
  const ref = useRef<T>(null);

  const {
    immediate = false,
    start = 'top 85%',
    delay = 0,
    duration = 0.75,
    stagger = 0.09,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Capture original text
    const originalText = el.textContent || '';
    const words = originalText.split(' ').filter(Boolean);

    // Build wrapped HTML
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="text-reveal-wrapper"><span class="text-reveal-inner">${word}</span></span>`
      )
      .join(' ');

    const inners = el.querySelectorAll<HTMLElement>('.text-reveal-inner');

    // Set initial state
    gsap.set(inners, { y: '110%' });

    if (immediate) {
      gsap.to(inners, {
        y: '0%',
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      });
    } else {
      gsap.to(inners, {
        y: '0%',
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
      el.textContent = originalText;
    };
  }, [immediate, start, delay, duration, stagger]);

  return ref;
}
