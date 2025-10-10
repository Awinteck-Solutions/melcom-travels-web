import Header from '../../../../components/Header';
import HeroSection from '../components/HeroSection';
import { useGlobalContext } from '../../../../context';
import Container from '../../../../components/Container';
import FlightSearch from '../components/FlightSearch';
import { FlightDeals, Blogs, CountryRecommendations } from '../components';

const FlightPage = () => {
  const { isAuthenticated, user } = useGlobalContext();

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
          <FlightSearch />
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
            {isAuthenticated
              ? `Welcome back, ${user?.name}! Ready to explore the world?`
              : 'Sign up or log in to start booking your next adventure.'
            }
          </p>
          <div className="flex items-center justify-center space-x-4">
            {!isAuthenticated && (
              <>
                <button className="px-6 py-3 border-2 border-[#364A9C] text-[#364A9C] rounded-lg font-medium hover:bg-[#364A9C] hover:text-white transition-colors">
                  Sign Up
                </button>
                <button className="px-6 py-3 bg-[#364A9C] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Login
                </button>
              </>
            )}
            {isAuthenticated && (
              <button className="px-6 py-3 bg-[#364A9C] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View My Bookings
              </button>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FlightPage;