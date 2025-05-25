import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DataLogs from './pages/DataLogs';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import AIAssistant from './pages/aiAssist';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import { SettingsProvider } from './context/SettingsContext';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignUpPage';
import PricingPage from './pages/PricingPage';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logs" element={<DataLogs />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/prices" element={<PricingPage />} />
            <Route path="/land" element={<LandingPage/>} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App; 