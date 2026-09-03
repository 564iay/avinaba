import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const experiences = [
  { year: "2011", role: "Born in this World", company: "Iswarchandrapur, Nadia", description: "Kept exploring the world. In 2022 first indroduced to the wrold of programming." },
  { year: "2024", role: "Web Developer", company: "AVN Devs", description: "Built immersive landing pages and optimized web performance." },
  { year: "2026", role: "Web and Android App Developer", company: "Freelance", description: "Designed brand identities and user interfaces for startups. Currently working on an app." }
];

function TimelineNode({ item, index }: { item: typeof experiences[0], index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="hidden md:block w-5/12" />
      
      <div className="z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black shadow-lg absolute left-[28px] md:relative md:left-auto transform -translate-x-1/2 md:translate-x-0 mt-1 md:mt-0">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
      
      <div className="w-full md:w-5/12 pl-16 md:pl-0 md:px-6">
        <div className={`p-6 bg-white/50 backdrop-blur-md rounded-2xl border border-black/5 hover:border-black/20 transition-colors ${isEven ? 'md:text-right' : 'md:text-left'}`}>
          <h3 className="text-xl font-bold text-black">{item.year} - {item.role}</h3>
          <p className="text-black/70 font-medium mb-2">{item.company}</p>
          <p className="text-black/60 text-sm">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32 pointer-events-auto bg-transparent overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-medium text-black">Experience</h2>
      </motion.div>

      <div ref={containerRef} className="relative flex flex-col items-center max-w-4xl mx-auto">
        {/* The timeline line */}
        <div className="absolute top-0 bottom-0 w-1 bg-black/10 left-[28px] md:left-1/2 transform -translate-x-1/2" />
        <motion.div 
          className="absolute top-0 w-1 bg-black left-[28px] md:left-1/2 transform -translate-x-1/2 origin-top"
          style={{ height: lineHeight }}
        />

        {experiences.map((exp, idx) => (
          <TimelineNode key={idx} item={exp} index={idx} />
        ))}
      </div>
    </section>
  );
}
