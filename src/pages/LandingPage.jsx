import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplet, Warehouse, AlertTriangle, ChevronRight, Wheat, ChevronDown, ChevronUp, Monitor, Brain, Package, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  // Typing animation state
  const [typedText, setTypedText] = useState('');
  const fullText = "Protecting Your Harvest with Intelligent Monitoring";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFeatures = () => {
    setIsFeaturesOpen(!isFeaturesOpen);
  };

  const dropdownVariants = {
    open: { opacity: 1, height: 'auto', display: 'block' },
    closed: { opacity: 0, height: 0, display: 'none' },
  };

  const Chevron = ({ isOpen }) => (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className="ml-1"
    >
      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </motion.div>
  );

  // Animation variants for the hero section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const featuresData = [
    {
      icon: <Thermometer className="w-8 h-8 text-blue-500" />,
      title: "Real-time Temperature Monitoring",
      description: "Get instant alerts when temperature exceeds safe storage thresholds"
    },
    {
      icon: <Droplet className="w-8 h-8 text-green-500" />,
      title: "Humidity Control",
      description: "Prevent grain spoilage with precise humidity level tracking"
    },
    {
      icon: <Warehouse className="w-8 h-8 text-amber-500" />,
      title: "Smart Inventory Management",
      description: "Track grain quantities and predict storage needs"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: "Instant Alerts",
      description: "Receive SMS/email notifications for critical conditions"
    }
  ];

  const solutionData = [
    {
      icon: <Monitor className="w-8 h-8 text-blue-500" />,
      title: "Smart Storage Monitoring",
      description: "Our system continuously tracks temperature, humidity, and pest activity in your grain storage facilities. Get real-time alerts when conditions deviate from optimal ranges to prevent spoilage and quality degradation."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "AI-Powered Preservation",
      description: "Our AI analyzes storage conditions and provides personalized recommendations for ventilation, drying schedules, and pest control based on your specific grain type and local climate conditions."
    },
    {
      icon: <Package className="w-8 h-8 text-green-500" />,
      title: "Inventory Management",
      description: "Track your grain quantities with smart sensors that automatically log incoming and outgoing stock. Our system predicts storage needs and helps optimize your warehouse space utilization."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-amber-500" />,
      title: "Market Integration",
      description: "Access real-time market prices and connect with buyers directly through our platform. Our system suggests optimal selling times based on market trends and your storage conditions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with scroll effect and dropdowns */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <Wheat className={`w-8 h-8 ${isScrolled ? 'text-green-600' : 'text-white'}`} />
            <span className={`font-semibold text-lg ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Smart Granary
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Home
            </Link>
            
            <div className="relative">
              <button
                onClick={toggleFeatures}
                className={`flex items-center font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                Features
                <Chevron isOpen={isFeaturesOpen} />
              </button>
              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.ul
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                    className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10"
                  >
                    <li><Link to="/overview" className="block px-4 py-2 hover:bg-gray-100">Overview</Link></li>
                    <li><Link to="/analytics" className="block px-4 py-2 hover:bg-gray-100">Analytics</Link></li>
                    <li><Link to="/automation" className="block px-4 py-2 hover:bg-gray-100">Automation</Link></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            
            <a href="#about" className={`font-medium ${
              isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
            }`}>About</a>
            
            <Link 
              to="/prices" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Pricing
            </Link>
            
            <a href="#contact" className={`font-medium ${
              isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
            }`}>Contact</a>
            
            <Link to = "/login">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
              Sign In
            </button>
            </Link>
           
          </div>
          
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599385108614-86b8fce547ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
          style={{ backgroundPosition: 'center center' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative h-full flex flex-col justify-center items-center text-center px-6"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Smart Granary
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl text-green-300 mb-8 h-12 flex items-center justify-center"
          >
            <span className="border-r-2 border-green-300 pr-2 animate-pulse">
              {typedText}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg text-gray-100 mb-12"
          >
            An AI-powered grain storage monitoring system designed for smallholder farmers.
            Combining smart sensors with real-time alerts to prevent post-harvest losses
            and maximize your storage potential.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to ="/signup">
            <button  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Join Our Network
            </button>
            </Link>
           
            <button className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            How Smart Granary Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Complete Grain Storage Solution
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {solutionData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-gray-100 rounded-lg mr-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 pl-16">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Protect Your Harvest?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-lg mb-8"
          >
            Join thousands of farmers who are reducing post-harvest losses with our smart monitoring system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center">
              Get Started <ChevronRight className="ml-2" />
            </button>
            <button className="px-8 py-3 border border-white text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;