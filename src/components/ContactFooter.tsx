export default function ContactFooter() {
  return (
    <section id="contact-footer" className="relative z-10 w-full bg-black text-white pointer-events-auto rounded-t-[3rem] mt-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-[12vw] md:text-8xl font-medium tracking-tighter leading-none mb-10">
              LET'S BUILD<br/>SOMETHING.
            </h2>
            <a href="mailto:hello@example.com" className="inline-block px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
              hello@example.com
            </a>
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col gap-8 text-lg text-white/60">
            <p className="leading-relaxed">
              I'm currently available for freelance work. If you have a project that needs some creative magic or a technically complex problem to solve, I'd love to hear about it.
            </p>
            <div className="flex flex-wrap gap-6 mt-4">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-sm text-white/40">
          <p>© {new Date().getFullYear()} Avinaba Biswas. All rights reserved.</p>
          <a href="#" className="mt-4 sm:mt-0 hover:text-white transition-colors">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
