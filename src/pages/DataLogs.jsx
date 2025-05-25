import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Thermometer,
  Droplet,
  Leaf,
  Gauge,
  Clock,
  ChevronRight,
  RefreshCw,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

function DataLogs() {
  // Generate premium dummy data
  const generateDummyData = () => {
    const now = new Date();
    return [
      {
        id: 1,
        timestamp: new Date(now - 1000 * 60 * 30).toISOString(),
        temperature: 24.5,
        humidity: 68,
        moisture: 42,
        status: 'normal'
      },
      {
        id: 2,
        timestamp: new Date(now - 1000 * 60 * 90).toISOString(),
        temperature: 26.2,
        humidity: 72,
        moisture: 38,
        status: 'warning'
      },
      {
        id: 3,
        timestamp: new Date(now - 1000 * 60 * 150).toISOString(),
        temperature: 23.8,
        humidity: 65,
        moisture: 45,
        status: 'normal'
      },
      {
        id: 4,
        timestamp: new Date(now - 1000 * 60 * 210).toISOString(),
        temperature: 27.1,
        humidity: 75,
        moisture: 35,
        status: 'warning'
      },
      {
        id: 5,
        timestamp: new Date(now - 1000 * 60 * 270).toISOString(),
        temperature: 22.4,
        humidity: 62,
        moisture: 48,
        status: 'normal'
      }
    ];
  };

  const [logs] = useState(generateDummyData());
  const [lastUpdated] = useState(new Date());
  const [activeCard, setActiveCard] = useState(null);

  // Prepare data for the chart (last 6 hours)
  const chartData = [
    { time: '6h ago', moisture: 35, temperature: 22.4, humidity: 62 },
    { time: '5h ago', moisture: 38, temperature: 23.1, humidity: 64 },
    { time: '4h ago', moisture: 42, temperature: 23.8, humidity: 65 },
    { time: '3h ago', moisture: 45, temperature: 24.2, humidity: 67 },
    { time: '2h ago', moisture: 41, temperature: 25.0, humidity: 69 },
    { time: '1h ago', moisture: 39, temperature: 25.8, humidity: 71 },
    { time: 'Now', moisture: 42, temperature: 24.5, humidity: 68 }
  ];

  const toggleCard = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Farm Sensor Dashboard</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last Updated: {lastUpdated.toLocaleDateString()}, {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </motion.button>
      </motion.div>

      {/* Current Readings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Temperature Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-blue-500"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Thermometer className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500">Temperature</p>
                <p className="text-2xl font-bold">24.5°C</p>
              </div>
            </div>
            <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Optimal
            </div>
          </div>
        </motion.div>

        {/* Humidity Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-green-500"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Droplet className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500">Humidity</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
            </div>
            <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Optimal
            </div>
          </div>
        </motion.div>

        {/* Moisture Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-amber-500"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-100 rounded-full">
                <Leaf className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500">Soil Moisture</p>
                <p className="text-2xl font-bold">42%</p>
              </div>
            </div>
            <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Optimal
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Logs Container */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Sensor Readings Chart - Compact Version */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Gauge className="w-6 h-6 text-purple-500 mr-2" />
            Sensor Readings Over Time
          </h2>
          <div className="h-48"> {/* Reduced height */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Moisture (%)', angle: -90, position: 'insideLeft', style: { fill: '#f59e0b', fontSize: 12 } }}
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  label={{ value: 'Temperature (°C)', angle: 90, position: 'insideRight', style: { fill: '#3b82f6', fontSize: 12 } }}
                  orientation="right"
                  domain={[0, 40]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="humidity"
                  label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft', offset: 60, style: { fill: '#10b981', fontSize: 12 } }}
                  domain={[0, 100]}
                  hide={true}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="moisture"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="humidity"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Logs - Taller Scrollable Version */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3, type: 'spring', stiffness: 100 }}
        >
          <h2 className="text-xl font-semibold flex items-center mb-4">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            Recent Sensor Logs
          </h2>
          <div className="space-y-4 h-[400px] overflow-y-auto pr-2"> {/* Added fixed height and scroll */}
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden ${activeCard === log.id ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <button
                    onClick={() => toggleCard(log.id)}
                    className="w-full p-5 text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${
                          log.status === 'critical' ? 'bg-red-100 text-red-500' :
                          log.status === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                          'bg-green-100 text-green-500'
                        }`}>
                          {log.status === 'critical' ? (
                            <AlertTriangle className="w-5 h-5" />
                          ) : log.status === 'warning' ? (
                            <AlertTriangle className="w-5 h-5" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="font-medium">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-right">
                        <div>
                          <p className="text-gray-500">Temperature</p>
                          <p className="font-medium">{log.temperature}°C</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Humidity</p>
                          <p className="font-medium">{log.humidity}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Moisture</p>
                          <p className="font-medium">{log.moisture}%</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                          activeCard === log.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */} 
                  <AnimatePresence>
                    {activeCard === log.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-gray-100">
                          <div className="space-y-3">
                            <h3 className="font-medium text-gray-700">Details</h3>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status:</span>
                              <span className={`font-medium ${
                                log.status === 'critical' ? 'text-red-500' :
                                log.status === 'warning' ? 'text-yellow-500' :
                                'text-green-500'
                              }`}>
                                {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Location:</span>
                              <span className="font-medium">North Field</span>
                            </div>
                          </div>

                          <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={[log, ...logs.filter(l => l.id !== log.id).slice(0, 3)]}>
                                <Line
                                  type="monotone"
                                  dataKey="temperature"
                                  stroke="#3b82f6"
                                  strokeWidth={2}
                                  dot={false}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="humidity"
                                  stroke="#10b981"
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="flex items-center justify-end space-x-3">
                            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                              View Details
                            </button>
                            <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                              Compare
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default DataLogs;