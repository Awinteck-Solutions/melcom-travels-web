import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

const EarthTransitionDemo = () => {
  const navigate = useNavigate();

  const demoRoutes = [
    { path: '/', label: 'Home' },
    { path: '/flights', label: 'Flights' },
    { path: '/flights/search', label: 'Flight Search' },
    { path: '/checkout', label: 'Checkout' },
    { path: '/contact', label: 'Contact' },
    { path: '/blogs', label: 'Blogs' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Earth Page Transition Demo</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How it works:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Routes with earth animation: <code className="bg-gray-100 px-2 py-1 rounded">/, /flights, /flights/search, /checkout</code></li>
          <li>Routes without earth animation: <code className="bg-gray-100 px-2 py-1 rounded">/contact, /blogs</code></li>
          <li>Earth animation duration: <strong>500ms</strong></li>
          <li>Earth rotates continuously during transition</li>
          <li>Page content fades in after animation completes</li>
        </ul>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {demoRoutes.map((route) => (
          <Button
            key={route.path}
            onClick={() => navigate(route.path)}
            className="h-16 text-lg"
            variant="outline"
            fullWidth
          >
            {route.label}
          </Button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Try this:</h3>
        <p className="text-blue-700">
          Click on different routes above to see the earth animation in action. 
          Routes with earth animation will show the rotating earth with "Exploring the world..." text, 
          while other routes will use the standard page transition.
        </p>
      </div>
    </div>
  );
};

export default EarthTransitionDemo;
