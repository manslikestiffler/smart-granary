import React, { useState, useEffect } from 'react';

function Serial() {
  const [temperature, setTemperature] = useState(null);
  const [latestSensorData, setLatestSensorData] = useState(null);
  const [websocketStatus, setWebsocketStatus] = useState('Connecting...');
  const websocketPort = 3002; // Match the port in your Node.js server

  // WebSocket Connection for Real-time Updates
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:${websocketPort}`);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setWebsocketStatus('Connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.temperature !== undefined) {
          setTemperature(data.temperature);
        }
        // You can handle other data sent via WebSocket here (e.g., humidity, status)
        console.log('WebSocket Data Received:', data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setWebsocketStatus('Disconnected');
      // Attempt to reconnect after a delay
      setTimeout(() => {
        setWebsocketStatus('Reconnecting...');
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWebsocketStatus('Error');
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [websocketPort]);

  // Fetch Latest Sensor Data from API on Component Mount
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensor-data'); // Adjust URL if your backend is different
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLatestSensorData(data);
        if (data && data.temperature !== null) {
          setTemperature(data.temperature); // Initialize with the latest data
        }
      } catch (error) {
        console.error('Failed to fetch latest sensor data:', error);
      }
    };

    fetchLatestData();
  }, []);

  return (
    <div>
      <h1>Real-time Grain Monitoring</h1>
      <p>WebSocket Status: {websocketStatus}</p>

      <h2>Latest Data (Fetched from API)</h2>
      {latestSensorData ? (
        <div>
          <p>Temperature: {latestSensorData.temperature !== null ? `${latestSensorData.temperature} °C` : 'N/A'}</p>
          <p>Humidity: {latestSensorData.humidity !== null ? `${latestSensorData.humidity} %` : 'N/A'}</p>
          <p>Moisture: {latestSensorData.moisture !== null ? `${latestSensorData.moisture}` : 'N/A'}</p>
          <p>Location: {latestSensorData.location || 'N/A'}</p>
          <p>Status: {latestSensorData.status || 'N/A'}</p>
          <p>Timestamp: {latestSensorData.timestamp || 'N/A'}</p>
        </div>
      ) : (
        <p>Loading latest sensor data...</p>
      )}

      <h2>Real-time Temperature (via WebSocket)</h2>
      {temperature !== null ? (
        <p>Temperature: {temperature} °C (Real-time)</p>
      ) : (
        <p>Loading real-time temperature...</p>
      )}

      {/* You can add more UI elements here to display other real-time data */}
    </div>
  );
}

export default Serial;