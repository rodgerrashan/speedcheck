import { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// TypeScript type for our chart data points
type ChartData = {
  time: string;
  latency: number;
  bandwidth: number; // in Gbps
};

// TypeScript interface for the StatCard component's props
interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  description: string;
}

// A reusable card component for displaying key statistics
function StatCard({ title, value, unit, description }: StatCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <p className="text-sm font-medium text-secondary">{title}</p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-primary">
        {value} <span className="text-2xl text-secondary">{unit}</span>
      </p>
      <p className="mt-1 text-xs text-secondary">{description}</p>
    </div>
  );
}

// Initial data for the chart
const initialChartData: ChartData[] = [
  { time: '0s', latency: 4, bandwidth: 1.2 },
  { time: '5s', latency: 5, bandwidth: 1.1 },
  { time: '10s', latency: 3, bandwidth: 1.3 },
  { time: '15s', latency: 4, bandwidth: 1.4 },
  { time: '20s', latency: 5, bandwidth: 1.2 },
];

export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<ChartData[]>(initialChartData);
  const [activeDevices, setActiveDevices] = useState(0);

  // Effect to simulate live data updates for the chart and active devices
  useEffect(() => {
    // Simulate active devices count
    setActiveDevices(Math.floor(Math.random() * (150 - 120 + 1) + 120));

    const interval = setInterval(() => {
      setData((prevData) => {
        const lastTime = parseInt(prevData[prevData.length - 1].time.replace('s', ''));
        const newTime = `${lastTime + 5}s`;
        const newEntry: ChartData = {
          time: newTime,
          latency: Math.floor(Math.random() * (6 - 3 + 1) + 3), // Random latency between 3-6ms
          bandwidth: Math.round((Math.random() * (1.5 - 1.0) + 1.0) * 10) / 10, // Random bandwidth 1.0-1.5 Gbps
        };
        // Keep the chart data to a manageable size (e.g., last 12 entries)
        return [...prevData.slice(1), newEntry];
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-7xl px-4 py-12"
    >
      <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
        Network Dashboard
      </h1>
      <p className="mt-2 text-lg text-secondary">
        Real-time analytics from the EngEx Private 5G Network.
      </p>

      {/* Grid for Stat Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Average Latency"
          value="<5"
          unit="ms"
          description="Ultra-low for instant response."
        />
        <StatCard
          title="Peak Bandwidth"
          value="1.4"
          unit="Gbps"
          description="Capacity for multiple 8K streams."
        />
        <StatCard
          title="Jitter"
          value="<2"
          unit="ms"
          description="Stable and consistent connection."
        />
        <StatCard
          title="Active Devices"
          value={activeDevices.toString()}
          unit=""
          description="Concurrent users on the network."
        />
      </div>

      {/* Chart Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-primary">Performance Over Time</h2>
        <div className="mt-4 h-96 w-full rounded-lg border border-white/10 bg-white/5 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="time" stroke="#86868B" />
              <YAxis stroke="#86868B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1C1E',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="latency"
                stroke="#0071E3" // Accent color
                strokeWidth={2}
                name="Latency (ms)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bandwidth"
                stroke="#34C759" // A secondary color for contrast
                strokeWidth={2}
                name="Bandwidth (Gbps)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}