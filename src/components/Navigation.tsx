import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

// ✅ Correct order: Home → About → Education → Projects → Skills → Contact
const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
  
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Handle scroll with optimization
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          
          // Update active section
          const sections = navItems.map(item => document.getElementById(item.id));
          const scrollPosition = window.scrollY + 200;
          
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].id);
              break;
            }
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Sticky Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className={`relative rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
              isScrolled 
                ? 'bg-black/90 border-slate-700/50 shadow-2xl shadow-blue-500/10' 
                : 'bg-black/40 border-slate-800/30'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl" />
            
            <div className="relative px-4 md:px-6 py-3">
              <div className="flex items-center justify-between">
                
                {/* Video Logo */}
                <a 
                  href="#hero" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('hero');
                  }}
                  className="flex items-center group"
                >
                  <div className={`relative overflow-hidden rounded-xl transition-all duration-500 ${
                    isScrolled ? 'w-12 h-12 md:w-14 md:h-14' : 'w-16 h-16 md:w-20 md:h-20'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-xl" />
                    
                    <video 
                      src="/logo.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                      aria-label="Portfolio Logo Video"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">RS</span>
                      </div>
                    </video>
                  </div>
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center space-x-1 bg-slate-900/50 rounded-xl p-1.5 border border-slate-700/30">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg group"
                    >
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transition-opacity duration-300 ${
                          activeSection === item.id || hoveredItem === item.id
                            ? 'opacity-100' 
                            : 'opacity-0'
                        }`}
                      />
                      
                      {activeSection === item.id && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                      )}
                      
                      <span 
                        className={`relative z-10 transition-colors duration-300 ${
                          activeSection === item.id 
                            ? 'text-blue-400' 
                            : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span>Get In Touch</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </Button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-lg bg-slate-900/50 border border-slate-700/30 text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-300"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <div 
          className={`absolute top-24 left-4 right-4 bg-black/95 rounded-2xl border border-slate-700/50 backdrop-blur-xl transition-all duration-300 shadow-2xl ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="p-6">
            <div className="space-y-2 mb-6">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: mobileMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => scrollToSection('contact')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl py-3 transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};
