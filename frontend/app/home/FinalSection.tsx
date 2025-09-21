import { motion } from 'framer-motion';

// Animation variants for a smooth, springy entrance
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20, delay: 0.2 },
  },
};

export default function FinalSection() {
  return (
    <section id="contact">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={sectionVariants}
        // Ample vertical padding for a clean, spacious look
        className="container mx-auto px-4 py-24 text-center md:py-32"
      >
        <motion.h2
          variants={sectionVariants}
          // Large, bold, and tightly-spaced headline, consistent with our theme
          className="text-4xl font-bold tracking-tight text-primary md:text-6xl"
        >
          Your Journey <span className="text-accent">Starts Now</span>
        </motion.h2>
        
        <motion.p
          variants={sectionVariants}
          // Uses our theme's secondary color for a clear visual hierarchy
          className="mt-6 max-w-3xl mx-auto text-lg text-secondary"
        >
          You've read about the incredible speed and the end of frustrating delays.
          But reading about the future is one thing. The next step is to actually
          {/* Highlighted text uses the primary color to pop */}
          <span className="font-bold text-primary"> feel it</span>. In our demo area, 
          you won't just see charts and numbers; you'll experience the magic of a world 
          that responds as fast as you can think. The real adventure is just a click away.
        </motion.p>
      </motion.div>
    </section>
  );
}