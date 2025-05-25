import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  AlertTriangle,
  Thermometer,
  Droplet,
  Warehouse,
  Clock,
  Bell,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Zap,
  ShieldAlert,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Info
} from "lucide-react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/alerts");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching alerts:", err);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    };

    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 15000);

    return () => clearInterval(intervalId);
  }, []);

  // Filter alerts based on search and status
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || alert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get last 4 alerts
  const lastFourAlerts = [...filteredAlerts]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 4);

  // Prepare data for pie chart (last 5 alerts)
  const pieChartData = [
    { name: "Critical", value: alerts.filter(a => a.severity === "critical").length, color: "#ef4444" },
    { name: "Warning", value: alerts.filter(a => a.severity === "warning").length, color: "#f59e0b" },
    { name: "Resolved", value: alerts.filter(a => a.status === "resolved").length, color: "#10b981" }
  ];

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === "critical" && a.status === "active").length,
    warning: alerts.filter(a => a.severity === "warning" && a.status === "active").length,
    resolved: alerts.filter(a => a.status === "resolved").length,
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "temperature": return Thermometer;
      case "humidity": return Droplet;
      case "moisture": return Warehouse;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity, status) => {
    if (status === "resolved") return "green";
    return severity === "critical" ? "red" : "amber";
  };

  const refreshAlerts = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("http://localhost:5000/api/alerts");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-red-50 text-red-600 rounded-lg shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>Error loading alerts: {error}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Refresh Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <ShieldAlert className="w-6 h-6 mr-2 text-blue-600" />
            System Alerts
          </h1>
          <p className="text-gray-500 mt-1">Monitor and manage system alerts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshAlerts}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "text-blue-600" : "text-gray-600"}`} />
          </motion.div>
          <span>Refresh</span>
        </motion.button>
      </motion.div>

      {/* Alert Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {/* ... (keep your existing stats cards) ... */}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* ... (keep your existing filters) ... */}
      </motion.div>

      {/* Alerts and Pie Chart Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Last 4 Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Alerts</h2>
          <AnimatePresence>
            {lastFourAlerts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow p-6 text-center text-gray-500"
              >
                <Info className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                No recent alerts found
              </motion.div>
            ) : (
              lastFourAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                const isExpanded = expandedAlert === alert.id;
                const severityColor = getSeverityColor(alert.severity, alert.status);

                return (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 border-${severityColor}-500`}
                  >
                    <motion.div
                      onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`p-2 rounded-lg bg-${severityColor}-100 text-${severityColor}-600`}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {alert.message}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Warehouse className="w-4 h-4 mr-1" />
                                {alert.location}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {new Date(alert.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-${severityColor}-100 text-${severityColor}-700`}>
                            {alert.status === "resolved" ? "Resolved" : alert.severity}
                          </span>
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 border-t border-gray-100 space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-gray-600">Type</p>
                                <p className="font-medium capitalize">{alert.type}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Value</p>
                                <p className="font-medium">
                                  {alert.value}{alert.type === "temperature" ? "°C" : "%"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Threshold</p>
                                <p className="font-medium">
                                  {alert.threshold}{alert.type === "temperature" ? "°C" : "%"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Duration</p>
                                <p className="font-medium">{alert.duration}</p>
                              </div>
                            </div>
                            {alert.recommendations?.length > 0 && (
                              <div>
                                <p className="text-gray-600 font-medium">Recommended Actions</p>
                                <ul className="list-disc list-inside pl-5 space-y-1">
                                  {alert.recommendations.map((rec, i) => (
                                    <li key={i} className="text-gray-700">{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Alert Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieChartData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;