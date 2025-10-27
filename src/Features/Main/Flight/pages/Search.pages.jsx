import Header from '../../../../components/Header';
import { useGlobalContext, useSearchContext } from '../../../../context';
import Container from '../../../../components/Container';
import FlightSearch from '../components/FlightSearch';
import SearchResults from '../components/SearchResults';
import FilterSidebar from '../components/FilterSidebar';
import { Loader, Alert } from '@mantine/core';
import { useState } from 'react';
import {
  LoadingSpinner,
  FlightCardSkeleton,
  StaggerContainer,
  StaggerItem,
  AnimatedDiv,
  fadeInUp,
  ScrollAnimation
} from '../../../../components/animations';
import { useScrollToTop } from '../../../../hooks/useScrollToTop';

const SearchPage = () => {
  const { isAuthenticated, user } = useGlobalContext();
  const { loading, error, results, searchData } = useSearchContext();
  const [resultLoading, setResultLoading] = useState(false);

  // Auto scroll to top when page loads
  useScrollToTop();

  return (
    <Container>
      {/* Header */}
      <Header currentPage="flights" />

      <div className='relative'>
        <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
          <img src="/earth.svg" alt="stars" className="lg:w-1/3 md:w-1/2 w-4/5 m-auto object-cover" />
          <div className='absolute top-10 w-full'>
            <img src="/plane.svg" alt="plane" className="lg:w-1/3 md:w-1/2 w-4/5 m-auto object-cover" />
          </div>
        </div>
      </div>

      <div className='md:mt-[170px] mt-[110px]'>
        {/* Flight Search Form */}
        <ScrollAnimation animation="fadeUp">
          <div className="mb-8 md:px-6 px-1">
            <FlightSearch setResultLoading={setResultLoading} isResultLoading={resultLoading} />
          </div>
        </ScrollAnimation>

        {/* Search Results with Filter Sidebar */}
        <ScrollAnimation animation="slideLeft">
          <div className="flex gap-8 my-6 px-6 py-4 max-w-7xl mx-auto">
            {/* Filter Sidebar - Only show when there are results */}
            {results?.results?.flights && results.results.flights.length > 0 && (
              <div className="hidden lg:block">
                <FilterSidebar />
              </div>
            )}

            {/* Search Results */}
            <div className={`${results?.results?.flights && results.results.flights.length > 0 ? 'flex-1' : 'w-full'}`}>
              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner size={60} color="#364A9C" />
                  <p className="mt-4 text-gray-600">Searching for flights...</p>
                </div>
              )}

              {error && (
                <Alert color="red" title="Search Error" className="mb-4">
                  {error}
                </Alert>
              )}
              {resultLoading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner size={60} color="#364A9C" />
                  <p className="mt-4 text-gray-600">Searching for flights...</p>
                </div>
              )}

              {!loading && !error && !resultLoading && results?.results?.flights && results.results.flights.length > 0 && (
                <SearchResults />
              )}

              {!loading && !error && (!results?.results?.flights || results.results.flights.length === 0) && searchData && (
                <div className="text-center py-12">
                  <div className="relative mb-8 h-24 flex items-center justify-center">
                    {/* Gentle floating plane animation */}
                    <div
                      className="relative p-2"
                      style={{
                        animation: 'gentleFloat 6s ease-in-out infinite'
                      }}
                    >
                      <img
                        src="/plane.svg"
                        alt="Search for flights"
                        className="max-h-80 w-auto opacity-50"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        }}
                      />
                    </div>

                    {/* Subtle trail effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-4 h-4 bg-blue-200 rounded-full opacity-20"
                        style={{
                          animation: 'trail 6s ease-in-out infinite',
                          animationDelay: '1s'
                        }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-blue-100 rounded-full opacity-15 absolute -top-1 -right-1"
                        style={{
                          animation: 'trail 6s ease-in-out infinite',
                          animationDelay: '2s'
                        }}
                      ></div>
                    </div>
                  </div>


                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No flights found</h3>
                  <p className="text-gray-600 mb-4">We couldn't find any flights matching your search criteria.</p>
                  <p className="text-sm text-gray-500">Try adjusting your search parameters or dates.</p>
                </div>
              )}

              {!loading && !error && (!results?.results?.flights || results.results.flights.length === 0) && !searchData && (
                <div className="text-center py-12">
                  <div className="relative mb-8 h-24 flex items-center justify-center">
                    {/* Gentle floating plane animation */}
                    <div
                      className="relative p-2"
                      style={{
                        animation: 'gentleFloat 6s ease-in-out infinite'
                      }}
                    >
                      <img
                        src="/plane.svg"
                        alt="Search for flights"
                        className="max-h-80 w-auto opacity-50"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        }}
                      />
                    </div>

                    {/* Subtle trail effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-4 h-4 bg-blue-200 rounded-full opacity-20"
                        style={{
                          animation: 'trail 6s ease-in-out infinite',
                          animationDelay: '1s'
                        }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-blue-100 rounded-full opacity-15 absolute -top-1 -right-1"
                        style={{
                          animation: 'trail 6s ease-in-out infinite',
                          animationDelay: '2s'
                        }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to explore?</h3>
                  <p className="text-gray-600">Enter your search criteria above to find amazing flight deals.</p>
                </div>
              )}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </Container>
  );
};

export default SearchPage;