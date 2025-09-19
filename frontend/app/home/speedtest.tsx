import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '~/components/Button';

// TypeScript interface for the test results
interface SpeedTestResults {
  ping: number | null;
  download: number | null;
  upload: number | null;
}

export default function SpeedTest() {
  const [results, setResults] = useState<SpeedTestResults>({
    ping: null,
    download: null,
    upload: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setResults({ ping: null, download: null, upload: null });

    // Simulate network tests with realistic delays
    // --- 1. Ping Test ---
    await new Promise(resolve => setTimeout(resolve, 500));
    const ping = Math.floor(Math.random() * 50) + 5;
    setResults((prev) => ({ ...prev, ping }));
    
    // --- 2. Download Speed Test ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    const downloadSpeedMbps = Math.floor(Math.random() * 800) + 50;
    setResults((prev) => ({ ...prev, download: downloadSpeedMbps }));

    // --- 3. Upload Speed Test ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    const uploadSpeedMbps = Math.floor(Math.random() * 400) + 25;
    setResults((prev) => ({ ...prev, upload: uploadSpeedMbps }));
    
    setIsLoading(false);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b ">
      <div className="mx-auto max-w-6xl ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Unleash Your Network's
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> True Power</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Experience lightning-fast diagnostics with our revolutionary speed testing engine. 
            Discover the blazing performance that defines next-generation connectivity.
          </motion.p>
        </div>

        {/* Main Test Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=""
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-60"></div>
          <div className="relative z-10">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            <MeterDisplay 
              label="Latency" 
              value={results.ping} 
              unit="ms" 
              isLoading={isLoading}
              maxValue={100}
              color="text-blue-600"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100/50"
              meterColor="stroke-blue-500"
              description="Network response time"
            />
            <MeterDisplay 
              label="Download Speed" 
              value={results.download} 
              unit="Mbps" 
              isLoading={isLoading}
              maxValue={1000}
              color="text-blue-600"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100/50"
              meterColor="stroke-blue-500"
              description="Incoming data velocity"
            />
            <MeterDisplay 
              label="Upload Speed" 
              value={results.upload} 
              unit="Mbps" 
              isLoading={isLoading}
              maxValue={500}
              color="text-blue-600"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100/50"
              meterColor="stroke-blue-500"
              description="Outgoing data velocity"
            />
        </div>

            <div className="text-center">
              <Button
                onClick={runTest} 
                disabled={isLoading}
                className="font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95  hover:shadow-blue-500/25 relative overflow-hidden group"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <span className="relative z-10">
                  {isLoading ? (
                    <>
                      Analyzing Performance...
                    </>
                  ) : (
                    <>
                      Start Test
                    </>
                  )}
                </span>
              </Button>
              
              {!isLoading && (results.ping || results.download || results.upload) && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-gray-600 text-lg"
                >
                  Diagnostic complete. Your network is performing at{' '}
                  <span className="font-semibold text-blue-600">maximum efficiency</span>.
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper component for displaying stats with circular meter
interface MeterDisplayProps {
  label: string;
  value: number | null;
  unit: string;
  isLoading: boolean;
  maxValue: number;
  color: string;
  bgColor: string;
  meterColor: string;
  description: string;
}

function MeterDisplay({ label, value, unit, isLoading, maxValue, color, bgColor, meterColor, description }: MeterDisplayProps) {
  const percentage = value ? Math.min((value / maxValue) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 45; // radius of 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`${bgColor} rounded-3xl p-8 text-center relative overflow-hidden transform hover:scale-105 transition-all duration-300 border border-white/50 `}>
      {/* Background decoration */}
      <div className="absolute inset-0  pointer-events-none"></div>
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <p className="text-lg font-bold text-gray-800 mb-2 tracking-wide">{label}</p>
        <p className="text-sm text-gray-600 mb-6 font-medium">{description}</p>
        
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* SVG Circular Progress */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-gray-200"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className={meterColor}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ 
                strokeDashoffset: isLoading ? circumference : strokeDashoffset 
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-6 h-6  rounded-full animate-spin mb-1"></div>
                  <span className="text-xs text-gray-600">Testing</span>
                </motion.div>
              ) : (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center"
                >
                  <span className={`text-3xl font-black ${color}`}>
                    {value ?? '--'}
                  </span>
                  <span className="text-sm text-gray-600 font-bold">{unit}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Performance indicator */}
        {value && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
              percentage > 80 ? 'bg-emerald-100 text-emerald-800' :
              percentage > 50 ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {percentage > 80 ? '⚡ Blazing Fast' :
               percentage > 50 ? '🚀 High Performance' : ''}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}