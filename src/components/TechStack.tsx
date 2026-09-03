import { motion } from "motion/react";

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Next.js", "Node.js", "Framer Motion", "Three.js", "WebGL", "GraphQL", "Figma", "Python", "C++", "Kotlin", "Java", "AI Agents"
];

// Duplicate the array a few times so the marquee loops seamlessly
const marqueeItems = [...techStack, ...techStack, ...techStack, ...techStack];

export default function TechStack() {
  return (
    <section className="relative z-10 w-full py-24 overflow-hidden bg-transparent pointer-events-auto">
      {/* Gradient fades for the edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-pink-50 to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-pink-50 to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 25 
        }}
      >
        <div className="flex gap-16 px-8 items-center">
          {marqueeItems.map((tech, idx) => (
            <span key={idx} className="text-5xl md:text-8xl font-bold text-black/10 tracking-tighter uppercase transition-colors hover:text-black/40 cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
