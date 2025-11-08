import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Filter, Grid, List, Star, Calendar, Code, Eye, ArrowRight } from 'lucide-react';

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCards, setVisibleCards] = useState(6);
  const [isVisible, setIsVisible] = useState(false);

  const projects = [

    {
  title: "Student Advisor Portal",
  description: "An AI-powered career guidance platform featuring a personalized roadmap mentor, resume ATS evaluator, and student community forum. Designed to enhance career readiness through adaptive agent-based recommendations and seamless multi-tool integration on Google Cloud Platform (GCP).",
  image: "https://jaro-website.s3.ap-south-1.amazonaws.com/2025/02/115c7288f953204c4639bba8875f4993.jpg",
  tags: ["FastAPI", "React", "AI", "GCP", "NLP", "MongoDB"],
  category: "AI & Web Development",
  featured: true,
  year: "2025",
  status: "Live",
  liveUrl: "https://student-advisor-portal.vercel.app/",
  githubUrl: "https://github.com/riteshsolke2004/Student-Advisor-Portal"
}
,
{
  title: "FinZer – AI-Powered Personal Finance Coach",
  description: "A full-stack AI-driven personal finance platform that helps users manage expenses, analyze spending patterns, and receive smart investment insights. Built with React.js, Tailwind CSS, and FastAPI integrated with Python ML models for real-time, data-driven financial recommendations.",
  image: "https://images.yourstory.com/cs/2/f02aced0d86311e98e0865c1f0fe59a2/Fintech-1599488865962.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75",
  tags: ["React", "FastAPI", "TailwindCSS", "Machine Learning", "Python", "MongoDB"],
  category: "AI & FinTech",
  featured: true,
  year: "2025",
  status: "Live",
  liveUrl: "https://finzer-ai.vercel.app/",
  githubUrl: "https://github.com/riteshsolke2004/Finzer-Financial_Advisor"
},

{
      title: "E-commerce Website",
      description: "A modern and responsive e-commerce web application built with seamless user experience in mind. Features include product browsing, cart functionality, and smooth checkout flow — designed to showcase my skills in front-end development, UI/UX design, and responsive layout.",
      image: "https://img.freepik.com/free-vector/e-commerce-flat-concept_1284-22119.jpg?semt=ais_hybrid&w=740&q=80",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
      category: "Web Development",
      featured: true,
      year: "2025",
      status: "Live",
      liveUrl: "https://e-commerce-beryl-five-53.vercel.app/",
      githubUrl: "https://github.com/riteshsolke2004/Nexora-E-commerce"
    },
    {
      title: "AI Robotics Club",
      description: "The AI Robotics Club website showcases our mission to explore cutting-edge technologies in artificial intelligence and robotics. It features our latest projects, events, team initiatives, and offers students a platform to collaborate, innovate, and grow in the world of smart tech.",
      image: "https://www.aitude.com/wp-content/uploads/2022/07/The-role-of-AI-in-Robotics-min.png",
      tags: ["React.js", "Python", "FastAPI", "Three.js"],
      category: "Web Development",
      featured: true,
      year: "2024",
      status: "Live",
      liveUrl: "https://ai-robo-club.vercel.app/",
      githubUrl: "https://github.com/riteshsolke2004/robo-reveal-hub"
    },
    {
      title: "AI-Powered Sentiment Analysis",
      description: "This project classifies the sentiment of user reviews into positive, negative, or neutral categories using a machine learning model trained on labeled data. It relies on feature extraction techniques and manual preprocessing rather than advanced NLP libraries.",
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&h=600&fit=crop&crop=center",
      tags: ["React", "Python", "MongoDB", "FastAPI"],
      category: "Machine Learning",
      featured: true,
      year: "2024",
      status: "Live",
      liveUrl: "#",
      githubUrl: "https://github.com/riteshsolke2004/Sentiment-Analysis"
    },
    {
      title: "Voice Assistant using Python",
      description: "A desktop voice assistant developed using Python libraries like speech recognition and pyttsx3. It can answer questions, open websites, search Google, and interact with the system using voice commands.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop&crop=center",
      tags: ["Python", "SpeechRecognition", "pyttsx3", "Desktop App"],
      category: "AI/ML",
      featured: false,
      year: "2023",
      status: "Live",
      liveUrl: "https://voice-assistant-lemon-ten.vercel.app/",
      githubUrl: "https://github.com/riteshsolke2004/Voice-Assistant"
    },
    {
      title: "E-Commerce Website for Mechanical Components",
      description: "An e-commerce platform for mechanical components, including product listings, filters, cart functionality, and admin panel. Designed for workshops and engineering firms to streamline parts purchasing.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
      tags: ["HTML", "CSS", "JavaScript", "React.js", "MongoDB", "FastAPI"],
      category: "Web Development",
      featured: false,
      year: "2023",
      status: "Development",
      liveUrl: "https://your-mech-store.com",
      githubUrl: "https://github.com/riteshsolke2004/ecommerce-mechanical.git"
    },
    {
      title: "Health Monitor System",
      description: "This project is a Health Monitor System that continuously tracks key vital signs like heart rate, temperature, and oxygen level. It uses sensors to collect real-time data and displays it on a user-friendly interface.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center",
      tags: ["React.js", "Python", "FastAPI", "Machine Learning"],
      category: "IoT",
      featured: true,
      year: "2024",
      status: "Development",
      liveUrl: "#",
      githubUrl: "https://github.com/riteshsolke2004/Health-Monitor"
    },
    {
      title: "Simple Linear Regression - Housing Price",
      description: "A simple linear regression project built using Google Colab and Streamlit to predict housing prices based on square footage.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      tags: ["Python", "Streamlit", "Colab", "Machine Learning"],
      category: "Machine Learning",
      featured: false,
      year: "2023",
      status: "Live",
      liveUrl: "https://linear-regression-housing.streamlit.app/",
      githubUrl: "https://github.com/riteshsolke2004/housing-price-predictor.git"
    }
  ];

  const categories = ['All', 'Web Development', 'Machine Learning', 'AI/ML', 'IoT'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const loadMoreProjects = () => {
    setVisibleCards(prev => prev + 3);
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Code className="w-4 h-4 mr-2" />
            Portfolio Showcase
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my latest work in web development, AI/ML, and innovative solutions. 
            Each project represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Featured Projects Hero Section */}
        <div className={`mb-20 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center">
            <Star className="w-6 h-6 mr-2 text-accent" />
            Featured Projects
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <Card key={index} className="glass-card group relative overflow-hidden hover-glow transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <div className="relative">
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className={`${project.status === 'Live' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-muted/80 backdrop-blur-sm text-muted-foreground border-border/30">
                        {project.year}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {project.category}
                      </Badge>
                      <Star className="w-4 h-4 text-accent fill-current" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:neon-text transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs bg-secondary/20 text-secondary border-secondary/30">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-muted/30 text-muted-foreground">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary-glow hover-glow text-primary-foreground" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4 mr-2" />
                          View Live
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className={`flex flex-col md:flex-row justify-between items-center mb-12 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className={`transition-all duration-300 ${
                    activeFilter === category 
                      ? 'bg-primary hover:bg-primary-glow text-primary-foreground hover-glow' 
                      : 'border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* All Projects Grid */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold mb-8 text-foreground">
            All Projects ({filteredProjects.length})
          </h3>
          
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredProjects.slice(0, visibleCards).map((project, index) => (
              <Card 
                key={index}
                className={`glass-card group overflow-hidden hover-glow transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-48'
                }`}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge className={`text-xs ${project.status === 'Live' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      {project.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.year}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:neon-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className={`text-muted-foreground mb-4 leading-relaxed ${
                    viewMode === 'list' ? '' : 'line-clamp-2'
                  }`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs bg-secondary/20 text-secondary border-secondary/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary-glow hover-glow text-primary-foreground" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCards < filteredProjects.length && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMoreProjects}
                size="lg"
                className="bg-primary hover:bg-primary-glow hover-glow text-primary-foreground px-8 py-3"
              >
                Load More Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { label: 'Total Projects', value: projects.length },
            { label: 'Technologies', value: '15+' },
            { label: 'Live Projects', value: projects.filter(p => p.status === 'Live').length },
            { label: 'Featured', value: featuredProjects.length }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 glass-card rounded-xl hover-glow transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2 neon-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};