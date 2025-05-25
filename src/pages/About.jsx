import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Shield,
  Cpu,
  BarChart3,
  Users,
  Github,
  Mail,
  Globe,
  Award,
  CheckCircle2,
  Brain,
  Lightbulb,
  TrendingUp,
  MessageSquarePlus
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
  hover: { scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.98 },
};

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function About() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Our intelligent grain storage system is designed to empower farmers with the insights and automation needed to protect their valuable harvests.";

  useEffect(() => {
    let timer;
    if (typedText.length < fullText.length) {
      timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 30); // Adjust the typing speed here (milliseconds per character)
    } else {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [typedText, fullText]);

  const services = [
    {
      icon: Server,
      title: "Real-time Monitoring",
      description: "Continuously track temperature, humidity, and moisture levels within your granary for optimal conditions.",
    },
    {
      icon: Shield,
      title: "Proactive Protection",
      description: "Receive timely alerts and insights to prevent spoilage, mold growth, and pest infestations.",
    },
    {
      icon: BarChart3,
      title: "Data Analytics & Reporting",
      description: "Access comprehensive reports and visualizations to understand storage trends and make informed decisions.",
    },
    {
      icon: Cpu,
      title: "Smart Automation",
      description: "Utilize automated controls for ventilation and other systems to maintain ideal storage environments.",
    },
    {
      icon: Brain,
      title: "AI Assistant for Farmers",
      description: "Get AI-powered recommendations on storage adjustments, potential risks, and best practices based on your data.",
    },
    {
      icon: Lightbulb,
      title: "Predictive Insights",
      description: "Leverage machine learning to anticipate potential storage issues before they escalate, minimizing losses.",
    },
    {
      icon: TrendingUp,
      title: "Market Analysis Integration",
      description: "Stay informed about market trends and how they might impact your storage strategies and sales.",
    },
    {
      icon: MessageSquarePlus,
      title: "Farmer Community Forum",
      description: "Connect with other farmers, share best practices, and learn from collective experiences in grain storage.",
    },
  ];

  const stats = [
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Continuous Monitoring" },
    { value: "<2min", label: "Alert Response Time" },
    { value: "15+", label: "Integrated Sensor Types" },
  ];

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-blue-700">About Smart Granary System</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {typedText}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: typedText.length < fullText.length ? 1 : 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            style={{ display: 'inline-block' }}
          >
            |
          </motion.span>
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-sm p-6 text-center"
          >
            <p className="text-3xl font-bold text-green-600">{stat.value}</p>
            <p className="text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </motion.div>

      {/* Our Commitment Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 rounded-xl p-8 mb-16"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Our Commitment</h2>
        <p className="text-lg text-gray-700 mb-4">
          At Smart Granary, we are dedicated to providing innovative solutions that help farmers reduce post-harvest losses and improve the quality of their stored grains. Our system is built with reliability, accuracy, and user-friendliness in mind.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Data-driven insights for better decision-making.</li>
          <li>Proactive alerts to prevent potential problems.</li>
          <li>Scalable solutions to fit various farm sizes.</li>
          <li>Continuous improvement and feature updates.</li>
          <li>Dedicated support for our farming community.</li>
        </ul>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
        <p className="text-lg text-blue-200 mb-8">
          Have questions or want to learn more about Smart Granary? Contact us today!
        </p>
        <div className="flex justify-center space-x-6">
          <motion.a
            href="mailto:contact@smartgranary.com"
            className="flex items-center space-x-2 text-white hover:text-blue-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-6 h-6" />
            <span>Contact Us</span>
          </motion.a>
          <motion.a
            href="https://github.com/smartgranary"
            className="flex items-center space-x-2 text-white hover:text-blue-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            href="https://smartgranary.com"
            className="flex items-center space-x-2 text-white hover:text-blue-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-6 h-6" />
            <span>Website</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm"
      >
        <div className="flex justify-center items-center space-x-2 mb-2">
          <Award className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-gray-700">Smart Granary System</span>
        </div>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <p>Developed by Computer Engineering Class of 2025, Chinhoyi University of Technology.</p>
        <div className="mt-4 space-x-4">
          <a href="/documentation" className="hover:text-blue-600">Documentation</a>
          <a href="/contributors" className="hover:text-blue-600">Contributors</a>
          <a href="/licenses" className="hover:text-blue-600">Licenses</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default About;