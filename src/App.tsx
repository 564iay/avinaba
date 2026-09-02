import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Menu, X } from 'lucide-react';
import FeaturedProjects from './components/FeaturedProjects';
import ExperienceTimeline from './components/ExperienceTimeline';
import HorizontalGallery from './components/HorizontalGallery';
import TechStack from './components/TechStack';
import ContactFooter from './components/ContactFooter';

function useTypewriter(text: string, speed: number = 50, deleteSpeed: number = 30, pauseTime: number = 3000) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayed(text.substring(0, index - 1));
          setIndex(index - 1);
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
      }
    } else {
      if (index < text.length) {
        timeout = setTimeout(() => {
          setDisplayed(text.substring(0, index + 1));
          setIndex(index + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, deleteSpeed, pauseTime]);

  return { displayed };
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 md:top-6 inset-x-0 mx-auto w-[92%] max-w-5xl z-50 px-6 py-3 sm:py-4 flex items-center justify-between pointer-events-auto backdrop-blur-xl bg-white/50 border border-white/50 shadow-lg rounded-full">
        {/* Left */}
        <a href="/" className="flex items-center gap-1 text-black font-medium text-[20px] sm:text-[26px]">
          Avinaba Biswas
        </a>
        
        {/* Center */}
        <nav className="hidden md:flex items-center gap-1 text-[23px] font-normal text-black/90">
          <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>,
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>,
          <a href="#contact-footer" className="hover:opacity-60 transition-opacity">Contact</a>
        </nav>

        {/* Right */}
        <div className="hidden md:block">
          <a href="#contact" className="text-[20px] sm:text-[23px] text-black font-normal underline decoration-1 underline-offset-4 hover:opacity-60 transition-opacity">
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex items-center justify-center w-[44px] h-[44px] z-50 relative"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} className="text-black" /> : <Menu size={28} className="text-black" />}
        </button>
      </header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 flex flex-col items-center justify-center gap-8 md:hidden backdrop-blur-sm"
          >
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium">Work</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium">About</a>
            <a href="#contact-footer" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium">Contact</a>
            <a href="#contact-footer" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium underline mt-4">Get in touch</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const services = ["React", "TypeScript", "Tailwind CSS", "Node.js", "Next.js"];

function ServiceSelector() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelected(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      <div>
        <h2 className="text-[20px] font-medium text-black">My core skills</h2>
        <p className="text-[#5A635A] mt-1">Select all that apply</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {services.map(service => {
          const isActive = selected.includes(service);
          return (
            <motion.button
              key={service}
              onClick={() => toggleService(service)}
              className={`relative flex items-center justify-center gap-2 px-5 py-3 rounded-full border transition-colors ${
                isActive 
                  ? "bg-[#1C2E1E] text-white border-[#1C2E1E] shadow-sm" 
                  : "bg-white text-[#1C2E1E] border-[#F1F3F1] hover:bg-neutral-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {service}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden flex items-center"
                  >
                    <Check size={16} strokeWidth={3} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="min-h-[80px]">
        <AnimatePresence mode="wait">
          {selected.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="text-[12px] italic text-[#1C2E1E]"
            >
              Please click to select skills above.
            </motion.p>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <p className="text-[15px] text-[#1C2E1E] font-medium leading-snug max-w-[250px]">
                Let's talk about: <span className="text-[#5A635A] font-normal">{selected.join(", ")}</span>
              </p>
              <a href="#contact-footer" className="whitespace-nowrap px-6 py-2.5 bg-[#1C2E1E] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity block text-center mt-2 sm:mt-0">
                Contact Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HeroContent() {
  const { displayed } = useTypewriter("Hi, I'm\nAvinaba Biswas");

  return (
    <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-16 min-h-screen flex flex-col justify-center pointer-events-none">
      <div className="lg:w-[55%] flex flex-col gap-8 pointer-events-auto mt-8 lg:mt-0">
        <div>
          <h1 className="text-[50px] leading-[1.08] lg:text-[76px] font-normal tracking-tight text-black whitespace-pre-wrap">
            {displayed}
            <span className="inline-block w-[2px] h-[0.8em] bg-black align-baseline ml-1 animate-pulse" />
          </h1>
          <p className="mt-6 text-[18px] lg:text-[21px] text-[#5A635A] max-w-md leading-relaxed whitespace-pre-wrap">
            {"I'm a developer specializing in building modern, interactive web experiences."}
          </p>
        </div>
        
        <ServiceSelector />
      </div>
    </div>
  );
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isSeeking = false;
    let targetTime = 0;
    let previousX: number | null = null;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const setVideoState = () => {
      if (mediaQuery.matches) {
        video.pause();
        return;
      }
      if (window.innerWidth < 1024) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || mediaQuery.matches) return;
      if (!video.duration || Number.isNaN(video.duration)) return;

      if (previousX === null) {
        previousX = e.clientX;
        targetTime = video.currentTime;
        return;
      }

      const delta = e.clientX - previousX;
      previousX = e.clientX;
      
      const duration = video.duration;
      const scrubAmount = (delta / window.innerWidth) * 0.8 * duration;
      
      targetTime = Math.max(0, Math.min(duration, targetTime + scrubAmount));

      if (!isSeeking) {
        isSeeking = true;
        video.currentTime = targetTime;
      }
    };

    const handleSeeked = () => {
      if (window.innerWidth < 1024 || mediaQuery.matches) {
        isSeeking = false;
        return;
      }
      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        video.currentTime = targetTime;
      } else {
        isSeeking = false;
      }
    };

    // Need to handle video loadedmetadata to make sure duration is available
    const handleLoadedMetadata = () => {
      setVideoState();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setVideoState);
    mediaQuery.addEventListener('change', setVideoState);
    
    // Initial call in case metadata is already loaded
    if (video.readyState >= 1) {
      setVideoState();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setVideoState);
      mediaQuery.removeEventListener('change', setVideoState);
    };
  }, []);

  return (
    <main className="relative bg-pink-50 text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-clip flex flex-col lg:block min-h-screen">
      {/* Source Credit: 
          Registry Version: 7.4.0
          Slug: motion-contact-cybernetic
          Source: https://motionsites.ai/?prompt=contact-cybernetic
          Creator: MotionSites
      */}
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full h-full bg-pink-50 lg:bg-transparent">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
          muted
          playsInline
          loop
          preload="auto"
        />
      </div>

      <Header />
      
      <div className="relative z-10 w-full min-h-screen">
        <HeroContent />
      </div>

      <FeaturedProjects />
      <ExperienceTimeline />
      <TechStack />
      <HorizontalGallery />
      <ContactFooter />
    </main>
  );
}
