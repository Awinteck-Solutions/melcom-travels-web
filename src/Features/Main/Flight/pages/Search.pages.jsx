import Header from '../../../../components/Header';
import { useGlobalContext } from '../../../../context';
import Container from '../../../../components/Container';
import FlightSearch from '../components/FlightSearch';
import SearchResults from '../components/SearchResults';
import FilterSidebar from '../components/FilterSidebar';

const SearchPage = () => {
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
      
      <div className='md:mt-[170px] mt-[110px]'>
        {/* Flight Search Form */}
        <div className="mb-8 px-6">
          <FlightSearch />
        </div>

        {/* Search Results with Filter Sidebar */}
        <div className="flex gap-8 my-6 px-6 py-4">
          {/* Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>
          
          {/* Search Results */}
          <div className="flex-1">
            <SearchResults />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;