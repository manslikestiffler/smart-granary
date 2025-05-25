import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Thermometer,
  Droplet,
  Warehouse,
  AlertTriangle,
  Clock,
  Sun,
  BarChart3,
  CheckCircle2,
  Calendar,
  CloudRain,
  AlertCircle,
  Cloud,
  Wind,
  Droplets,
  Loader2,
  Wheat,
  ChevronDown,
  ChevronUp,
  Check,
  X
} from 'lucide-react';

function Dashboard() {
  // Sensor data state
  const [sensorData, setSensorData] = useState({ 
    temperature: 24.5, 
    humidity: 55, 
    moisture: 14,
    timestamp: new Date().toISOString()
  });

  // Weather data state
  const [weatherData, setWeatherData] = useState({
    current: {
      temp: 0,
      condition: 'Loading...',
      humidity: 0,
      windSpeed: 0,
      precipitation: 0,
      icon: ''
    },
    forecast: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // Maize crop data
  const maizeCropData = {
    fertilizer: {
      title: "Fertilizer Application",
      icon: <Droplet className="text-blue-500" />,
      details: {
        "Recommended Type": "NPK 8-14-28",
        "Application Rate": "50kg per hectare",
        "Optimal Timing": "Early growth stage (3-4 weeks after planting)",
        "Application Method": "Broadcast or band application",
        "Important Notes": "Apply when soil is moist for best absorption. Avoid application before heavy rain."
      }
    },
    irrigation: {
      title: "Irrigation Maintenance",
      icon: <CloudRain className="text-cyan-500" />,
      details: {
        "Schedule": "Every 5-7 days during dry season",
        "Method": "Drip irrigation recommended",
        "Water Requirement": "500-700mm per growing season",
        "Monitoring": "Check soil moisture at 15cm depth",
        "Efficiency Tips": "Water early morning to reduce evaporation"
      }
    },
    harvest: {
      title: "Harvest Preparation",
      icon: <CheckCircle2 className="text-green-500" />,
      details: {
        "Optimal Timing": "90-120 days after planting",
        "Maturity Indicators": "Kernels hard, moisture content 20-24%",
        "Yield Estimate": "3-5 tons per hectare (improved varieties)",
        "Harvest Method": "Hand picking or mechanical harvesting",
        "Post-Harvest": "Dry to 12-13% moisture for storage"
      }
    },
    pestControl: {
      title: "Pest Control",
      icon: <AlertTriangle className="text-red-500" />,
      details: {
        "Common Pests": "Stem borer, Armyworm, Aphids",
        "Recommended Control": "Neem-based biopesticides",
        "Scouting Frequency": "Weekly field inspections",
        "Threshold": "5% infected plants for action",
        "Prevention": "Crop rotation and resistant varieties"
      }
    }
  };

  // Fetch weather data from WeatherAPI
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '3db2323a48a8404da5c82159252205';
        const city = 'Chinhoyi';
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        
        setWeatherData({
          current: {
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph,
            precipitation: data.current.precip_mm,
            icon: data.current.condition.icon
          },
          forecast: data.forecast.forecastday.map(day => ({
            date: day.date,
            day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
            high: day.day.maxtemp_c,
            low: day.day.mintemp_c,
            precipitation: day.day.daily_chance_of_rain,
            condition: day.day.condition.text,
            icon: day.day.condition.icon
          }))
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err.message);
        setLoading(false);
        
        // Fallback data if API fails
        setWeatherData({
          current: {
            temp: 24,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            precipitation: 0,
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
          },
          forecast: [
            { day: 'Today', high: 26, low: 18, precipitation: 20, condition: 'Partly Cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
            { day: 'Tomorrow', high: 29, low: 20, precipitation: 0, condition: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
            { day: 'Wed', high: 27, low: 19, precipitation: 40, condition: 'Patchy rain', icon: '//cdn.weatherapi.com/weather/64x64/day/176.png' },
            { day: 'Thu', high: 25, low: 17, precipitation: 80, condition: 'Moderate rain', icon: '//cdn.weatherapi.com/weather/64x64/day/302.png' },
            { day: 'Fri', high: 23, low: 16, precipitation: 30, condition: 'Light rain', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png' }
          ]
        });
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 3600000); // Refresh every hour

    return () => clearInterval(intervalId);
  }, []);

  // Generate mock sensor data
  const generateDailyData = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      temperature: 22 + Math.sin(i/3) * 5 + Math.random(),
      humidity: 50 + Math.sin(i/2) * 10 + Math.random() * 5,
      moisture: 12 + Math.sin(i/4) * 3 + Math.random()
    }));
  };

  const [dailyData, setDailyData] = useState(generateDailyData());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSensorData({
        temperature: 22 + Math.random() * 6,
        humidity: 50 + Math.random() * 20,
        moisture: 12 + Math.random() * 5,
        timestamp: new Date().toISOString()
      });
      setDailyData(generateDailyData());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Crop harvest data for pie chart
  const cropData = [
    { name: 'Maize', value: 45, color: '#4ade80' },
    { name: 'Sorghum', value: 30, color: '#fbbf24' },
    { name: 'Wheat', value: 25, color: '#a78bfa' },
    { name: 'Soybeans', value: 20, color: '#60a5fa' }
  ];

  // Upcoming tasks
  const upcomingTasks = [
    { 
      id: 1,
      task: 'Fertilizer application - Maize field', 
      date: '25 Mar, 2025', 
      type: 'fertilizer',
      icon: <Droplet className="w-5 h-5 text-blue-500" />,
      status: 'pending'
    },
    { 
      id: 2,
      task: 'Irrigation system check', 
      date: '28 Mar, 2025', 
      type: 'irrigation',
      icon: <CloudRain className="w-5 h-5 text-cyan-500" />,
      status: 'pending'
    },
    { 
      id: 3,
      task: 'Maize harvest preparation', 
      date: '02 Apr, 2025', 
      type: 'harvest',
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      status: 'pending'
    },
    { 
      id: 4,
      task: 'Pest control inspection - Maize', 
      date: '05 Apr, 2025', 
      type: 'pestControl',
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      status: 'pending'
    }
  ];

  // Open modal with task details
  const openTaskModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    // Reset expanded sections when opening new modal
    setExpandedSections({});
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mark task as complete
  const completeTask = (taskId) => {
    // In a real app, you would update the backend here
    console.log(`Task ${taskId} marked as complete`);
    closeModal();
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Farm Management Dashboard</h1>
          <p className="text-gray-600">Chinhoyi, Zimbabwe</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date(sensorData.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Grain Overview Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
          Grain Overview
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sensor Data Graph */}
          <div>
            <h3 className="text-lg font-medium mb-4">Average Sensor Readings Today</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(hour) => `${hour}:00`}
                  />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'temperature') return [`${value.toFixed(1)}°C`, 'Temperature'];
                      if (name === 'humidity') return [`${value.toFixed(1)}%`, 'Humidity'];
                      return [`${value.toFixed(1)}%`, 'Moisture'];
                    }}
                    labelFormatter={(hour) => `Time: ${hour}:00`}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="Temperature"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="humidity"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    name="Humidity"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="moisture"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    name="Moisture"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crop Harvest Pie Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4">Crop Harvest</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {cropData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    formatter={(value, name, props) => [`${value} hectares`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Current Readings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Thermometer className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-xl font-semibold">{sensorData.temperature.toFixed(1)}°C</p>
                <p className="text-xs text-gray-500">Optimal: 18-28°C</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Droplet className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-xl font-semibold">{sensorData.humidity.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">Optimal: 35-65%</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Warehouse className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Moisture</p>
                <p className="text-xl font-semibold">{sensorData.moisture.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">Optimal: 12-16%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Weather Conditions - Chinhoyi</h3>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-red-600 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>Error: {error} (using sample data)</span>
            </div>
          ) : (
            <>
              {/* Current Weather */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{weatherData.current.temp}°C</p>
                    <p className="text-gray-600 capitalize">{weatherData.current.condition.toLowerCase()}</p>
                  </div>
                  {weatherData.current.icon && (
                    <img 
                      src={`https:${weatherData.current.icon}`} 
                      alt={weatherData.current.condition}
                      className="w-16 h-16"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.appendChild(
                          <Cloud className="w-16 h-16 text-blue-400" />
                        );
                      }}
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span>Humidity {weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-5 h-5 text-blue-500" />
                    <span>Wind {weatherData.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CloudRain className="w-5 h-5 text-blue-500" />
                    <span>Precip {weatherData.current.precipitation}mm</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-blue-500" />
                    <span>UV Index {weatherData.current.uv || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast */}
              <div>
                <h4 className="font-medium mb-3">5-Day Forecast</h4>
                <div className="space-y-3">
                  {weatherData.forecast.map((day, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                    >
                      <span className="w-20 font-medium">
                        {index === 0 ? 'Today' : day.day}
                      </span>
                      <div className="flex items-center space-x-2 w-16">
                        {day.icon && (
                          <img 
                            src={`https:${day.icon}`} 
                            alt={day.condition}
                            className="w-8 h-8"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.appendChild(
                                <Cloud className="w-8 h-8 text-gray-400" />
                              );
                            }}
                          />
                        )}
                        <span className="text-sm text-gray-600 capitalize">
                          {day.condition.toLowerCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{day.high}°</span>
                        <span className="text-gray-500">{day.low}°</span>
                      </div>
                      {day.precipitation > 0 ? (
                        <div className="flex items-center space-x-1 w-16 justify-end">
                          <CloudRain className="w-4 h-4 text-blue-500" />
                          <span className="text-blue-500 text-sm">{day.precipitation}%</span>
                        </div>
                      ) : (
                        <div className="w-16"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <motion.div 
                key={task.id}
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3 p-3 border-b border-gray-100 last:border-0"
              >
                <div className="mt-1">
                  {task.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{task.task}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{task.date}</span>
                  </div>
                </div>
                <button 
                  onClick={() => openTaskModal(task)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-green-700 flex items-center">
                      <Wheat className="mr-2" />
                      Maize Crop Management
                    </h3>
                    <h4 className="text-lg font-semibold mt-1">
                      {maizeCropData[selectedTask.type].title}
                    </h4>
                    <p className="text-gray-500 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Scheduled: {selectedTask.date}
                    </p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {Object.entries(maizeCropData[selectedTask.type].details).map(([key, value]) => (
                    <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100"
                        onClick={() => toggleSection(key)}
                      >
                        <span className="font-medium text-left">{key}</span>
                        {expandedSections[key] ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedSections[key] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-3 overflow-hidden"
                          >
                            <div className="py-3 text-gray-600">
                              {value}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-medium flex items-center text-yellow-700">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Important Notes
                  </h5>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-yellow-700">
                    <li>Monitor weather conditions before executing task</li>
                    <li>Check soil moisture levels for optimal timing</li>
                    <li>Record all activities in farm logbook</li>
                    <li>Wear appropriate protective equipment</li>
                  </ul>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => completeTask(selectedTask.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Mark as Complete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;