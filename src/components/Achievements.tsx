import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Award, Star, Medal, Target, Zap, Shield, Code, type LucideIcon } from 'lucide-react';

interface AchievementItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
}

export const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements: AchievementItem[] = [
    {
      title: "AWS Certified Cloud Practitioner",
      organization: "Amazon Web Services",
      date: "2025",
      description: "Demonstrated cloud computing knowledge and skills to effectively work with AWS services.",
      icon: Shield,
      color: "from-orange-500 to-yellow-500",
      category: "Certifications"
    },
    {
      title: "React JS Certification",
      organization: "FreeCodeCamp",
      date: "2024",
      description: "Advanced certification in React.js, covering hooks, state management, and modern React patterns.",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      category: "Certifications"
    },
    {
      title: "Kurukshetra Hackathon Finalist",
      organization: "MIT Kurukshetra Hackathon",
      date: "2025",
      description: "Finalist in national-level hackathon for developing innovative AI-powered solution.",
      icon: Trophy,
      color: "from-yellow-500 to-amber-500",
      category: "Awards"
    },
    {
      title: "Docker & Kubernetes Certification",
      organization: "Trainwithshubham",
      date: "2025",
      description: "Certified in containerization and orchestration technologies for scalable applications.",
      icon: Zap,
      color: "from-blue-600 to-indigo-600",
      category: "Certifications"
    },
    {
      title: "Best Project Award",
      organization: "College Tech Fest",
      date: "2023",
      description: "Recognized for building the most innovative full-stack web application among 100+ projects.",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      category: "Awards"
    },
    {
      title: "MongoDB Developer Certification",
      organization: "MongoDB Community",
      date: "2024",
      description: "Expert-level certification in MongoDB database design, aggregation, and performance optimization.",
      icon: Medal,
      color: "from-green-600 to-teal-600",
      category: "Certifications"
    },
    {
      title: "Git and Github Certification",
      organization: "Lets Upgrade",
      date: "2024",
      description: "Expert-level certification in Git and Github, for scalable applications optimization.",
      icon: Medal,
      color: "from-green-600 to-teal-600",
      category: "Certifications"
    },
  ];

  const categories = ['All', 'Certifications', 'Awards', 'Recognition', 'Academic'];

  const filteredAchievements = activeCategory === 'All' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory);

  return (
    <section 
      id="achievements" 
      ref={sectionRef} 
      className="relative py-24 px-6 overflow-hidden bg-black"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400">
            Achievements
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Certifications, awards, and recognitions that showcase my continuous learning and excellence
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/25 scale-105'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative p-6">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${achievement.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${achievement.color} text-white`}>
                      {achievement.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm text-blue-400 font-semibold">
                      {achievement.organization}
                    </p>
                    <span className="text-slate-500">•</span>
                    <p className="text-sm text-slate-400">
                      {achievement.date}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Decorative corner element */}
                  <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${achievement.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
                </div>
              </Card>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};
