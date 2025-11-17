import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Info animation
    gsap.fromTo(
      infoRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'riteshsolke12@gmail.com',
      href: 'mailto:riteshsolke12@gmail.com',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8799993086',
      href: 'tel:+918799993086',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Pune, Maharashtra, India',
      href: 'https://maps.app.goo.gl/66Urrva2gPQ7bTVH8',
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/riteshsolke2004', 
      label: 'GitHub', 
      color: 'hover:bg-gray-700/30 hover:border-gray-500',
      iconColor: 'hover:text-gray-100'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/riteshsolke/', 
      label: 'LinkedIn', 
      color: 'hover:bg-blue-600/30 hover:border-blue-500',
      iconColor: 'hover:text-blue-400'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/_.ritesh._18', 
      label: 'Instagram', 
      color: 'hover:bg-pink-600/30 hover:border-pink-500',
      iconColor: 'hover:text-pink-400'
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6 overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
          >
            Let's Connect
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            I'm always interested in hearing about new opportunities and interesting projects.
            Whether you have a question or just want to say hello, feel free to reach out!
          </p>
        </div>

        <div ref={infoRef} className="space-y-8">
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative flex flex-col items-center text-center space-y-3">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{info.label}</p>
                    <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50 p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Connect With Me</h3>
            
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className={`w-7 h-7 text-slate-300 ${social.iconColor} transition-colors duration-300`} />
                </a>
              ))}
            </div>
          </Card>

          {/* CTA Card */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-xl border-blue-500/30 p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            <div className="relative">
              <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-white mb-3">
                Let's Build Something Amazing Together
              </h4>
              <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Ready to turn your ideas into reality? I'm here to help bring your vision to life.
                Reach out through any of the channels above and let's start a conversation!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
