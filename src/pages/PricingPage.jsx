import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Leaf, Sun, CloudRain, Wind, Droplets, HelpCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import Navbar from './priceNav';

const PricingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Get started with basic farming tools",
      cta: "Get Started",
      features: [
        "Basic sign-ups and sign-in with persistent sessions",
        "Current weather conditions",
        "Limited planting guide creation",
        "Limited Agri-Fintech AI queries",
        "Basic plant disease and soil analysis",
        "Access to agricultural news",
        "English, Shona, and Ndebele UI"
      ],
      popular: false
    },
    {
      name: "Basic",
      price: "$2.99",
      period: "/month",
      description: "Enhanced tools for small farms",
      cta: "Subscribe",
      features: [
        "Everything in Free tier",
        "Unlimited planting guide creation",
        "Enhanced weather forecasts with modern charts",
        "More precise location mapping",
        "Increased query limits for Agri-Fintech AI",
        "Improved plant disease and soil analysis",
        "Priority access in community forums"
      ],
      popular: false
    },
    {
      name: "Standard",
      price: "$4.99",
      period: "/month",
      description: "Advanced features for serious farmers",
      cta: "Subscribe",
      features: [
        "Everything in Basic tier",
        "Unlimited AI Agri-Fintech AI queries",
        "Detailed plant disease and soil analysis",
        "Advanced farm performance dashboard",
        "Historical weather data analysis",
        "Access to in-depth agricultural articles",
        "Live chat support"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "/month",
      description: "Complete solution for commercial farms",
      cta: "Subscribe",
      features: [
        "Everything in Standard tier",
        "Priority processing for all AI tools",
        "Collaborative guide sharing",
        "Financial performance tracking",
        "Real-time sensor data integration",
        "Advanced authentication options",
        "Dedicated expert consultation",
        "Offline access and PWA features"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Our Free plan is always available with no trial period needed. For paid plans, we offer a 7-day money-back guarantee."
    },
    {
      question: "How does the AI assistant work?",
      answer: "Our AI assistant provides personalized farming advice based on your location, crop type, and current conditions."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, mobile money, and bank transfers."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navbar isScrolled={isScrolled} />

      {/* Hero Section */}
      <div className="pt-20 py-16 px-4 text-center bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-4">Choose Your Farming Plan</h1>
          <p className="text-xl">Affordable solutions for every type of farmer</p>
          <div className="flex justify-center space-x-4 mt-6">
            <Sun className="w-6 h-6 animate-pulse" />
            <CloudRain className="w-6 h-6 animate-pulse delay-75" />
            <Wind className="w-6 h-6 animate-pulse delay-100" />
            <Droplets className="w-6 h-6 animate-pulse delay-150" />
          </div>
        </motion.div>
      </div>

      {/* Pricing Plans */}
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${plan.popular ? "ring-2 ring-green-500 transform scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="bg-green-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Leaf className="w-6 h-6 text-green-500 mr-2" />
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${plan.popular 
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about our farming plans</p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-green-500 mr-3" />
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                  </div>
                  <div className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 ml-8">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Need Help Choosing a Plan?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our agricultural experts are ready to help you find the perfect solution for your farm
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+263 77 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>support@smartgranary.co.zw</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-white text-green-600 px-8 py-3 rounded-lg font-medium flex items-center mx-auto"
            >
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;