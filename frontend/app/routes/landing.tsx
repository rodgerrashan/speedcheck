import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-900">
      {/* <Navbar/> */}
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-100" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 px-6 text-center"
      >
        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          SpeedCheck <span className="text-blue-600">5G</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 text-lg text-gray-600 sm:mt-6 sm:text-xl md:text-2xl"
        >
          Experience the future of connectivity with{" "}
          <span className="font-semibold text-gray-800">Private 5G</span>
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10"
        >
          <Link
            to="/speedtest"
            className="rounded-2xl bg-black px-8 py-4 text-lg font-medium text-white shadow-lg transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Test
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 text-xs text-gray-400"
      >
        Powered by SLT-Mobitel • EngEx 2025
      </motion.footer>
    </div>
  );
}
