import React, { useState, useEffect } from 'react';
import { useChartConfig } from '@/hooks/useChartConfig.js';
import { useDataAggregation } from '@/hooks/useDataAggregation.js';
import { useSensorStats } from '@/hooks/useSensorStats.js';
import {
  Thermometer,
  Droplets,
  Warehouse,
  Info,
  AlertTriangle
} from 'lucide-react';
import SensorDetailModal from '../modals/SensorDetailModal';
import { cn } from '@/lib/utils';

function SimpleDashboard({ nextUpdateIn, historicalData }) {
  console.log('Dashboard component rendering'); // <--- ADD THIS LIN
  const [sensorData, setSensorData] = useState({ temperature: null, humidity: null, moisture: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);

  useEffect(() => {
    console.log('useEffect running'); // Add this at the start of useEffect
    const fetchData = async () => {
      console.log('fetchData called'); // Add this at the start of fetchData
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/sensor-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Keep this
        setSensorData(data);
        console.log('Sensor data state:', sensorData); // Keep this
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching sensor data:', err);
      }
    };

    fetchData(); // Initial call
    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('Sensor data state updated:', sensorData);
  }, [sensorData]);

  const getStatusColor = (value, type) => {
    switch(type) {
      case 'temperature':
        return value > 28 ? 'red' : value < 18 ? 'blue' : 'green';
      case 'humidity':
        return value > 65 ? 'red' : value < 35 ? 'orange' : 'green';
      case 'moisture':
        return value > 16 ? 'red' : value < 12 ? 'orange' : 'green';
      default:
        return 'black';
    }
  };

  const getStatusMessage = (value, type) => {
    switch(type) {
      case 'temperature':
        if (value > 28) return 'Too Hot!';
        if (value < 18) return 'Too Cold!';
        return 'Good';
      case 'humidity':
        if (value > 65) return 'Too Humid!';
        if (value < 35) return 'Too Dry!';
        return 'Good';
      case 'moisture':
        if (value > 16) return 'Too Wet!';
        if (value < 12) return 'Too Dry!';
        return 'Good';
      default:
        return 'Unknown';
    }
  };

  const formatTimeRemaining = (ms) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const handleCardClick = (type) => {
    const sensorDataForModal = {
      name: type === 'temperature' ? 'Temperature' :
            type === 'humidity' ? 'Humidity' : 'Grain Moisture',
      value: sensorData[type],
      unit: type === 'temperature' ? '°C' : '%',
      color: getStatusColor(sensorData[type], type),
      ranges: {
        min: type === 'temperature' ? 18 : type === 'humidity' ? 35 : 12,
        max: type === 'temperature' ? 28 : type === 'humidity' ? 65 : 16,
        optimal: type === 'temperature' ? 22 : type === 'humidity' ? 50 : 14
      }
    };

    // Assuming historicalData is an array of objects with timestamp and sensor values
    const sensorHistory = historicalData ? historicalData.map(reading => ({
      timestamp: reading.timestamp,
      value: reading[type]
    })) : [];

    setSelectedSensor({ ...sensorDataForModal, historicalData: sensorHistory });
  };

  if (loading) {
    return <div className="p-8 min-h-screen bg-gray-100">Loading sensor data...</div>;
  }

  if (error) {
    return <div className="p-8 min-h-screen bg-gray-100 text-red-500">Error loading sensor data: {error}</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Grain Storage Monitor
              </h1>
              <p className="text-gray-500 mt-1">
                Real-time environmental conditions monitoring
              </p>
            </div>
            <div className="text-right bg-white/80 px-4 py-2 rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Last Updated: {new Date().toLocaleTimeString()}</p>
              <p className="text-gray-500 text-sm">Next Update: {formatTimeRemaining(nextUpdateIn)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Temperature Card */}
        {/* ... (rest of your rendering logic remains the same) ... */}
      </div>

      {/* Status Footer */}
      {/* ... (rest of your rendering logic remains the same) ... */}

      <SensorDetailModal
        visible={!!selectedSensor}
        onClose={() => setSelectedSensor(null)}
        sensorData={selectedSensor}
        historicalData={selectedSensor?.historicalData}
      />
    </div>
  );
}

export default SimpleDashboard; 