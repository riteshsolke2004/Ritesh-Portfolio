import { useState, Suspense, lazy } from 'react';
import { ThreeScene } from '@/components/ThreeScene';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { SmoothScroll } from '@/components/SmoothScroll';
import MagneticCursor from '@/components/MagneticCursor';
import Loader from '@/components/Loader';

// Code-Splitting: Lazily load all components that are "below the fold"
const About = lazy(() => import('@/components/About').then(m => ({ default: m.About || m.default })));
const Projects = lazy(() => import('@/components/Projects').then(m => ({ default: m.Projects || m.default })));
const Skills = lazy(() => import('@/components/Skills').then(m => ({ default: m.Skills || m.default })));
const Education = lazy(() => import('@/components/Education').then(m => ({ default: m.Education || m.default })));
const Achievements = lazy(() => import('@/components/Achievements').then(m => ({ default: m.Achievements || m.default })));
const Contact = lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact || m.default })));
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer || m.default })));

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Cinematic Loader — unmounts after completion */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <SmoothScroll>
        <div className="relative min-h-screen bg-background">
          {/* Three.js Background Scene */}
          <ThreeScene />

          {/* Magnetic Cursor */}
          <MagneticCursor />

          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="relative z-10">
            <Hero />
            <Suspense fallback={<div className="min-h-screen" />}>
              <About />
              <Projects />
              <Skills />
              <Education />
              <Achievements />
              <Contact />
            </Suspense>
          </main>

          <Suspense fallback={<div />}>
            <Footer />
          </Suspense>
        </div>
      </SmoothScroll>
    </>
  );
};

export default Index;
