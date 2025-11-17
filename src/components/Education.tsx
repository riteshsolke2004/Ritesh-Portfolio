import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, TrendingUp, type LucideIcon } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  description: string;
  achievements: string[];
  color: string;
  icon: LucideIcon;
}

export const Education = () => {
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

  const education: EducationItem[] = [
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "JSPMS JAYAWANTRAO SAWANT COLLEGE OF ENGINEERING",
      location: "Pune, Maharashtra, India",
      duration: "2023 - 2027",
      grade: "9.5 CGPA",
      description: "Specialized in Full-Stack Development, Cloud Computing, and DevOps practices. Active member of coding clubs and led multiple technical projects.",
      achievements: [
        "Technical Lead of AI ROBOTICS CLUB",
        "Led college tech fest organizing committee",
      ],
      color: "from-blue-500 to-cyan-500",
      icon: GraduationCap
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Jai Hind English Medium School and Junior College",
      location: "Dabhadi, Maharashtra",
      duration: "2021 - 2023",
      grade: "72.50%",
      description: "Focused on Science stream with Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving foundations.",
      achievements: [
        "3rd Place in state board examinations",
        "District Level Inspired Award Winner",
        "School science exhibition winner"
      ],
      color: "from-purple-500 to-pink-500",
      icon: BookOpen
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Janata Vidyalaya High School",
      location: "Aghar Bk, Maharashtra",
      duration: "2020 - 2021",
      grade: "90%",
      description: "Completed secondary education with distinction. Demonstrated excellence in Mathematics and Science subjects.",
      achievements: [
        "2nd Rank in SSC Board Exams",
        "School topper in Mathematics",
        "District level quiz competition winner",
        
      ],
      color: "from-orange-500 to-red-500",
      icon: TrendingUp
    }
  ];

  return (
    <section 
      id="education" 
      ref={sectionRef} 
      className="relative py-24 px-6 overflow-hidden bg-black"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
            Education
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            My academic journey and the foundations that shaped my technical expertise
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20" />

          <div className="space-y-12">
            {education.map((edu, index) => {
              const IconComponent = edu.icon;
              
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Desktop */}
                  <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        
                        <div className="relative p-8">
                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${edu.color} mb-4 ${index % 2 === 0 ? 'float-right ml-4' : 'float-left mr-4'}`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {edu.degree}
                          </h3>
                          <p className="text-lg text-blue-400 font-semibold mb-4">
                            {edu.institution}
                          </p>

                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{edu.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{edu.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="text-yellow-500 font-semibold">{edu.grade}</span>
                            </div>
                          </div>

                          <p className="text-slate-300 mb-4 leading-relaxed">
                            {edu.description}
                          </p>

                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-slate-400 mb-2">Key Achievements:</p>
                            {edu.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${edu.color} mt-2 flex-shrink-0`} />
                                <p className="text-sm text-slate-400">{achievement}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="relative z-10 flex items-center justify-center">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${edu.color} border-4 border-black shadow-lg`}>
                        <div className={`w-full h-full rounded-full bg-gradient-to-r ${edu.color} animate-ping opacity-20`} />
                      </div>
                    </div>

                    <div className="w-5/12" />
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden relative pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />
                    <div className={`absolute left-0 top-6 w-3 h-3 rounded-full bg-gradient-to-r ${edu.color} -translate-x-1/2 border-2 border-black`} />

                    <Card className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
                      <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="relative p-6">
                        <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${edu.color} mb-3`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                        <p className="text-blue-400 font-semibold mb-3">{edu.institution}</p>

                        <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-yellow-500" />
                            <span className="text-yellow-500 font-semibold">{edu.grade}</span>
                          </div>
                        </div>

                        <p className="text-slate-300 text-sm mb-3 leading-relaxed">{edu.description}</p>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-slate-400 mb-2">Achievements:</p>
                          {edu.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${edu.color} mt-1.5 flex-shrink-0`} />
                              <p className="text-xs text-slate-400">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
      </div>
    </section>
  );
};
