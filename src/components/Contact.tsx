import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
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

    // Load Visme script only once
    // if (!document.getElementById('visme-script')) {
    //   const script = document.createElement('script');
    //   script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    //   script.async = true;
    //   script.id = 'visme-script';
    //   document.body.appendChild(script);
    // }

    // Form animation
    gsap.fromTo(
      formRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Info animation
    gsap.fromTo(
      infoRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
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
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8799993086',
      href: 'tel:+918799993086',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Pune, India',
      href: '#',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 text-gradient"
        >
          Let's Connect
        </h2>

        <div className="space-y-8 md:space-y-12">
          {/* Contact Info Section */}
          <div ref={infoRef} className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">Get in touch</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                I'm always interested in hearing about new opportunities and interesting projects.
                Whether you have a question or just want to say hello, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 glass-card rounded-lg hover-glow transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-2 md:p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <info.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium text-foreground text-sm md:text-base">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Visme Form Section */}
          {/* Desktop - Card wrapper */}
          {/* <Card ref={formRef} className="hidden md:block glass-card p-8">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Send me a message</h3>
            <div
              className="visme_d"
              data-title="Podcast Release Form"
              data-url="vm1grv8z-untitled-project"
              data-domain="forms"
              data-full-page="false"
              data-min-height="400px"
              data-form-id="139191"
            ></div>
          </Card> */}

         

          {/* Call to Action Card */}
          <Card className="glass-card p-4 md:p-6 text-center">
            <h4 className="text-base md:text-lg font-semibold mb-2 text-primary">
              Let's build something amazing together
            </h4>
            <p className="text-muted-foreground text-sm md:text-base">
              Ready to turn your ideas into reality? I'm here to help bring your vision to life.
            </p>
          </Card>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-gradient-glow rounded-full opacity-5 animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 md:w-56 md:h-56 bg-gradient-secondary rounded-full opacity-5 animate-float" />
      </div>

      {/* Mobile-specific CSS for Visme form */}
      <style >{`
        .visme_d iframe {
          width: 100% !important;
          border: none !important;
          border-radius: 12px !important;
        }
        
        @media (max-width: 767px) {
          .visme_d {
            min-height: 600px !important;
            margin: 0 !important;
          }
          
          .visme_d iframe {
            min-height: 600px !important;
          }
        }
        
        @media (max-width: 480px) {
          .visme_d {
            min-height: 650px !important;
          }
          
          .visme_d iframe {
            min-height: 650px !important;
          }
        }
      `}</style>
    </section>
  );
};