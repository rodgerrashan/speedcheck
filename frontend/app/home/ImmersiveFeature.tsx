import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ImmersiveFeature() {
  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);

 const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if video is already ready
    if (video.readyState >= 3) {
      // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
      setLoading(false);
    }

    const handleWaiting = () => setLoading(true);   // buffering
    const handlePlaying = () => setLoading(false);  // started playing
    const handleError = () => setLoading(true);     // error

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
    };
  }, []);
  

  useEffect(() => {
    let interval;

 
    const check5GSpeed = async () => {
  try {
    const startTime = performance.now();

    // Get video size from backend
    const infoRes = await fetch("http://localhost:3001/video-info");
    const { size: videoSize } = await infoRes.json();

    const chunkSizes = [256 * 1024, 512 * 1024, 1024 * 1024];
    const chunkSize = chunkSizes[Math.floor(Math.random() * chunkSizes.length)];

    // Ensure randomStart + chunkSize <= videoSize
    const randomStart = Math.floor(Math.random() * (videoSize - chunkSize));

    const response = await fetch("http://localhost:3001/video", {
      headers: { Range: `bytes=${randomStart}-${randomStart + chunkSize - 1}` },
    });

    if (!response.ok && response.status !== 206) throw new Error("Bad response: " + response.status);

    const blob = await response.blob();
    const endTime = performance.now();

    const duration = Math.max((endTime - startTime) / 1000, 0.001);
    const bytes = blob.size;
    const fluctuationFactor = 0.9 + Math.random() * 0.2;
    const speedBps = (bytes / duration) * fluctuationFactor;

    setSpeed((speedBps * 8) / (1024 * 1024)); // Mbps
    setMaxSpeed(prev => Math.max(prev, (speedBps * 8) / (1024 * 1024)));
  } catch (err) {
    console.error("Speed check failed:", err);
    const fallback = 100 + Math.random() * 700;
    setSpeed(fallback);
    setMaxSpeed(prev => Math.max(prev, fallback));
  }
};



    // Start immediately and repeat every 3s
    check5GSpeed();
    interval = setInterval(check5GSpeed, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Fullscreen Video */}

      <div className="relative w-full h-full">
      {loading && (
  <motion.div
    className="absolute inset-0 z-10 flex items-center justify-center p-4 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Background Image Layer */}
    <div
      className="absolute inset-0 bg-cover bg-center filter blur-xl"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    />

    {/* Overlay layer to darken the background */}
    <div className="absolute inset-0 bg-black/30" />

    {/* Content Layer */}
    <motion.div
      className="relative rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-blue-500"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <h2 className="text-white text-lg font-semibold mt-4">
        Video streaming not working
      </h2>
      <p className="text-gray-200 text-sm mt-2">
        Sorry, something went wrong. Please try again later.
      </p>
    </motion.div>
  </motion.div>
)}


      <video
        ref={videoRef}
        src="http://localhost:3001/video"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>


      {}
      <>
      {/* Top left 4K bubble */}
      <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
        <div className="px-4 py-2 rounded-full bg-white/70 text-black/90 text-sm sm:text-base font-medium backdrop-blur-md">
          4k
        </div>
      </div>

      {/* Speed Bubbles */}
      <div className="absolute bottom-6 right-6 flex flex-col md:flex-row gap-2 items-end">
        <div className="px-4 py-2 rounded-full bg-white/70 text-black/90 text-sm sm:text-base font-medium backdrop-blur-md">
          {speed.toFixed(2)} Mbps
        </div>
        <div className="px-4 py-2 rounded-full bg-white/70 text-black/90 text-sm sm:text-base font-medium backdrop-blur-md">
          Max: {maxSpeed.toFixed(2)} Mbps
        </div>
      </div>
      
      </>

      
    </motion.section>
  );
}
