import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const projects = [
  {
    title: "Robotics Learning",
    category: "Web Application",
    image: "https://s0.wp.com/mshots/v1/https://robotics-learning-webpage.vercel.app?w=1200&h=800",
    link: "https://robotics-learning-webpage.vercel.app"
  },
  {
    title: "Aurex Headphones",
    category: "Marketplace",
    image: "https://s0.wp.com/mshots/v1/https://aurex-site-sepia.vercel.app?w=1200&h=800",
    link: "https://aurex-site-sepia.vercel.app"
  },
  {
    title: "Ascend App",
    category: "Landing Page",
    image: "https://s0.wp.com/mshots/v1/https://ascendavndevs.vercel.app?w=1200&h=800",
    link: "https://ascendavndevs.vercel.app"
  },
  {
    title: "Bodylab Human Anatomy",
    category: "3D Experience (WIP)",
    image: "https://s0.wp.com/mshots/v1/https://bodylab-3d.vercel.app?w=1200&h=800",
    link: "https://bodylab-3d.vercel.app"
  },
  {
    title: "Restaurant Demo",
    category: "Web Design",
    image: "https://s0.wp.com/mshots/v1/https://demoresrurant-webpage1523.vercel.app?w=1200&h=800",
    link: "https://demoresrurant-webpage1523.vercel.app"
  }
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="relative w-full aspect-video rounded-3xl overflow-hidden block group cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
      
      <div 
        className="absolute bottom-8 left-8 pointer-events-none"
        style={{ transform: "translateZ(60px)" }}
      >
        <p className="text-white/90 text-sm mb-2">{project.category}</p>
        <h3 className="text-white text-2xl md:text-3xl font-medium">{project.title}</h3>
      </div>
    </motion.a>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-medium text-black">Featured Projects</h2>
      </motion.div>
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
