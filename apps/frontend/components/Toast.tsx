"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-close timer
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-72"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-lg">{message}</span>
            <button
              className="ml-4 text-gray-400 hover:text-white"
              onClick={() => setIsVisible(false)}
            >
              &times;
            </button>
          </div>
          <div className="relative h-1 mt-2 bg-gray-600 rounded overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-blue-500"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{
                duration: duration / 1000,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
