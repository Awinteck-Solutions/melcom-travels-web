import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';

const OverlayDemo = () => {
  const navigate = useNavigate();

  const testRoutes = [
    { path: '/', label: 'Home' },
    { path: '/flights', label: 'Flights' },
    { path: '/contact', label: 'Contact' },
    { path: '/blogs', label: 'Blogs' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Overlay Transition Demo</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Overlay Settings</h2>
        
        <div className="space-y-6">
          <div>
            <Text size="sm" fw={500} mb="xs">
              Background: Semi-transparent Black
            </Text>
            <div className="bg-gray-100 p-3 rounded text-sm text-gray-600">
              The overlay uses a semi-transparent black background (rgba(0, 0, 0, 0.39)) that provides a subtle dark overlay while keeping the page content visible.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">How it works:</h2>
        <ul className="text-blue-700 space-y-2">
          <li>• <strong>Overlay Effect:</strong> Earth animation appears over the current page</li>
          <li>• <strong>Semi-transparent Black Background:</strong> Dark overlay (rgba(0, 0, 0, 0.59))</li>
          <li>• <strong>White Earth Image:</strong> Inverted earth image for maximum visibility</li>
          <li>• <strong>Professional Look:</strong> Dark overlay provides excellent contrast</li>
          <li>• <strong>High Visibility:</strong> White earth and text with strong shadows</li>
        </ul>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {testRoutes.map((route) => (
          <Button
            key={route.path}
            onClick={() => navigate(route.path)}
            variant="outline"
            size="lg"
            className="h-16"
            fullWidth
          >
            {route.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">✅ Benefits</h3>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• Smoother visual transition</li>
            <li>• Page content remains visible</li>
            <li>• White earth for maximum visibility</li>
            <li>• Enhanced text readability</li>
            <li>• Perfect contrast against dark background</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">🎨 Customization</h3>
          <ul className="text-purple-700 space-y-1 text-sm">
            <li>• Semi-transparent black (rgba(0, 0, 0, 0.59))</li>
            <li>• Enhanced drop shadows for clarity</li>
            <li>• High z-index layering (z-20)</li>
            <li>• White earth image (inverted colors)</li>
            <li>• Professional text shadows</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverlayDemo;
