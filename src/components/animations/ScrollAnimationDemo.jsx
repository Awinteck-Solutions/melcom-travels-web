import React from 'react';
import ScrollAnimation, { StaggeredScrollAnimation } from './ScrollAnimation';

const ScrollAnimationDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Scroll Animation Demo
        </h1>

        {/* Fade Up Animation */}
        <ScrollAnimation animation="fadeUp" className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Fade Up Animation</h2>
            <p className="text-gray-600 mb-4">
              This section fades in and slides up from below when it comes into view.
            </p>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-800">
                ✨ This animation only triggers once when you scroll down!
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Slide Left Animation */}
        <ScrollAnimation animation="slideLeft" className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-green-600">Slide Left Animation</h2>
                <p className="text-gray-600 mb-4">
                  This content slides in from the right side when it becomes visible.
                </p>
                <ul className="text-green-700 space-y-2">
                  <li>• Smooth slide animation</li>
                  <li>• One-time trigger</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              <div className="w-32 h-32 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Scale Up Animation */}
        <ScrollAnimation animation="scaleUp" className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Scale Up Animation</h2>
            <p className="text-gray-600 mb-4">
              This section scales up from 80% to 100% size when it comes into view.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold text-purple-800">Precision</h3>
                <p className="text-sm text-purple-600">Accurate targeting</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-purple-800">Speed</h3>
                <p className="text-sm text-purple-600">Lightning fast</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold text-purple-800">Security</h3>
                <p className="text-sm text-purple-600">Fully protected</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Staggered Animation */}
        <StaggeredScrollAnimation delay={0.2} className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-orange-600 text-center">
              Staggered Animation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-orange-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">✈️</div>
                <h3 className="font-semibold text-orange-800 mb-2">Flights</h3>
                <p className="text-sm text-orange-600">Book your next adventure</p>
              </div>
              <div className="bg-orange-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏨</div>
                <h3 className="font-semibold text-orange-800 mb-2">Hotels</h3>
                <p className="text-sm text-orange-600">Find the perfect stay</p>
              </div>
              <div className="bg-orange-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="font-semibold text-orange-800 mb-2">Cars</h3>
                <p className="text-sm text-orange-600">Rent with confidence</p>
              </div>
              <div className="bg-orange-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-orange-800 mb-2">Packages</h3>
                <p className="text-sm text-orange-600">All-in-one deals</p>
              </div>
            </div>
          </div>
        </StaggeredScrollAnimation>

        {/* Fade In Animation */}
        <ScrollAnimation animation="fadeIn" className="mb-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Fade In Animation</h2>
            <p className="text-xl mb-6 opacity-90">
              This section simply fades in when it comes into view.
            </p>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
              <p className="text-lg">
                Perfect for highlighting important content or call-to-action sections!
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Slide Right Animation */}
        <ScrollAnimation animation="slideRight" className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">🌍</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Slide Right Animation</h2>
                <p className="text-gray-600 mb-4">
                  This content slides in from the left side when it becomes visible.
                </p>
                <div className="bg-indigo-100 p-4 rounded-lg">
                  <p className="text-indigo-800">
                    🎉 Scroll up and down to see that animations only trigger once!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Final Section */}
        <ScrollAnimation animation="fadeUp" className="mb-16">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">🎊 That's It!</h2>
            <p className="text-xl mb-6 opacity-90">
              You've seen all the scroll animations in action.
            </p>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <p className="text-lg">
                Each animation only triggers once when you scroll down. 
                Try scrolling up and down to see that they don't repeat!
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Spacer for testing */}
        <div className="h-32"></div>
      </div>
    </div>
  );
};

export default ScrollAnimationDemo;
