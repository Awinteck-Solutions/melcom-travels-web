import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group } from '@mantine/core';

const RouteTestComponent = () => {
  const navigate = useNavigate();

  const testRoutes = [
    { path: '/', label: 'Home' },
    { path: '/flights', label: 'Flights' },
    { path: '/flights/search', label: 'Flight Search' },
    { path: '/contact', label: 'Contact' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/hotels', label: 'Hotels' },
    { path: '/cars', label: 'Cars' },
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Signup' },
    { path: '/profile', label: 'Profile' },
    { path: '/bookings', label: 'Bookings' },
    { path: '/notifications', label: 'Notifications' },
    { path: '/update-profile', label: 'Update Profile' },
    { path: '/change-password', label: 'Change Password' },
    { path: '/faqs', label: 'FAQs' },
    { path: '/checkout', label: 'Checkout' }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Route Transition Test</h1>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Earth Animation Applied to All Routes</h2>
        <p className="text-blue-700 mb-4">
          Every route now uses the earth animation with 5-second delay and no fading transitions.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="bg-white p-2 rounded border">
            <strong>Animation:</strong> Earth rotation
          </div>
          <div className="bg-white p-2 rounded border">
            <strong>Duration:</strong> 5 seconds
          </div>
          <div className="bg-white p-2 rounded border">
            <strong>Fade:</strong> Disabled
          </div>
          <div className="bg-white p-2 rounded border">
            <strong>Routes:</strong> All pages
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {testRoutes.map((route) => (
          <Button
            key={route.path}
            onClick={() => navigate(route.path)}
            variant="outline"
            size="sm"
            className="h-12 text-xs"
            fullWidth
          >
            {route.label}
          </Button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">✅ Implementation Complete</h3>
        <ul className="text-green-700 space-y-1 text-sm">
          <li>• Earth animation applied to ALL routes</li>
          <li>• No fading transitions between pages</li>
          <li>• 5-second earth animation delay</li>
          <li>• Instant page content appearance after animation</li>
          <li>• Consistent experience across all pages</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteTestComponent;
