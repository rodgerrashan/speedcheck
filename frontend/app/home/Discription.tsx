import { motion } from 'framer-motion';

export default function Discription() {
  // Animation variants for the SVG line
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, bounce: 0 },
        opacity: { duration: 0.1 },
      },
    },
  };

  // Animation variants for the text to fade in after the line
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8, // Delay to let the line draw first
        duration: 0.8,
      },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="container mx-auto mt-24 px-4 py-8 text-center text-secondary"
    >
      {/* Animated SVG line */}
      <motion.svg
        width="100%"
        height="2"
        viewBox="0 0 1000 2"
        preserveAspectRatio="none"
        className="mb-8"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="1000"
          y2="1"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          variants={lineVariants}
        />
      </motion.svg>
      
      {/* Animated text content */}
      <motion.p variants={textVariants}>
        EngEx Private 5G Exhibition &copy; {currentYear}
      </motion.p>
    </motion.footer>
  );
}