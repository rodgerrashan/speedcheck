import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { Button } from '~/components/Button';
import SpeedTest from '~/home/speedtest';
import ImmersiveFeature from '~/home/ImmersiveFeature';



const features = [
  {
    icon: "⚡️",
    title: "Get Things Done in a Blink",
    description:
      "Imagine downloading a full movie in just a few seconds. That’s 5G speed. Waiting for things to load will become a thing of the past.",
  },
  {
    icon: "⏱️",
    title: "No More Annoying Delays",
    description:
      "You know the lag on video calls or in online games? 5G gets rid of that delay. Actions become instant, making everything feel incredibly responsive.",
  },
  {
    icon: "📡",
    title: "Everything Connects, Nothing Slows Down",
    description:
      "Ever been in a crowd and your internet stops working? 5G is built to handle millions of devices at once, so everyone gets a fast connection.",
  },
];

// Animation variants for the grid container to stagger the cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for each individual feature card
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


export default function HomePage() {


  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

  

  return (
    
    <div className="overflow-x-hidden">
      <section id = "hero">
         <>
      {/* Speed Bubbles Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const direction = Math.random() > 0.5 ? 1 : -1; // left-to-right or right-to-left
          const size = 6 + Math.random() * 14;
          const yPos = Math.random() * windowSize.height; // safe now
          const hue = Math.random() * 360;

          return (
            <motion.div
              key={i}
              initial={{
                x: direction === 1 ? -size * 2 : windowSize.width + size * 2,
                y: yPos,
                opacity: 0
              }}
              animate={{
                x: direction === 1 ? windowSize.width + size * 2 : -size * 2,
                y: yPos,
                opacity: [0, 1, 0]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2 + Math.random() * 2,
                ease: "linear",
                delay: Math.random() * 2
              }}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `hsl(${hue}, 70%, 70%)`,
              }}
            />
          );
        })}
      </div>

      {/* Content Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={heroVariants}
        className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center md:py-32"
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
          
<Button
  onClick={() => {
    const demosElement = document.getElementById("speed");
    if (demosElement) {
      demosElement.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Test Speed
</Button>


<Button
  className="ml-4 bg-transparent border border-accent text-accent hover:bg-accent hover:text-white"
  onClick={() => {
    const demosElement = document.getElementById("demos");
    if (demosElement) {
      demosElement.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Explore
</Button>

          </motion.div>
        </motion.div>
      </motion.section>
    </>
      
    </section>
     


      {/* 2. Stats Showcase Section */}
      <section id='speed'>
        <div className="mt-12">
        <SpeedTest />
      </div>

      </section>
       
      


      <section id="demos">
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
          not the future, it's your current connection.
        </motion.p>
      </motion.section>

      <ImmersiveFeature />
      </section>


      <section id="features">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="container mx-auto px-4 py-24 text-center md:py-32"
      >
        <motion.h2
          
          className="text-4xl font-bold tracking-tight text-primary md:text-6xl"
        >
          Why 5G is a Game-Changer
        </motion.h2>

        {/* Grid container for the feature cards */}
        <motion.div
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <span className="text-5xl">{feature.icon}</span>
              <h3 className="mt-6 text-2xl font-bold text-primary">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
      
    

      {/* 4. Final Call-to-Action Section */}
      <section id='contact'>
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
            <Button href="/demos" className="px-8 py-4 text-lg ">
              Start Your Experience
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
      </section>


      <footer className="border-t  bg-gray-900 px-2 py-2 text-center text-sm text-gray-500">
  <div className="container mx-auto">
    <span>&copy; {new Date().getFullYear()} Speedy. All rights reserved.
      <span className="mt-2 pl-2">
      Crafted by{" "}
      <a 
        href="https://www.facebook.com/profile.php?id=61578732612775" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="font-stretch-50% text-gray-400 hover:text-blue-500 transition-colors"
      >
        .helloworld
      </a>
    </span>


    </span>
    
  </div>
</footer>

    </div>
  );
}