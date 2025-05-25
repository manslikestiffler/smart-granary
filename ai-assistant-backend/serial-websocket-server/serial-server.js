import { SerialPort } from 'serialport';
import { WebSocketServer } from 'ws';

// --- Serial Port Configuration ---
const serialPortPath = '/dev/ttyACM0'; // Replace with your Arduino's serial port path
const baudRate = 9600;

// --- WebSocket Server Configuration ---
const websocketPort = 8080;

const serialPort = new SerialPort({
  path: serialPortPath,
  baudRate: baudRate,
});

const wss = new WebSocketServer({ port: websocketPort });

wss.on('connection', ws => {
  console.log('Client connected to WebSocket');

  serialPort.on('data', data => {
    const dataString = data.toString().trim();
    if (dataString.startsWith('TEMP,')) {
      const temperature = dataString.split(',')[1];
      console.log('Sending temperature:', temperature);
      ws.send(JSON.stringify({ temperature })); // Send data as JSON
    } else if (dataString.startsWith('ERROR:')) {
      console.log('Arduino Error:', dataString);
      ws.send(JSON.stringify({ error: dataString })); // Send error to client
    } else if (dataString.startsWith('Temperature STABLE.')) {
      console.log('Arduino Status:', dataString);
      ws.send(JSON.stringify({ status: dataString })); // Send stable status
    } else if (dataString.startsWith('Temperature EXCEEDED')) {
      console.log('Arduino Alert:', dataString);
      ws.send(JSON.stringify({ alert: dataString })); // Send exceeded alert
    } else if (dataString.startsWith('Temperature BELOW')) {
      console.log('Arduino Alert:', dataString);
      ws.send(JSON.stringify({ alert: dataString })); // Send below alert
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });

  ws.on('error', error => {
    console.error('WebSocket error:', error);
  });
});

serialPort.on('error', err => {
  console.error('Serial port error:', err);
});

console.log(`WebSocket server started on port ${websocketPort}`);
console.log(`Listening for serial data on ${serialPortPath} at ${baudRate} baud`);