import { ThreeScene } from '@/components/ThreeScene';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { SmoothScroll } from '@/components/SmoothScroll';

const Index = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background">
        {/* Three.js Background Scene */}
        <ThreeScene />
        
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
        
        {/* Footer */}
        <footer className="relative z-10 bg-background/90 backdrop-blur-sm border-t border-border/20 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground">
              © 2024 Portfolio. Crafted with passion and cutting-edge technology.
            </p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default Index;
