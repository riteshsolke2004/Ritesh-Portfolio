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
  Coffee
} from 'lucide-react';

export const About = () => {
  const sectionRef = useRef(null);
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
    { number: "5+", label: "Projects Completed", icon: <Code className="w-6 h-6" /> },
    { number: "3+", label: "Years Experience", icon: <Calendar className="w-6 h-6" /> },
    { number: "5+", label: "Clients", icon: <Users className="w-6 h-6" /> },
    { number: "100%", label: "Client Satisfaction", icon: <Award className="w-6 h-6" /> }
  ];

  const expertise = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Crafting responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend Development",
      description: "Building scalable server-side applications with Node.js, Python, and cloud technologies.",
      skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "AWS"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Designing intuitive user experiences with attention to detail and modern design principles.",
      skills: ["Figma", "Adobe XD", "Framer", "Design Systems", "Prototyping"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Ensuring lightning-fast load times and smooth user experiences across all devices.",
      skills: ["Web Performance", "SEO", "PWA", "Core Web Vitals", "Optimization"]
    }
  ];

  const journey = [
    {
      year: "2022",
      title: "Started Web Development Journey",
      description: "Began learning HTML, CSS, and JavaScript. Built my first responsive website.",
      color: "bg-blue-500"
    },
    {
      year: "2023",
      title: "Mastered React & Modern Tools",
      description: "Dove deep into React ecosystem, learned TypeScript, and modern development workflows.",
      color: "bg-purple-500"
    },
    {
      year: "2024",
      title: "Full-Stack Development",
      description: "Expanded to backend development with Node.js and databases. Built complete web applications.",
      color: "bg-green-500"
    },
    {
      year: "2025",
      title: "AI Integration & Advanced Projects",
      description: "Started integrating AI/ML into web applications and working on complex enterprise projects.",
      color: "bg-orange-500"
    }
  ];

  const personalInfo = [
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Pune, Maharashtra, India" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "riteshsolke12@gmail.com" },
    { icon: <Code className="w-5 h-5" />, label: "Favorite Stack", value: "React + FastAPI" }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate web developer crafting digital experiences that blend creativity with cutting-edge technology
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Section */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src="/profile-picture.jpg" 
                    alt="Ritesh Solke" 
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      // e.target.style.display = 'none';
                      // e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-8xl font-bold text-white hidden">
                    RS
                  </div> */}
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center mb-2">Ritesh Solke</h3>
              <p className="text-primary text-center font-medium mb-6">Full-Stack Web Developer</p>
              
              <div className="space-y-3 mb-8">
                {personalInfo.map((info, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <div className="text-primary mr-3">{info.icon}</div>
                    <span className="font-medium mr-2">{info.label}:</span>
                    <span>{info.value}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </Card>
          </div>

          {/* Bio & Story */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-3xl font-bold mb-6 text-gradient">My Story</h3>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Hey there! I'm Ritesh, a passionate computer engineering student turned full-stack web developer. 
                  My journey into the world of web development started with curiosity and has evolved into a deep love 
                  for creating digital experiences that make a difference.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  What drives me is the perfect blend of logical problem-solving and creative expression that web 
                  development offers. Whether I'm architecting scalable backend systems or crafting pixel-perfect 
                  user interfaces, I approach each project with enthusiasm and attention to detail.
                </p>
                
                {/* <p className="text-muted-foreground leading-relaxed mb-8">
                  When I'm not coding, you'll find me exploring the latest web technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community. I believe in continuous learning and 
                  staying ahead of the curve in this ever-evolving field.
                </p> */}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                    <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Expertise Section */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-4xl font-bold text-center mb-12 text-gradient">Areas of Expertise</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((area, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{area.title}</h4>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{area.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Timeline - Mobile Optimized */}
        <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-4xl font-bold text-center mb-12 text-gradient">My Journey</h3>
          
          {/* Desktop Timeline */}
          <div className="relative hidden lg:block">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary opacity-30" />
            
            <div className="space-y-12">
              {journey.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-3`} />
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </Card>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-6 h-6 rounded-full ${item.color} border-4 border-background`} />
                  </div>
                  
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="relative lg:hidden">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary opacity-30" />
            
            <div className="space-y-8">
              {journey.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full ${item.color} border-2 border-background ml-6`} />
                  </div>
                  
                  {/* Content */}
                  <div className="ml-6 flex-1">
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-center mb-3 flex-wrap">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-3 flex-shrink-0`} />
                        <span className="text-xl md:text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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