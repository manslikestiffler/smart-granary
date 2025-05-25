import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import cn from 'classnames';
import { Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const isAiAssistantPage = location.pathname === '/ai-assistant';
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname.startsWith('/auth');
  const isPricingPage = location.pathname === '/prices';
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';

  // Determine if navbar should be shown
  const showNavbar = !isLandingPage && !isAuthPage && !isPricingPage && !isSignupPage && !isLoginPage;

  return (
    <div className={cn("flex flex-col min-h-screen", {
      "bg-gradient-to-br from-green-50 to-white": isLandingPage,
      "bg-gray-50": !isLandingPage && !isAuthPage && !isPricingPage && !isSignupPage && !isLoginPage,
      "bg-white": isAuthPage || isPricingPage || isSignupPage || isLoginPage
    })}>
      {/* Conditionally render Navbar */}
      {showNavbar && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Navbar
            transparent={isLandingPage}
            showGetStarted={!isLandingPage}
          />
        </motion.nav>
      )}

      {/* Main content area with different layouts */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex-1 transition-all duration-300",
          {
            "p-0": isLandingPage,
            "p-4 sm:p-6 lg:p-8 mx-auto w-full max-w-7xl": !isLandingPage && !isAuthPage && !isPricingPage && !isSignupPage && !isLoginPage,
            "flex items-center justify-center": isAuthPage || isPricingPage || isSignupPage || isLoginPage
          }
        )}
      >
        {children}
      </motion.main>

      {/* Footer - hidden on landing and auth pages */}
      {!isLandingPage && !isAuthPage && !isPricingPage && !isSignupPage && !isLoginPage && (
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-6 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Smart Granary. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link to="/privacy" className="hover:text-green-600">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-green-600">Terms of Service</Link>
              <Link to="/contact" className="hover:text-green-600">Contact Us</Link>
            </div>
          </div>
        </footer>
      )}

      {/* Floating AI Assistant Icon */}
      {!isAiAssistantPage && !isLandingPage && !isAuthPage && !isPricingPage && !isSignupPage && !isLoginPage && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            to="/ai-assistant"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg p-3 hover:shadow-xl transition-all flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6" />
            <span className="sr-only">AI Assistant</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default Layout;