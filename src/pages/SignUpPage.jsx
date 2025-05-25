import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Warehouse, MapPin, Crop, Mail, Phone, Lock, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    farmName: '',
    location: '',
    farmSize: '',
    farmingType: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Form submitted:', formData);
  };

  const farmingTypes = [
    "Crop Farming",
    "Livestock Farming",
    "Mixed Farming",
    "Horticulture",
    "Aquaculture"
  ];

  const locations = [
    "Harare",
    "Bulawayo",
    "Mutare",
    "Gweru",
    "Masvingo",
    "Chinhoyi",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center text-white">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Warehouse className="w-12 h-12 mx-auto mb-3" />
            </motion.div>
            <h1 className="text-2xl font-bold">Create your Smart Granary account</h1>
            <p className="mt-2 opacity-90">Join thousands of farmers improving their yields with AI assistance</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-green-600" />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Farm Name */}
            <div className="space-y-1">
              <label htmlFor="farmName" className="flex items-center text-sm font-medium text-gray-700">
                <Warehouse className="w-4 h-4 mr-2 text-green-600" />
                Farm Name
              </label>
              <input
                type="text"
                id="farmName"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Green Acres Farm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Location */}
              <div className="space-y-1">
                <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select city</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Farm Size */}
              <div className="space-y-1">
                <label htmlFor="farmSize" className="flex items-center text-sm font-medium text-gray-700">
                  <Crop className="w-4 h-4 mr-2 text-green-600" />
                  Farm Size (hectares)
                </label>
                <input
                  type="number"
                  id="farmSize"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="10"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Farming Type */}
            <div className="space-y-1">
              <label htmlFor="farmingType" className="flex items-center text-sm font-medium text-gray-700">
                <Crop className="w-4 h-4 mr-2 text-green-600" />
                Farming Type
              </label>
              <select
                id="farmingType"
                name="farmingType"
                value={formData.farmingType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select farming type</option>
                {farmingTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-green-600" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+263XXXXXXXXX"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4 mr-2 text-green-600" />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="flex items-center text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4 mr-2 text-green-600" />
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                By signing up, you agree to our <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!agreedToTerms}
              className={`w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center ${!agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Sign Up <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>

            {/* Sign In Link */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-green-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;