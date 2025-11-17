import { useState, useEffect } from 'react';
import { getFlightDealCategories, getFlightDealsByCategory, getAllFlightDeals } from '../services/Flight.services';
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';

const FlightDeals = () => {
  const [activeFilter, setActiveFilter] = useState(null); // null means "All" or "Trending"
  const [categories, setCategories] = useState([]);
  const [flightDeals, setFlightDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDeals, setIsLoadingDeals] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getFlightDealCategories();
        if (response.status) {
          // Filter only ACTIVE categories
          const activeCategories = (response.data.data || []).filter(
            cat => cat.status === 'ACTIVE'
          );
          setCategories(activeCategories);
        } else {
          notifications.show({
            title: 'Error',
            message: response.message || 'Failed to load categories',
            color: 'red',
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to load categories',
          color: 'red',
          position: 'top-right',
        });
      }
    };

    fetchCategories();
  }, []);

  // Fetch deals when filter changes
  useEffect(() => {
    const fetchDeals = async () => {
      setIsLoadingDeals(true);
      try {
        let response;
        if (activeFilter) {
          // Fetch deals by category
          response = await getFlightDealsByCategory(activeFilter);
        } else {
          // Fetch all deals
          response = await getAllFlightDeals();
        }

        if (response.status) {
          // Filter only ACTIVE deals and transform data
          const deals = (response.data.data || [])
            .filter(deal => deal.status === 'ACTIVE')
            .map(deal => ({
              id: deal._id,
              name: deal.title,
              location: `${deal.state}, ${deal.country}`,
              price: deal.amount,
              image: deal.url || './flightDeals/f1.svg',
              category: typeof deal.category === 'object' && deal.category !== null
                ? deal.category.name
                : deal.category || 'Deal',
              // Default values for rating and reviews (not in API)
              rating: 4.5,
              reviews: 1000
            }));
          setFlightDeals(deals);
        } else {
          notifications.show({
            title: 'Error',
            message: response.message || 'Failed to load deals',
            color: 'red',
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error fetching deals:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to load deals',
          color: 'red',
          position: 'top-right',
        });
      } finally {
        setIsLoading(false);
        setIsLoadingDeals(false);
      }
    };

    fetchDeals();
  }, [activeFilter]);

  return (
    <>
      {/* Custom styles for scrollbar hiding */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <section className="py-16">
      <div className="max-w-7xl mx-auto md:px-6 px-1">
        {/* Section Header */}
        <div className="text-center md:mb-12 mb-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">DISCOVER</p>
          <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-4">Latest Flight Deals</h2>
          <p className="md:text-base text-sm text-gray-600 max-w-2xl mx-auto">
            Snag the best fares before they're gone — updated daily for top destinations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="relative">
          {/* Fade effect for mobile scrolling */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>
          
          <div 
            className="flex items-center md:justify-center justify-start space-x-2 mb-8 overflow-x-auto pb-4 scrollbar-hide" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            <div className="flex items-center space-x-2 min-w-max px-4 md:px-0 py-2">
              {/* All/Trending button */}
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeFilter === null
                    ? 'bg-[#364A9C] text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Deals
              </button>
              
              {/* Category buttons */}
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveFilter(category._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeFilter === category._id
                      ? 'bg-[#364A9C] text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader color="#364A9C" size="lg" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">Loading deals...</h3>
            <p className="text-gray-500">Please wait while we fetch the latest flight deals.</p>
          </div>
        )}

        {/* Flight Deal Cards */}
        {!isLoading && (
          <>
            {isLoadingDeals && (
              <div className="text-center py-8">
                <Loader color="#364A9C" size="md" />
              </div>
            )}
            
            {!isLoadingDeals && flightDeals.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {flightDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={deal.image} 
                          alt={deal.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = './flightDeals/f1.svg';
                          }}
                        />
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-[#364A9C] text-white text-xs font-medium rounded-full">
                          {deal.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                        {deal.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900">{deal.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">( Popular Reviews)</span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{deal.location}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Start from</p>
                          <p className="text-2xl font-bold text-[#364A9C]">GH₵{deal.price.toLocaleString()}</p>
                        </div>
                        {/* <button className="px-4 py-2 bg-[#364A9C] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Book Now
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {!isLoadingDeals && flightDeals.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
                <p className="text-gray-500">Try selecting a different category or check back later for new deals.</p>
              </div>
            )}
          </>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-[#364A9C] text-[#364A9C] rounded-lg font-medium hover:bg-[#364A9C] hover:text-white transition-colors">
            View All Deals
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default FlightDeals;
