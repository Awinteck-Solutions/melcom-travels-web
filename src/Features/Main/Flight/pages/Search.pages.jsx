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

const SearchPage = () => {
  const { isAuthenticated, user } = useGlobalContext();
  const { loading, error, results, searchData } = useSearchContext();
  const [resultLoading, setResultLoading] = useState(false);

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
          <div className="mb-8 px-6">
            <FlightSearch setResultLoading={setResultLoading} isResultLoading={resultLoading} />
          </div>
        </ScrollAnimation>

        {/* Search Results with Filter Sidebar */}
        <ScrollAnimation animation="slideLeft">
          <div className="flex gap-8 my-6 px-6 py-4">
            {/* Filter Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar />
            </div>
            
            {/* Search Results */}
            <div className="flex-1">
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
            
            {!loading && !error && !resultLoading && results && (
              <SearchResults />
            )}
            
            {!loading && !error && !results && searchData && (
              <div className="text-center py-12">
                <p className="text-gray-600">No flights found for your search criteria.</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search parameters.</p>
              </div>
            )}
            
            {!loading && !error && !results && !searchData && (
              <div className="text-center py-12">
                <p className="text-gray-600">Enter your search criteria above to find flights.</p>
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