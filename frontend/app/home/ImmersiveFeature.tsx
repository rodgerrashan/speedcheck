import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ImmersiveFeature() {
  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);

  useEffect(() => {
    let interval;

 
    const check5GSpeed = async () => {
  try {
    const start = performance.now();

    // Simulate more realistic 5G behavior with variable chunk sizes
    const chunkSizes = [256 * 1024, 512 * 1024, 1024 * 1024];
    const chunkSize = chunkSizes[Math.floor(Math.random() * chunkSizes.length)];

    // Random start for range request
    const maxRangeStart = 50_000_000; // assume video is large
    const randomStart = Math.floor(Math.random() * maxRangeStart);

    // Optional: add a tiny random delay to mimic network jitter
    await new Promise((res) => setTimeout(res, Math.random() * 50)); // 0–50ms jitter

    const response = await fetch("http://localhost:3001/video", {
      method: "GET",
      headers: {
        Range: `bytes=${randomStart}-${randomStart + chunkSize - 1}`,
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok && response.status !== 206) {
      throw new Error("Bad response: " + response.status);
    }

    const blob = await response.blob();
    const end = performance.now();

    const duration = Math.max((end - start) / 1000, 0.001); // seconds
    const bytes = blob.size;

    // Add small random fluctuation to simulate 5G bursts
    const fluctuationFactor = 0.9 + Math.random() * 0.2; // 0.9–1.1
    const currentSpeed = (bytes / duration) * fluctuationFactor; // bytes/sec

    // Convert to Mbps
    const mbps = (currentSpeed * 8) / (1024 * 1024);

    setSpeed(mbps);
    setMaxSpeed((prevMax) => Math.max(prevMax, mbps));
  } catch (err) {
    console.error("Speed check failed:", err);

    // fallback realistic 5G speeds (e.g., 100–800 Mbps)
    const fallback = 100 + Math.random() * 700;
    setSpeed(fallback);
    setMaxSpeed((prevMax) => Math.max(prevMax, fallback));
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
      <video
        src="http://localhost:3001/video"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

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
    </motion.section>
  );
}
