import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Code, 
  Palette, 
  Database, 
  Zap, 
  Users, 
  Award,
  Download,
  Calendar,
  MapPin,
  Mail,
  Server,
  Cloud,
  type LucideIcon
} from 'lucide-react';

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const stats = [
    { number: "10+", label: "Projects Completed", icon: Code, color: "from-blue-500 to-cyan-500" },
    { number: "2+", label: "Years Experience", icon: Calendar, color: "from-purple-500 to-pink-500" },
    { number: "10+", label: "Happy Clients", icon: Users, color: "from-green-500 to-emerald-500" },
    { number: "100%", label: "Satisfaction", icon: Award, color: "from-orange-500 to-red-500" }
  ];

  interface ExpertiseArea {
    icon: LucideIcon;
    title: string;
    description: string;
    skills: string[];
    color: string;
  }

  const expertise: ExpertiseArea[] = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Crafting responsive, interactive user interfaces with modern frameworks and libraries.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Building scalable server-side applications with robust architecture.",
      skills: ["Node.js", "Python", "FastAPI", "Express", "MySQL"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Cloud,
      title: "Cloud & Deployment",
      description: "Deploying scalable applications with modern cloud technologies.",
      skills: ["AWS", "GCP", "Docker", "Vercel", "Render"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing intuitive user experiences with modern design principles.",
      skills: ["Figma", "Adobe XD", "Framer", "Design Systems"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const journey = [
    {
      year: "2022",
      title: "Started Web Development Journey",
      description: "Began learning HTML, CSS, and JavaScript. Built my first responsive website.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2023",
      title: "Mastered React & Modern Tools",
      description: "Dove deep into React ecosystem, learned TypeScript, and modern development workflows.",
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2024",
      title: "Full-Stack Development",
      description: "Expanded to backend development with Node.js and databases. Built complete web applications.",
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2025",
      title: "AI Integration & Advanced Projects",
      description: "Started integrating AI/ML into web applications and working on complex enterprise projects.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const personalInfo = [
    { icon: Mail, label: "Email", value: "riteshsolke12@gmail.com", color: "text-blue-400" },
    { icon: Code, label: "Favorite Stack", value: "React + FastAPI", color: "text-green-400" }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
            About Me
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Passionate web developer crafting digital experiences that blend creativity with cutting-edge technology
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Section */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="p-8 bg-slate-900/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 overflow-hidden border-4 border-slate-700/50">
                  <img 
                    src="/profile-picture.jpg" 
                    alt="Ritesh Solke" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center mb-2 text-white">Ritesh Solke</h3>
              <p className="text-blue-400 text-center font-medium mb-6">Full-Stack Web Developer</p>
              
              <div className="space-y-4 mb-8">
                {personalInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start text-sm p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all">
                      <IconComponent className={`w-5 h-5 ${info.color} mr-3 flex-shrink-0 mt-0.5`} />
                      <div>
                        <span className="font-medium text-slate-400">{info.label}:</span>
                        <p className="text-white mt-1">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a 
                href="/Ritesh Solke's CV.pdf" 
                download 
                className="block w-full"
              >
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 py-6">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </a>
            </Card>
          </div>

          {/* Bio & Story */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="p-8 h-full bg-slate-900/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">My Story</h3>
              
              <div className="space-y-6 mb-8">
                <p className="text-slate-300 leading-relaxed text-lg">
                  Hi, I'm Ritesh - a Computer Engineering student turned Full-Stack Developer. My journey into web development began with curiosity and quickly grew into a passion for building impactful digital experiences.
                </p>
                
                <p className="text-slate-300 leading-relaxed text-lg">
                  I enjoy combining logical thinking with creativity, whether it's designing clean user interfaces or developing robust backend systems. Every project I take on is driven by a love for learning and a focus on quality.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center p-6 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 group">
                      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-3 flex justify-center`}>
                        <IconComponent className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: 'inherit' }} />
                      </div>
                      <div className={`text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                        {stat.number}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Expertise Section */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Areas of Expertise
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <Card key={index} className="p-6 bg-slate-900/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 group">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${area.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{area.title}</h4>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{area.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className={`px-3 py-1 bg-gradient-to-r ${area.color} bg-opacity-10 text-sm rounded-full border border-slate-700/30 text-white`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            My Journey
          </h3>
          
          {/* Desktop Timeline */}
          <div className="relative hidden lg:block">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-20" />
            
            <div className="space-y-12">
              {journey.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                      <div className="flex items-center mb-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} mr-3`} />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color}">{item.year}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </Card>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-4 border-black shadow-lg`} />
                  </div>
                  
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="relative lg:hidden">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-30" />
            
            <div className="space-y-8">
              {journey.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} border-2 border-black ml-4 shadow-lg`} />
                  </div>
                  
                  <div className="ml-6 flex-1">
                    <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
                      <div className="flex items-center mb-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} mr-3`} />
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color}">{item.year}</span>
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
