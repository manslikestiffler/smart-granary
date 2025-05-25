import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
  Info,
  Wheat,
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  Thermometer,
  Droplet,
  
  ChevronDown, // Added missing import
  Warehouse
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useMediaQuery from '@/hooks/useMediaQuery';

function Navbar({ transparent = false, showGetStarted = true }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { 
      path: '/sensors', 
      name: 'Sensors', 
      icon: Thermometer,
      subItems: [
        { path: '/temperature', name: 'Temperature', icon: Thermometer },
        { path: '/humidity', name: 'Humidity', icon: Droplet },
        { path: '/storage', name: 'Storage', icon: Warehouse }
      ]
    },
    { path: '/logs', name: 'Data Logs', icon: FileText },
    { path: '/alerts', name: 'Alerts', icon: Bell, badge: true },
    { path: '/ai-assistant', name: 'AI Assistant', icon: Sparkles },
  ];

  const userMenuItems = [
    { path: '/profile', name: 'Profile', icon: User },
    { path: '/settings', name: 'Settings', icon: Settings },
    { path: '/logout', name: 'Logout', icon: LogOut }
  ];

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 h-16 z-50",
          "flex items-center justify-between px-4 sm:px-6 lg:px-8",
          transparent ? "bg-transparent" : "bg-white border-b border-gray-100 shadow-sm"
        )}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Wheat className="w-8 h-8 text-green-600" />
            </motion.div>
            <span className={cn(
              "font-semibold text-lg",
              transparent ? "text-white" : "text-gray-900",
              "hidden md:block"
            )}>
              Smart Granary
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 h-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return item.subItems ? (
              <div key={item.path} className="relative group h-full">
                <button
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 h-full",
                    "text-gray-600 hover:text-green-600 transition-colors",
                    "relative",
                    isActive && "text-green-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>

                <div className="absolute left-0 mt-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <div className="py-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = location.pathname === subItem.path;

                      return (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm",
                            isSubActive ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          <SubIcon className="w-4 h-4 mr-3" />
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 h-full",
                  "text-gray-600 hover:text-green-600 transition-colors",
                  "relative group",
                  isActive && "text-green-600"
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </div>
                <span className="font-medium">{item.name}</span>
                
                {/* Active indicator */}
                {isActive && !transparent && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 rounded-t-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {showGetStarted && !transparent && (
            <button 
              onClick={() => navigate('/signup')}
              className="hidden md:block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Get Started
            </button>
          )}

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="py-1"> 
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <React.Fragment key={item.path}>
                          {item.path === '/logout' ? (
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Icon className="w-4 h-4 mr-3" />
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              to={item.path}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Icon className="w-4 h-4 mr-3" />
                              {item.name}
                            </Link>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed top-16 left-0 right-0 bg-white shadow-lg z-40",
              "md:hidden"
            )}
          >
            <div className="flex flex-col py-2 border-t border-gray-100">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);

                return (
                  <div key={item.path}>
                    {item.subItems ? (
                      <div className="border-b border-gray-100">
                        <button
                          onClick={() => navigate(item.path)}
                          className={cn(
                            "flex items-center justify-between w-full px-6 py-3",
                            "text-gray-700 hover:bg-gray-50",
                            isActive && "bg-green-50 text-green-600"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </button>
                        <div className="pl-14 pr-6 pb-2 space-y-2">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = location.pathname === subItem.path;

                            return (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                  "flex items-center px-3 py-2 rounded-md text-sm",
                                  isSubActive ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-100"
                                )}
                              >
                                <SubIcon className="w-4 h-4 mr-3" />
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-6 py-3 border-b border-gray-100",
                          "text-gray-700 hover:bg-gray-50",
                          isActive && "bg-green-50 text-green-600"
                        )}
                      >
                        <div className="relative">
                          <Icon className="w-5 h-5" />
                          {item.badge && (
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                          )}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden under navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;