import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Filter, Grid, List, Star, Calendar, Code, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTextReveal } from '@/hooks/useTextReveal';
import DistortedImage from '@/components/DistortedImage';
import ProjectModal, { type Project } from '@/components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    title: 'Student Advisor Portal',
    description: 'An AI-powered career guidance platform featuring a personalized roadmap mentor, resume ATS evaluator, and student community forum.',
    longDescription: 'A comprehensive AI-powered career guidance platform built on Google Cloud Platform. Features include a personalized roadmap mentor that adapts to each student\'s goals, an ATS resume evaluator powered by NLP, a community forum for peer-to-peer learning, and adaptive agent-based recommendations. Designed to enhance career readiness for engineering students.',
    image: 'https://jaro-website.s3.ap-south-1.amazonaws.com/2025/02/115c7288f953204c4639bba8875f4993.jpg',
    tags: ['FastAPI', 'React', 'AI', 'GCP', 'NLP', 'MongoDB'],
    category: 'AI & Web Development',
    featured: true, year: '2025', status: 'Live',
    liveUrl: 'https://student-advisor-portal.vercel.app/',
    githubUrl: 'https://github.com/riteshsolke2004/Student-Advisor-Portal',
    highlights: ['AI-powered personalized career roadmaps', 'Resume ATS scoring with NLP', 'Real-time student community forum', 'Deployed on Google Cloud Platform'],
  },
  {
    title: 'FinZer – AI Personal Finance Coach',
    description: 'A full-stack AI-driven personal finance platform that helps users manage expenses, analyze spending patterns, and receive smart investment insights.',
    longDescription: 'FinZer is a full-stack AI-driven personal finance platform that empowers users to take control of their money. It analyses spending patterns using ML models, provides smart savings recommendations, tracks monthly budgets, and delivers actionable investment insights — all in a clean, intuitive React dashboard connected to a FastAPI backend.',
    image: 'https://images.yourstory.com/cs/2/f02aced0d86311e98e0865c1f0fe59a2/Fintech-1599488865962.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75',
    tags: ['React', 'FastAPI', 'TailwindCSS', 'Machine Learning', 'Python', 'MongoDB'],
    category: 'AI & FinTech',
    featured: true, year: '2025', status: 'Live',
    liveUrl: 'https://finzer-financial-advisor.vercel.app/',
    githubUrl: 'https://github.com/riteshsolke2004/Finzer-Financial_Advisor',
    highlights: ['ML-based expense categorisation', 'Smart budget & savings alerts', 'Interactive spending dashboards', 'Python ML models via FastAPI'],
  },
  {
    title: 'E-commerce Website',
    description: 'A modern and responsive e-commerce web application with product browsing, cart functionality, and smooth checkout flow.',
    longDescription: 'A fully responsive MERN-stack e-commerce platform with a clean, conversion-focused UI. Features include category-based product filtering, a dynamic cart with quantity management, guest & authenticated checkout, and an admin panel for product management. Deployed on Vercel with a MongoDB Atlas database.',
    image: 'https://img.freepik.com/free-vector/e-commerce-flat-concept_1284-22119.jpg?semt=ais_hybrid&w=740&q=80',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    category: 'Web Development',
    featured: true, year: '2025', status: 'Live',
    liveUrl: 'https://e-commerce-beryl-five-53.vercel.app/',
    githubUrl: 'https://github.com/riteshsolke2004/Nexora-E-commerce',
    highlights: ['Full MERN stack architecture', 'Product filtering & search', 'Cart & checkout flow', 'Admin product management panel'],
  },
  {
    title: 'AI Robotics Club',
    description: 'The AI Robotics Club website showcasing the mission to explore cutting-edge technologies in AI and robotics.',
    longDescription: 'Official website for the AI Robotics Club built with React.js, Three.js for 3D visuals, and FastAPI for the backend. Showcases the club\'s projects, events, member profiles, and blog posts. Features interactive 3D robot models, a project gallery, and an events registration system.',
    image: 'https://www.aitude.com/wp-content/uploads/2022/07/The-role-of-AI-in-Robotics-min.png',
    tags: ['React.js', 'Python', 'FastAPI', 'Three.js'],
    category: 'Web Development',
    featured: true, year: '2024', status: 'Live',
    liveUrl: 'https://ai-robo-club.vercel.app/',
    githubUrl: 'https://github.com/riteshsolke2004/robo-reveal-hub',
    highlights: ['Interactive Three.js 3D visuals', 'Events registration system', 'Project showcase gallery', 'FastAPI-powered backend'],
  },
  {
    title: 'Real Estate Market Intelligence',
    description: 'An AI-powered full-stack web application providing comprehensive real estate market analysis for Pune localities.',
    longDescription: 'An AI-powered real estate intelligence platform for Pune. Provides property price trends from 2020–2024, locality comparisons, investment hotspot maps, and AI-generated market reports using the Groq LLM. Built with React, TypeScript, Django REST API, and Recharts for data visualisations.',
    image: 'https://media.istockphoto.com/id/2154752387/photo/real-estate-concept-business-home-insurance-and-real-estate-protection-real-estate-investment.jpg?s=612x612&w=0&k=20&c=r6Tmn31ZHHr-8ZuWfZaYIYdqM9nD4dMc6NfDXxwsZeo=',
    tags: ['React', 'TypeScript', 'Django', 'Python', 'AI/ML', 'Groq API', 'TailwindCSS', 'REST API'],
    category: 'Full Stack & AI',
    featured: true, year: '2025', status: 'Live',
    liveUrl: 'https://real-estate-app-ks3a.vercel.app/',
    githubUrl: 'https://github.com/riteshsolke2004/REAL_ESTATE_APP',
    highlights: ['5-year Pune market trend data', 'AI-generated insight reports (Groq)', 'Interactive locality comparison maps', 'Django REST API + React TypeScript'],
  },
  {
    title: 'AI-Powered Sentiment Analysis',
    description: 'Classifies sentiment of user reviews into positive, negative, or neutral categories using a machine learning model.',
    longDescription: 'A machine learning web app that classifies the sentiment of product/movie reviews as positive, negative, or neutral. Uses a custom-trained Naive Bayes model with manual preprocessing (no heavy NLP libraries), exposed via a FastAPI REST endpoint, and visualised through a React dashboard with real-time confidence scores.',
    image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&h=600&fit=crop&crop=center',
    tags: ['React', 'Python', 'MongoDB', 'FastAPI'],
    category: 'Machine Learning',
    featured: true, year: '2024', status: 'Live',
    liveUrl: '#',
    githubUrl: 'https://github.com/riteshsolke2004/Sentiment-Analysis',
    highlights: ['Custom Naive Bayes ML model', 'Real-time confidence scores', 'FastAPI REST endpoint', 'Manual feature extraction (no heavy NLP libs)'],
  },
  {
    title: 'Voice Assistant (Python)',
    description: 'A desktop voice assistant using Python libraries for speech recognition that answers questions and searches Google.',
    longDescription: 'A Python-based desktop voice assistant that listens for voice commands and responds using text-to-speech. Can open websites, answer general knowledge questions, play music, check the weather, and perform Google searches. Built with SpeechRecognition and pyttsx3 libraries.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop&crop=center',
    tags: ['Python', 'SpeechRecognition', 'pyttsx3', 'Desktop App'],
    category: 'AI/ML',
    featured: false, year: '2023', status: 'Live',
    liveUrl: 'https://voice-assistant-lemon-ten.vercel.app/',
    githubUrl: 'https://github.com/riteshsolke2004/Voice-Assistant',
    highlights: ['Real-time speech-to-text', 'Text-to-speech responses', 'Google search integration', 'System command execution'],
  },
  {
    title: 'Health Monitor System',
    description: 'Continuously tracks key vital signs like heart rate, temperature, and oxygen level with a real-time interface.',
    longDescription: 'An IoT-connected health monitoring system that reads vital signs (heart rate, temperature, SpO2) from sensors and streams them in real-time to a React dashboard. Uses FastAPI WebSockets for live data push, a machine learning anomaly detector to flag abnormal readings, and a history chart for trend analysis.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center',
    tags: ['React.js', 'Python', 'FastAPI', 'Machine Learning'],
    category: 'IoT',
    featured: true, year: '2024', status: 'Development',
    liveUrl: '#',
    githubUrl: 'https://github.com/riteshsolke2004/Health-Monitor',
    highlights: ['Real-time WebSocket data streaming', 'IoT sensor integration', 'ML anomaly detection', 'Historical trend visualisation'],
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredGridRef = useRef<HTMLDivElement>(null);
  const allProjectsRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const headingRef = useTextReveal<HTMLHeadingElement>({ start: 'top 85%', duration: 0.8, stagger: 0.1 });

  const categories = ['All', 'Web Development', 'Machine Learning', 'AI/ML', 'IoT'];
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);
  const featuredProjects = projects.filter(p => p.featured);

  // Card hover tilt effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    gsap.to(card, { rotateY: x, rotateX: y, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
  };
  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 400);
  };

  useGSAP(() => {
    if (featuredGridRef.current) {
      gsap.fromTo(featuredGridRef.current.children,
        { y: 70, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.15, ease: 'back.out(1.3)', scrollTrigger: { trigger: featuredGridRef.current, start: 'top 80%' } }
      );
    }
    const statEls = statsRowRef.current?.querySelectorAll<HTMLElement>('.proj-stat-num') ?? [];
    statEls.forEach((el) => {
      const raw = el.dataset.value ?? '0';
      const isPlus = raw.includes('+');
      const num = parseInt(raw);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: num, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate() { el.textContent = `${Math.round(obj.val)}${isPlus ? '+' : ''}`; }
      });
    });
    if (allProjectsRef.current) {
      gsap.fromTo(allProjectsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: allProjectsRef.current, start: 'top 85%' } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Code className="w-4 h-4 mr-2" /> Portfolio Showcase
          </div>
          <h2 ref={headingRef} className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Click any project card to explore it in detail — animations, tech stack, and live links.
          </p>
        </div>

        {/* Featured Projects — top 3 with 3D tilt + WebGL distortion */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-2">
            <Star className="w-6 h-6 text-accent" /> My Projects
            <span className="ml-2 text-sm font-normal text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Click to explore
            </span>
          </h3>
          <div ref={featuredGridRef} className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <div
                key={index}
                onClick={() => openModal(project)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className="glass-card group relative overflow-hidden hover-glow transition-all duration-300 hover:-translate-y-3 hover:border-primary/40 border border-transparent h-full">
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.07) 100%)' }} />

                  <div className="relative">
                    <div className="relative overflow-hidden h-52">
                      <DistortedImage src={project.image} alt={project.title} className="w-full h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
                      <div className="absolute top-3 right-3 pointer-events-none">
                        <Badge className={project.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 pointer-events-none">
                        <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-slate-300 border-white/10">
                          {project.year}
                        </Badge>
                      </div>
                      {/* Click-to-open hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center gap-2">
                          <Eye className="w-4 h-4" /> View Details
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">{project.category}</Badge>
                        <Star className="w-4 h-4 text-accent fill-current" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag, ti) => (
                          <Badge key={ti} variant="secondary" className="text-xs bg-secondary/20 text-secondary border-secondary/30">{tag}</Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-muted/30 text-muted-foreground">+{project.tags.length - 3}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-3 mb-4 md:mb-0 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map((cat) => (
              <Button key={cat} variant={activeFilter === cat ? 'default' : 'outline'} size="sm"
                onClick={() => setActiveFilter(cat)}
                className={`transition-all duration-300 ${activeFilter === cat ? 'bg-primary hover:bg-primary-glow text-primary-foreground hover-glow' : 'border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30'}`}>
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'border-border/50 text-muted-foreground'}>
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'border-border/50 text-muted-foreground'}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-foreground">All Projects ({filteredProjects.length})</h3>
          <div ref={allProjectsRef} className={`grid gap-6 ${viewMode === 'grid' ? 'lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
            {filteredProjects.slice(0, visibleCards).map((project, index) => (
              <div
                key={index}
                onClick={() => openModal(project)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className={`glass-card group overflow-hidden hover-glow transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 border border-transparent ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-44'}`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium border border-white/20 flex items-center gap-1.5">
                        <Eye className="w-3 h-3" /> Open
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className={`text-xs ${project.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>{project.status}</Badge>
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">{project.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{project.year}</span>
                    </div>
                    <h3 className="text-base font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                    <p className={`text-muted-foreground text-sm mb-3 leading-relaxed ${viewMode === 'list' ? '' : 'line-clamp-2'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map((tag, ti) => (
                        <Badge key={ti} variant="secondary" className="text-xs bg-secondary/20 text-secondary border-secondary/30">{tag}</Badge>
                      ))}
                      {project.tags.length > 4 && <Badge variant="secondary" className="text-xs bg-muted/30 text-muted-foreground">+{project.tags.length - 4}</Badge>}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {visibleCards < filteredProjects.length && (
            <div className="text-center mt-10">
              <Button onClick={() => setVisibleCards(p => p + 3)} size="lg" className="bg-primary hover:bg-primary-glow hover-glow text-primary-foreground px-8">
                Load More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div ref={statsRowRef} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Projects', value: `${projects.length}` },
            { label: 'Technologies', value: '15+' },
            { label: 'Live Projects', value: `${projects.filter(p => p.status === 'Live').length}` },
            { label: 'Featured', value: `${featuredProjects.length}` }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 glass-card rounded-xl hover-glow transition-all duration-300">
              <div className="proj-stat-num text-3xl font-bold text-primary mb-2 neon-text" data-value={stat.value}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Modal */}
      {modalOpen && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </section>
  );
};