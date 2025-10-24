import React from 'react';
import { motion } from 'framer-motion';
import { loadingSpinner, pulseAnimation } from './AnimationVariants';

// Loading spinner component
export const LoadingSpinner = ({ size = 40, color = "#364A9C" }) => (
  <motion.div
    className="flex items-center justify-center"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.416"
        strokeDashoffset="7.854"
        opacity="0.8"
      />
    </svg>
  </motion.div>
);

// Alternative spinning dots loader
export const SpinningDots = ({ size = 40, color = "#364A9C" }) => (
  <div className="flex items-center justify-center space-x-1">
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="rounded-full"
        style={{
          width: size / 6,
          height: size / 6,
          backgroundColor: color
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }
        }}
      />
    ))}
  </div>
);

// Modern circular progress spinner
export const CircularSpinner = ({ size = 40, color = "#364A9C" }) => (
  <motion.div
    className="relative"
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={`${color}20`}
        strokeWidth="2"
        fill="none"
      />
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="62.832"
        strokeDashoffset="47.124"
        initial={{ strokeDashoffset: 62.832 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </svg>
  </motion.div>
);

// Pulse loading animation
export const PulseLoader = ({ size = 40, color = "#364A9C" }) => (
  <motion.div
    className="flex items-center justify-center space-x-2"
    variants={pulseAnimation}
    animate="animate"
  >
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="rounded-full"
        style={{
          width: size / 3,
          height: size / 3,
          backgroundColor: color
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
          transition: {
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }
        }}
      />
    ))}
  </motion.div>
);

// Skeleton loading component
export const SkeletonLoader = ({ 
  width = "100%", 
  height = "20px", 
  className = "",
  rounded = true 
}) => (
  <motion.div
    className={`bg-gray-200 ${rounded ? 'rounded' : ''} ${className}`}
    style={{ width, height }}
    animate={{
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  />
);

// Card skeleton loader
export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
    <SkeletonLoader height="24px" width="60%" />
    <SkeletonLoader height="16px" width="100%" />
    <SkeletonLoader height="16px" width="80%" />
    <div className="flex justify-between items-center pt-4">
      <SkeletonLoader height="20px" width="40%" />
      <SkeletonLoader height="32px" width="80px" className="rounded-full" />
    </div>
  </div>
);

// Flight card skeleton
export const FlightCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <SkeletonLoader height="20px" width="120px" />
        <SkeletonLoader height="16px" width="80px" />
      </div>
      <SkeletonLoader height="40px" width="40px" className="rounded-full" />
    </div>
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <SkeletonLoader height="24px" width="100px" />
        <SkeletonLoader height="16px" width="60px" />
      </div>
      <div className="flex-1 mx-4">
        <SkeletonLoader height="2px" width="100%" />
      </div>
      <div className="space-y-2">
        <SkeletonLoader height="24px" width="100px" />
        <SkeletonLoader height="16px" width="60px" />
      </div>
    </div>
    <div className="flex justify-between items-center pt-4">
      <SkeletonLoader height="20px" width="100px" />
      <SkeletonLoader height="32px" width="120px" className="rounded-full" />
    </div>
  </div>
);

// Search form skeleton
export const SearchFormSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="space-y-2">
          <SkeletonLoader height="16px" width="60%" />
          <SkeletonLoader height="40px" width="100%" className="rounded" />
        </div>
      ))}
    </div>
    <div className="flex justify-center pt-4">
      <SkeletonLoader height="48px" width="200px" className="rounded-full" />
    </div>
  </div>
);

// Full page loading overlay
export const LoadingOverlay = ({ isLoading, children, spinnerType = "circular" }) => (
  <div className="relative">
    {isLoading && (
      <motion.div
        className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          {spinnerType === "dots" ? (
            <SpinningDots size={60} color="#364A9C" />
          ) : spinnerType === "circular" ? (
            <CircularSpinner size={60} color="#364A9C" />
          ) : (
            <LoadingSpinner size={60} color="#364A9C" />
          )}
          <motion.p
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading...
          </motion.p>
        </div>
      </motion.div>
    )}
    {children}
  </div>
);

// Button loading state
export const LoadingButton = ({ 
  isLoading, 
  children, 
  loadingText = "Loading...", 
  className = "",
  spinnerType = "spinner", // "spinner", "dots", "circular"
  ...props 
}) => (
  <motion.button
    className={`relative ${className}`}
    disabled={isLoading}
    whileHover={!isLoading ? { scale: 1.05 } : {}}
    whileTap={!isLoading ? { scale: 0.95 } : {}}
    {...props}
  >
    {isLoading ? (
      <div className="flex items-center justify-center space-x-2">
        {spinnerType === "dots" ? (
          <SpinningDots size={20} color="currentColor" />
        ) : spinnerType === "circular" ? (
          <CircularSpinner size={20} color="currentColor" />
        ) : (
          <LoadingSpinner size={20} color="currentColor" />
        )}
        <span>{loadingText}</span>
      </div>
    ) : (
      children
    )}
  </motion.button>
);

// Progress bar animation
export const AnimatedProgressBar = ({ 
  progress = 0, 
  height = "4px", 
  color = "#364A9C",
  className = ""
}) => (
  <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`} style={{ height }}>
    <motion.div
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);
