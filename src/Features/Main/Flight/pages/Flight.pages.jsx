import React, { useMemo, useState } from 'react';
import Header from '../../../../components/Header';
import HeroSection from '../components/HeroSection';
import { useGlobalContext } from '../../../../context';
import Container from '../../../../components/Container';
import FlightSearch from '../components/FlightSearch';
import { FlightDeals, Blogs, CountryRecommendations } from '../components';

const FlightPage = () => {
  const { isAuthenticated, user } = useGlobalContext();
  const [resultLoading, setResultLoading] = useState(false);
  
  // Memoize the welcome message to prevent unnecessary re-renders
  const welcomeMessage = useMemo(() => {
    if (isAuthenticated) {
      const userName = user?.firstname && user?.lastname 
        ? `${user.firstname} ${user.lastname}` 
        : 'User';
      return `Welcome back, ${userName}! Ready to explore the world?`;
    }
    return 'Sign up or log in to start booking your next adventure.';
  }, [isAuthenticated, user?.firstname, user?.lastname]);

  // Memoize the user name for the welcome message
  const userName = useMemo(() => {
    return user?.firstname && user?.lastname 
      ? `${user.firstname} ${user.lastname}` 
      : 'User';
  }, [user?.firstname, user?.lastname]);

  // Memoize the authentication buttons to prevent re-renders
  const authButtons = useMemo(() => {
    if (!isAuthenticated) {
      return (
        <>
          <button className="px-6 py-3 border-2 border-[#364A9C] text-[#364A9C] rounded-lg font-medium hover:bg-[#364A9C] hover:text-white transition-colors">
            Sign Up
          </button>
          <button className="px-6 py-3 bg-[#364A9C] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Login
          </button>
        </>
      );
    }
    return (
      <button className="px-6 py-3 bg-[#364A9C] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
        View My Bookings
      </button>
    );
  }, [isAuthenticated]);

  return (
    <Container>
      {/* Header */}
      <Header currentPage="flights" />

      <div className='relative'>
        <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
          <img src="/earth.svg" alt="stars" className="md:w-1/2 w-4/5 m-auto object-cover" />
          <div className='absolute top-10 w-full'>
            <img src="/plane.svg" alt="plane" className="md:w-1/2 w-4/5 m-auto object-cover" />
          </div>
        </div>

      </div>
      <div className='md:mt-[170px] mt-[110px] '>

        <div className='px-6'>
        <FlightSearch setResultLoading={setResultLoading} />
        </div>


        
        {/* Flight Deals Section */}
        <FlightDeals />

          {/* Country Recommendations Section */}
        <CountryRecommendations />
        
        
        {/* Blogs Section */}
        <Blogs />

      

      </div>


      {/* Additional Sections can be added here */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Book Your Flight?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {welcomeMessage}
          </p>
          <div className="flex items-center justify-center space-x-4">
            {authButtons}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default React.memo(FlightPage);