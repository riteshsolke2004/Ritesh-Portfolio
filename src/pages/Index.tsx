import { ThreeScene } from '@/components/ThreeScene';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

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
        <footer className="relative z-10 bg-background/90 backdrop-blur-sm border-t border-border/20 py-12">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold text-gradient mb-4">Ritesh Solke</h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                    Creative Developer specializing in immersive digital experiences. Let's build something amazing together.
                </p>
                <div className="flex justify-center gap-6 mb-8">
                    <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
                    >
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a 
                        href="mailto:hello@example.com"
                        className="p-3 rounded-full border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
                <div className="flex justify-center gap-8 text-sm text-muted-foreground mb-8">
                    <a href="#about" className="hover:text-primary transition-colors">About</a>
                    <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
                    <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
                    <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
                </div>
                <p className="text-muted-foreground text-sm">
                    © 2024 Ritesh Solke. All rights reserved.
                </p>
            </div>
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default Index;