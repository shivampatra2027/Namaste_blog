import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const DarkModeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`relative flex items-center justify-center w-14 h-8 bg-gray-200 dark:bg-gray-800 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 focus:ring-offset-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      {/* Background Track */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-cyan-500 dark:to-teal-600"
        initial={false}
        animate={{
          opacity: isDarkMode ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Toggle Circle */}
      <motion.div
        className="absolute w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
        initial={false}
        animate={{
          x: isDarkMode ? 22 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Icon Animation */}
        <motion.div
          key={isDarkMode ? 'moon' : 'sun'}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? (
            <Moon className="w-4 h-4 text-blue-600" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-600" />
          )}
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDarkMode 
            ? "0 0 20px rgba(59, 130, 246, 0.3)" 
            : "0 0 20px rgba(251, 191, 36, 0.3)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default DarkModeToggle;
