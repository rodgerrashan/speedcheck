import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { Button } from '~/components/Button';
import SpeedTest from '~/home/speedtest';

// A simple counter for the live data effect
function StatCounter({ finalValue, duration = 2000, children }: { finalValue: number; duration?: number; children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * finalValue));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [finalValue, duration]);

  return (
    <div className="text-center">
      <p className="text-5xl font-bold tracking-tighter text-accent md:text-6xl">
        {count.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-secondary">{children}</p>
    </div>
  );
}

export default function HomePage() {
  // Custom variants for different animation types
  const heroVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const statsVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 40
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "backOut",
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const featureVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      skewY: 2
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const ctaVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // Custom spring transition
  const springTransition: Transition = {
    type: "spring",
    damping: 15,
    stiffness: 150,
    restDelta: 0.001
  };

  // Custom smooth transition
  const smoothTransition: Transition = {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1]
  };

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={heroVariants}
        className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center md:py-32"
      >




        <motion.h1 
          variants={titleVariants}
          className="text-4xl font-bold tracking-tight text-primary sm:text-7xl md:text-7xl"
        >
          Experience the <br />
          <motion.span 
            variants={titleVariants}
            className="text-accent text-5xl sm:text-8xl md:text-9xl"
            whileHover={{ 
              scale: 1.05,
              transition: springTransition 
            }}
          >
            Zero-Latency
          </motion.span> Network.
        </motion.h1>
        
        <motion.p 
          variants={titleVariants}
          className="mt-6 max-w-2xl text-lg text-secondary md:text-xl"
        >
          You are now connected to the EngEx Private 5G Network. Explore demos
          that were once impossible and witness the true speed of tomorrow.
        </motion.p>
        
        <motion.div 
          variants={titleVariants}
          className="mt-8"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              transition: springTransition
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <Button href="/demos">Explore Live Demos</Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 2. Stats Showcase Section */}
       <div className="mt-12">
        <SpeedTest />
      </div>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={statsVariants}
        transition={smoothTransition}
        className="container mx-auto grid grid-cols-1 gap-12 px-4 py-24 md:grid-cols-3 md:py-32"
      >
        <motion.div variants={statsVariants}>
          <StatCounter finalValue={1780000}>Millions of Data Points</StatCounter>
        </motion.div>
        <motion.div variants={statsVariants}>
          <StatCounter finalValue={99}>99.9% Uptime</StatCounter>
        </motion.div>
        <motion.div variants={statsVariants}>
          <StatCounter finalValue={5}>&lt;5ms Latency</StatCounter>
        </motion.div>
      </motion.section>
      
      {/* 3. Immersive Feature Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={featureVariants}
        transition={springTransition}
        className="container mx-auto px-4 py-24 text-center md:py-32"
      >
        <motion.h2 
          variants={featureVariants}
          className="text-4xl font-bold tracking-tight text-primary md:text-6xl"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          Unlock a New Reality.
        </motion.h2>
        
        <motion.p 
          variants={featureVariants}
          className="mt-4 max-w-3xl mx-auto text-lg text-secondary"
        >
          Stream 8K video without a buffer. Collaborate in real-time AR.
          Game with the power of a high-end PC, right from your device. This is
          not the future—it's your current connection.
        </motion.p>
      </motion.section>

      {/* 4. Final Call-to-Action Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={ctaVariants}
        transition={springTransition}
        className="container mx-auto px-4 py-24 text-center md:py-32"
      >
        <motion.h2 
          variants={ctaVariants}
          className="text-4xl font-bold tracking-tight text-primary md:text-6xl"
        >
          Ready to Begin?
        </motion.h2>
        
        <motion.div 
          variants={ctaVariants}
          className="mt-8"
        >
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -1, 1, 0],
              transition: {
                scale: springTransition,
                rotate: { duration: 0.6, ease: "easeInOut" }
              }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
          >
            <Button href="/demos" className="px-8 py-4 text-lg">
              Start Your Experience
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}