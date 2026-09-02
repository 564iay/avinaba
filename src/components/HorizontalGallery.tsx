import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const galleryItems = [
  "https://s0.wp.com/mshots/v1/https://robotics-learning-webpage.vercel.app?w=1200&h=800",
  "https://s0.wp.com/mshots/v1/https://aurex-site-sepia.vercel.app?w=1200&h=800",
  "https://s0.wp.com/mshots/v1/https://ascendavndevs.vercel.app?w=1200&h=800",
  "https://s0.wp.com/mshots/v1/https://bodylab-3d.vercel.app?w=1200&h=800",
  "https://s0.wp.com/mshots/v1/https://demoresrurant-webpage1523.vercel.app?w=1200&h=800"
];

export default function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateRange = () => {
      if (carouselRef.current) {
        setScrollRange(carouselRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={targetRef} className="relative h-[300vh] pointer-events-auto">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 mb-8">
          <h2 className="text-4xl md:text-5xl font-medium text-black">Gallery</h2>
          <p className="text-[#5A635A] mt-4 text-lg">Swipe or scroll to explore</p>
        </div>

        <motion.div ref={carouselRef} style={{ x }} className="flex gap-8 px-5 sm:px-8 w-max">
          {galleryItems.map((url, idx) => (
            <div 
              key={idx} 
              className="relative w-[85vw] sm:w-[60vw] md:w-[45vw] h-[50vh] rounded-3xl overflow-hidden shrink-0 bg-white/50 backdrop-blur-sm shadow-xl"
              style={{ perspective: "1500px" }}
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${url})`,
                }}
                initial={{ rotateY: 15, scale: 0.8, opacity: 0 }}
                whileInView={{ rotateY: 0, scale: 1, opacity: 1 }}
                viewport={{ margin: "100%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
