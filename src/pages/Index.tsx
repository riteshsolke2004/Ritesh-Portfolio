import { ThreeScene } from '@/components/ThreeScene';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import MagneticCursor from '@/components/MagneticCursor';
import { Footer } from '@/components/Footer';


const Index = () => {

    
  return (
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
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <Footer/>
      </div>
    </SmoothScroll>
  );
};

export default Index;

