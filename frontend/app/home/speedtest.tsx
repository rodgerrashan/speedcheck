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

    // --- 1. Ping Test ---
    const startTime = Date.now();
    // We fetch a tiny resource (or just headers) to measure round-trip time.
    // The '/favicon.ico' is a small, common file.
    await fetch('/favicon.ico', { cache: 'no-store' });
    const ping = Date.now() - startTime;
    setResults((prev) => ({ ...prev, ping }));
    
    // --- 2. Download Speed Test ---
    const downloadStartTime = Date.now();
    const response = await fetch('/dummy.dat', { cache: 'no-store' }); // A small file in your /public folder
    const blob = await response.blob();
    const downloadEndTime = Date.now();
    const downloadDuration = (downloadEndTime - downloadStartTime) / 1000; // in seconds
    const fileSizeInBits = blob.size * 8;
    const downloadSpeedMbps = (fileSizeInBits / downloadDuration) / 1_000_000;
    setResults((prev) => ({ ...prev, download: Math.round(downloadSpeedMbps) }));

    // --- 3. Upload Speed Test ---
    const uploadData = new Blob([new ArrayBuffer(1 * 1024 * 1024)], { type: 'application/octet-stream' }); // 1MB blob
    const uploadStartTime = Date.now();
    // Note: This requires a server endpoint that can accept and discard the data.
    // For this example, we simulate it by just timing the request creation.
    // A real implementation would need a backend.
    await fetch('/api/speedtest', { method: 'POST', body: uploadData });
    const uploadEndTime = Date.now();
    const uploadDuration = (uploadEndTime - uploadStartTime) / 1000; // in seconds
    const uploadSizeInBits = uploadData.size * 8;
    const uploadSpeedMbps = (uploadSizeInBits / uploadDuration) / 1_000_000;
    setResults((prev) => ({ ...prev, upload: Math.round(uploadSpeedMbps) }));
    
    setIsLoading(false);
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-bold text-primary">Network Performance Test</h2>
      <p className="mt-2 text-secondary">
        Check the real-time performance of your 5G connection.
      </p>

      <div className="mt-6 flex flex-col items-center justify-around gap-8 md:flex-row">
        {/* Results Display */}
        <div className="flex w-full justify-around text-center">
          <StatDisplay label="Ping" value={results.ping} unit="ms" isLoading={isLoading} />
          <StatDisplay label="Download" value={results.download} unit="Mbps" isLoading={isLoading} />
          <StatDisplay label="Upload" value={results.upload} unit="Mbps" isLoading={isLoading} />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={runTest} disabled={isLoading}>
          {isLoading ? 'Testing...' : 'Run Test'}
        </Button>
      </div>
    </div>
  );
}

// Helper component for displaying stats with animation
interface StatDisplayProps {
  label: string;
  value: number | null;
  unit: string;
  isLoading: boolean;
}

function StatDisplay({ label, value, unit, isLoading }: StatDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-secondary">{label}</p>
      <div className="relative mt-2 h-16 w-24">
        <AnimatePresence>
          {isLoading ? (
            <motion.div key="loader" className="absolute inset-0 flex items-center justify-center text-2xl text-accent">...</motion.div>
          ) : (
            <motion.p
              key={value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-primary"
            >
              {value ?? '--'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <p className="text-xs text-secondary">{unit}</p>
    </div>
  );
}