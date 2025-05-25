import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Wheat, ChevronDown, ChevronUp } from 'lucide-react';

const priceNav = ({ isScrolled }) => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

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

  return (
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
          
          <Link to="/Signin">
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
  );
};

export default priceNav;