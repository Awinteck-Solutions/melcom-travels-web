import React, { useState } from 'react';
import { 
  LoadingSpinner, 
  SpinningDots, 
  CircularSpinner, 
  PulseLoader, 
  LoadingButton,
  LoadingOverlay,
  SkeletonLoader,
  CardSkeleton,
  FlightCardSkeleton
} from './LoadingAnimations';

const LoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Loading Animations Demo</h1>
      
      {/* Spinner Types */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Spinner Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="font-medium mb-4">Loading Spinner</h3>
            <LoadingSpinner size={60} color="#364A9C" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="font-medium mb-4">Spinning Dots</h3>
            <SpinningDots size={60} color="#364A9C" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="font-medium mb-4">Circular Spinner</h3>
            <CircularSpinner size={60} color="#364A9C" />
          </div>
        </div>
      </div>

      {/* Loading Buttons */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Loading Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <LoadingButton
            isLoading={isLoading}
            onClick={handleDemoLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            spinnerType="spinner"
          >
            Spinner Button
          </LoadingButton>
          <LoadingButton
            isLoading={isLoading}
            onClick={handleDemoLoading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
            spinnerType="dots"
          >
            Dots Button
          </LoadingButton>
          <LoadingButton
            isLoading={isLoading}
            onClick={handleDemoLoading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg"
            spinnerType="circular"
          >
            Circular Button
          </LoadingButton>
        </div>
      </div>

      {/* Skeleton Loaders */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skeleton Loaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-4">Basic Skeleton</h3>
            <div className="space-y-2">
              <SkeletonLoader height="20px" width="100%" />
              <SkeletonLoader height="16px" width="80%" />
              <SkeletonLoader height="16px" width="60%" />
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Card Skeleton</h3>
            <CardSkeleton />
          </div>
        </div>
      </div>

      {/* Flight Card Skeleton */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Flight Card Skeleton</h2>
        <FlightCardSkeleton />
      </div>

      {/* Loading Overlay Demo */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Loading Overlay</h2>
        <div className="relative h-64 bg-gray-100 rounded-lg">
          <LoadingOverlay isLoading={isLoading} spinnerType="circular">
            <div className="p-6">
              <h3 className="text-lg font-medium">Content behind overlay</h3>
              <p className="text-gray-600">This content is hidden when loading overlay is active.</p>
            </div>
          </LoadingOverlay>
        </div>
        <button
          onClick={handleDemoLoading}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Toggle Overlay
        </button>
      </div>
    </div>
  );
};

export default LoadingDemo;
