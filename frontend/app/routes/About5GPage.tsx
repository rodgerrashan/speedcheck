import { motion } from 'framer-motion';
import React from 'react';

// TypeScript interface for the FeatureCard component's props
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Data array for the key features of 5G
const keyFeatures: FeatureCardProps[] = [
  {
    icon: <span className="text-5xl">⚡️</span>,
    title: 'Blazing Fast Speeds',
    description: 'Download full-length 8K movies in seconds. Experience data transfer rates up to 10 gigabits per second (Gbps).',
  },
  {
    icon: <span className="text-5xl">⏱️</span>,
    title: 'Ultra-Low Latency',
    description: 'Experience near-zero lag. With latency under 5 milliseconds, actions in games and remote operations feel instantaneous.',
  },
  {
    icon: <span className="text-5xl">📡</span>,
    title: 'Massive Connectivity',
    description: 'Connect millions of devices per square kilometer. 5G enables a new world of smart cities, IoT, and interconnected systems.',
  },
];

// Data array for real-world use cases
const useCases: FeatureCardProps[] = [
  {
    icon: <span className="text-5xl">🚗</span>,
    title: 'Autonomous Vehicles',
    description: 'Vehicles can communicate with each other and with city infrastructure in real-time, making roads safer and more efficient.',
  },
  {
    icon: <span className="text-5xl">🩺</span>,
    title: 'Remote Surgery',
    description: 'The instant response of 5G allows surgeons to operate on patients from miles away using robotic systems.',
  },
  {
    icon: <span className="text-5xl">🏭</span>,
    title: 'Smart Factories',
    description: 'Machines on the factory floor can communicate and coordinate with unprecedented speed and reliability.',
  },
];

// A reusable card component
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        {icon}
      </div>
      <h3 className="mt-6 text-2xl font-bold text-primary">{title}</h3>
      <p className="mt-2 text-base text-secondary">{description}</p>
    </div>
  );
}

export default function About5GPage() {
  // Animation variants for the container to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This creates the staggered effect
      },
    },
  };

  // Animation variants for the individual cards
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* 1. Introduction Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary md:text-6xl">
          The Power of 5G
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-secondary">
          5G is more than just faster internet. It's the fifth generation of
          wireless technology, designed to connect virtually everyone and
          everything together. Here’s what makes it a game-changer.
        </p>
      </motion.section>

      {/* 2. Key Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {keyFeatures.map((feature) => (
          <motion.div key={feature.title} >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </motion.div>
      
      {/* 3. Use Cases Section */}
      <section className="mt-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary md:text-5xl">
          Real-World Revolution
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-secondary">
          This technology isn't just theoretical. It's already powering innovations that will reshape our world.
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {useCases.map((useCase) => (
            <motion.div key={useCase.title} >
              <FeatureCard {...useCase} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}