'use client';
import React, { useState } from "react";

import { AnimatePresence, motion } from 'framer-motion';

const AuthFlow = () => {
  const [step, setStep] = useState<"login" | "welcome" | "parent-dashboard">("login");

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
      <div className="relative z-20 w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {step === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-center pt-14">
             
              </div>
                
            </motion.div>
          ) : step === "welcome" ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.0, ease: 'easeInOut' }}
            >
             
            </motion.div>
          ) : (
            <motion.div
              key="parent-dashboard"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.0, ease: 'easeInOut' }}
            >
             
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthFlow; 