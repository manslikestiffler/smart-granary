import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Gauge,
  Users,
  Network,
  Mail,
  Save,
  RotateCcw,
  Sliders,
  Wifi,
  HardDrive,
  AlertTriangle,
  ThermometerIcon,
  Droplets,
  Warehouse,
  XCircle
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.15 },
};

function InfoCard({ title, description, recommendations, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Info Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">View Guidelines</span>
      </motion.button>

      {/* Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 top-8 right-0 w-80 bg-white rounded-lg shadow-lg border border-blue-100"
            {...scaleIn}
          >
            {/* Header */}
            <div className="p-4 bg-blue-50 rounded-t-lg border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">{title}</h4>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-600">{description}</p>

              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Recommended Settings:</h5>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      </div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const sensorInfo = {
  temperature: {
    title: "Temperature Control",
    description: "Monitors ambient temperature to prevent grain spoilage and maintain optimal storage conditions.",
    recommendations: [
      "Keep between 18°C - 28°C for most grains",
      "Avoid rapid temperature changes",
      "Monitor daily for seasonal adjustments"
    ]
  },
  humidity: {
    title: "Humidity Management",
    description: "Tracks air moisture levels to prevent mold growth and maintain grain quality.",
    recommendations: [
      "Maintain between 35% - 65% relative humidity",
      "Lower humidity for longer storage",
      "Check regularly during wet seasons"
    ]
  },
  moisture: {
    title: "Grain Moisture Content",
    description: "Measures the internal moisture of stored grain to ensure safe storage conditions.",
    recommendations: [
      "Keep between 12% - 16% for most grains",
      "Adjust based on grain type",
      "Monitor more frequently during first month of storage"
    ]
  },
  grainLevel: {
    title: "Storage Capacity",
    description: "Monitors grain quantity and storage utilization to optimize inventory management.",
    recommendations: [
      "Maintain minimum 10% buffer space",
      "Don't exceed 90% capacity for proper aeration",
      "Consider seasonal storage patterns"
    ]
  }
};

function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    criticalAlerts: true,
    weeklyReports: true
  });

  const [thresholds, setThresholds] = useState({
    temperature: { min: 18, max: 28 },
    humidity: { min: 35, max: 65 },
    moisture: { min: 12, max: 16 },
    grainLevel: { min: 10, max: 90 }
  });

  const [system, setSystem] = useState({
    dataRetention: 90,
    backupFrequency: 'daily',
    autoUpdate: true,
    maintenanceMode: false
  });

  const saveSettings = () => {
    // Save settings logic here
    console.log('Settings saved');
  };

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delayChildren: 0.2 }}
    >
      {/* Header */}
      <motion.div className="flex justify-between items-center mb-8" {...fadeIn}>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-1">Configure system preferences and thresholds</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-gray-600 bg-white border rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>
          <motion.button
            onClick={saveSettings}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor Thresholds */}
        <motion.div className="bg-white rounded-xl shadow-sm p-6" {...fadeIn}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Gauge className="w-6 h-6 text-blue-500" />
              <h2 className="text-lg font-semibold">Sensor Thresholds</h2>
            </div>
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="space-y-8">
            {/* Temperature Section */}
            <motion.div className="p-4 bg-gray-50 rounded-lg" {...fadeIn}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ThermometerIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="font-medium">Temperature Range (°C)</h3>
                  </div>
                  <InfoCard
                    title={sensorInfo.temperature.title}
                    description={sensorInfo.temperature.description}
                    recommendations={sensorInfo.temperature.recommendations}
                    icon={ThermometerIcon}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                    <motion.input
                      type="number"
                      value={thresholds.temperature.min}
                      onChange={(e) => setThresholds(prev => ({
                        ...prev,
                        temperature: { ...prev.temperature, min: parseFloat(e.target.value) }
                      }))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                    <motion.input
                      type="number"
                      value={thresholds.temperature.max}
                      onChange={(e) => setThresholds(prev => ({
                        ...prev,
                        temperature: { ...prev.temperature, max: parseFloat(e.target.value) }
                      }))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${
                    thresholds.temperature.max <= 28 && thresholds.temperature.min >= 18
                      ? 'bg-green-500'
                      : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm text-gray-600">
                    Current: {thresholds.temperature.min}°C - {thresholds.temperature.max}°C
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Humidity Section */}
            <motion.div className="p-4 bg-gray-50 rounded-lg" {...fadeIn}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Humidity Range (%)</h3>
                </div>
                <InfoCard
                  title={sensorInfo.humidity.title}
                  description={sensorInfo.humidity.description}
                  recommendations={sensorInfo.humidity.recommendations}
                  icon={Droplets}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                  <motion.input
                    type="number"
                    value={thresholds.humidity.min}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      humidity: { ...prev.humidity, min: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <motion.input
                    type="number"
                    value={thresholds.humidity.max}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      humidity: { ...prev.humidity, max: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  thresholds.humidity.max <= 65 && thresholds.humidity.min >= 35
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-600">
                  Current: {thresholds.humidity.min}% - {thresholds.humidity.max}%
                </span>
              </div>
            </motion.div>

            {/* Moisture Section */}
            <motion.div className="p-4 bg-gray-50 rounded-lg" {...fadeIn}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Warehouse className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Grain Moisture Content (%)</h3>
                </div>
                <InfoCard
                  title={sensorInfo.moisture.title}
                  description={sensorInfo.moisture.description}
                  recommendations={sensorInfo.moisture.recommendations}
                  icon={Warehouse}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                  <motion.input
                    type="number"
                    value={thresholds.moisture.min}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      moisture: { ...prev.moisture, min: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <motion.input
                    type="number"
                    value={thresholds.moisture.max}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      moisture: { ...prev.moisture, max: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  thresholds.moisture.max <= 16 && thresholds.moisture.min >= 12
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-600">
                  Current: {thresholds.moisture.min}% - {thresholds.moisture.max}%
                </span>
              </div>
            </motion.div>

            {/* Grain Level Section */}
            <motion.div className="p-4 bg-gray-50 rounded-lg" {...fadeIn}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Storage Capacity (%)</h3>
                </div>
                <InfoCard
                  title={sensorInfo.grainLevel.title}
                  description={sensorInfo.grainLevel.description}
                  recommendations={sensorInfo.grainLevel.recommendations}
                  icon={Database}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Alert Level</label>
                  <motion.input
                    type="number"
                    value={thresholds.grainLevel.min}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      grainLevel: { ...prev.grainLevel, min: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <motion.input
                    type="number"
                    value={thresholds.grainLevel.max}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      grainLevel: { ...prev.grainLevel, max: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  thresholds.grainLevel.max <= 90 && thresholds.grainLevel.min >= 10
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-600">
                  Current: {thresholds.grainLevel.min}% - {thresholds.grainLevel.max}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div className="bg-white rounded-xl shadow-sm p-6" {...fadeIn}>
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <motion.div className="flex items-center justify-between" {...fadeIn}>
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </motion.div>

            <motion.div className="flex items-center justify-between" {...fadeIn}>
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </motion.div>

            <motion.div className="flex items-center justify-between" {...fadeIn}>
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive critical alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications(prev => ({ ...prev, sms: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </motion.div>

            <motion.div className="flex items-center justify-between" {...fadeIn}>
              <div>
                <p className="font-medium">Critical Alerts Only</p>
                <p className="text-sm text-gray-500">Only receive urgent system alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.criticalAlerts}
                  onChange={(e) => setNotifications(prev => ({ ...prev, criticalAlerts: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </motion.div>

            <motion.div className="flex items-center justify-between" {...fadeIn}>
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-500">Receive a summary of system performance weekly</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={(e) => setNotifications(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </motion.div>
          </div>
        </motion.div>

        {/* System Configuration */}
        <motion.div className="bg-white rounded-xl shadow-sm p-6" {...fadeIn}>
          <div className="flex items-center space-x-2 mb-6">
            <Sliders className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">System Configuration</h2>
          </div>

          <div className="space-y-6">
            <motion.div {...fadeIn}>
              <label className="text-sm font-medium text-gray-700">Data Retention Period (days)</label>
              <motion.select
                value={system.dataRetention}
                onChange={(e) => setSystem(prev => ({ ...prev, dataRetention: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
                <option value={180}>180 days</option>
              </motion.select>
            </motion.div>

            <motion.div {...fadeIn}>
              <label className="text-sm font-medium text-gray-700">Backup Frequency</label>
              <motion.select
                value={system.backupFrequency}
                onChange={(e) => setSystem(prev => ({ ...prev, backupFrequency: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </motion.select>
            </motion.div>

            <motion.div className="flex items-center justify-between" {...fadeIn}>
              <div>
                <p className="font-medium">Auto Update</p>
                <p className="text-sm text-gray-500">Automatically install the latest updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={system.autoUpdate}
                  onChange={(e) => setSystem(prev => ({ ...prev, autoUpdate: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </motion.div>

            <motion.div className="flex items-center justify-between" {...fadeIn}>
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-gray-500">Temporarily disable all data monitoring</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={system.maintenanceMode}
                  onChange={(e) => setSystem(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </motion.div>
          </div>
        </motion.div>

        {/* Network Settings */}
        <motion.div className="bg-white rounded-xl shadow-sm p-6" {...fadeIn}>
          <div className="flex items-center space-x-2 mb-6">
            <Network className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Network Configuration</h2>
          </div>

          <div className="space-y-4">
            <motion.div {...fadeIn}>
              <label className="text-sm font-medium text-gray-700">API Endpoint</label>
              <motion.input
                type="text"
                placeholder="https://api.example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </motion.div>

            {/* More network settings can be added here */}
          </div>
        </motion.div>
      </div>

      {/* Danger Zone */}
      <motion.div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-100" {...fadeIn}>
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <motion.div className="flex items-center justify-between" {...fadeIn}>
            <div>
              <p className="font-medium text-red-700">Reset System</p>
              <p className="text-sm text-red-600">This will reset all settings to default</p>
            </div>
            <motion.button
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Settings;