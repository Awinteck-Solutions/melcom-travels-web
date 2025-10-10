import { useState } from 'react';

const FlightDeals = () => {
  const [activeFilter, setActiveFilter] = useState('trending');

  const filters = [
    'trending', '5-Star', 'Asian', 'Europe', 'Middle-East', 'Budget-Friendly', 'Adventure', 'Family-Friendly'
  ];

  const flightDeals = [
    {
      id: 1,
      name: 'Disneyland and Disneysea',
      rating: 4.5,
      reviews: 2312,
      location: 'Tokyo, Japan',
      price: 507,
      image: './flightDeals/f1.svg',
      category: 'Family-Friendly'
    },
    {
      id: 2,
      name: 'River Wonders Singapore',
      rating: 4.8,
      reviews: 1890,
      location: 'Singapore',
      price: 819,
      image: './flightDeals/f2.svg',
      category: 'Asian'
    },
    {
      id: 3,
      name: 'The Amazing Taman Safari',
      rating: 4.6,
      reviews: 1543,
      location: 'Bali, Indonesia',
      price: 623,
      image: './flightDeals/f3.svg',
      category: 'Adventure'
    },
    {
      id: 4,
      name: 'Uluwatu Kecak & Fire Dance',
      rating: 4.7,
      reviews: 2100,
      location: 'Bali, Indonesia',
      price: 445,
      image: './flightDeals/f4.svg',
      category: 'Cultural'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center md:mb-12 mb-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">DISCOVER</p>
          <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-4">Latest Flight Deals</h2>
          <p className="md:text-base text-sm text-gray-600 max-w-2xl mx-auto">
            Snag the best fares before they're gone — updated daily for top destinations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center space-x-2 mb-8 overflow-x-auto pb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-[#364A9C] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Flight Deal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flightDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                <div className="absolute inset-0 flex items-center justify-center">
                 <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
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
                  <span className="text-sm text-gray-500">({deal.reviews.toLocaleString()} Reviews)</span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{deal.location}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Start from</p>
                    <p className="text-2xl font-bold text-[#364A9C]">GH₵{deal.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-[#364A9C] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-[#364A9C] text-[#364A9C] rounded-lg font-medium hover:bg-[#364A9C] hover:text-white transition-colors">
            View All Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlightDeals;
