import { Select } from "@mantine/core"
import { IconSearch, IconPlane, IconMapPin } from "@tabler/icons-react"
import { useState, useEffect, useRef } from "react"
import { searchAirports } from "../Features/Main/Flight/services/Flight.services"

const SearchSelect = ({ label, value, onChange, apiAirports, isLoading, onSearchChange }) => {
  const [searchInput, setSearchInput] = useState('');

  // console.log('apiAirports', apiAirports)
  // Handle search input changes with debounce
  const handleSearchChange = (searchValue) => {
    console.log('searchValue', searchValue);
    setSearchInput(searchValue);
    if (onSearchChange) {
      onSearchChange(searchValue);
    }
  };

  // Find the selected airport for display
  const selectedAirport = apiAirports?.find(airport => airport.code === value);

  // Transform airport data for the dropdown with unique values
  const airportOptions = apiAirports?.map((airport, index) => ({
    id: index,
    value: `${airport.code}#${index}`, // Unique value combining code and index
    label: airport.code,
    airport: airport,
    displayName: airport.name // Store the display name separately
  })) || []

  // Custom option renderer
  const renderOption = ({ option, checked }) => {
    // console.log('option', option,apiAirports)
    const airport = option.airport;
    const fullLabel = airport ? `${airport.name}, ${airport.country.name} (${airport.code})` : option.label;
    
    return (
      <div className="flex items-center justify-between w-full py-2">
        <div className="flex items-center space-x-1">
          <span className="text-[#364A9C]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732"/></svg>
          </span>
          <span className="font-semibold text-gray-800">{fullLabel}</span>
        </div>
      </div>
    )
  }

  const optionsFilter = ({ options, search }) => {
    if (!search || search.trim() === '') {
      return airportOptions;
    }
    
    const searchTerm = search.toLowerCase().trim();
    const filtered = airportOptions.filter((option) => {
      const airport = option.airport;
      if (!airport) return false;
      
      const airportName = airport.name?.toLowerCase() || '';
      const countryName = airport.country?.name?.toLowerCase() || '';
      const airportCode = airport.code?.toLowerCase() || '';
      
      return airportName.includes(searchTerm) || 
             countryName.includes(searchTerm) || 
             airportCode.includes(searchTerm);
    });
    
    return filtered;
  };
  

  return (
    <div>
      <div className='w-fit relative cursor-pointer'>
        <div>
          <Select
            label={label}
            placeholder={isLoading ? "Loading airports..." : "Search"}
            // autoSelectOnBlur
            searchable
            data={airportOptions}
            searchValue={searchInput}
            value={selectedAirport ? `${selectedAirport.code}#${apiAirports?.findIndex(a => a.code === selectedAirport.code)}` : value}
            onChange={(selectedValue) => {
              // Extract airport code from the unique value format "CODE#INDEX"
              const airportCode = selectedValue?.split('#')[0];
              if (airportCode) {
                onChange(airportCode);
              }
              setSearchInput(''); // Clear search input when selection is made
            }}
            onSearchChange={handleSearchChange}
            renderOption={renderOption}
            filter={optionsFilter}
            disabled={isLoading}
            styles={{
              input: {
                width: '100%',
                height: '60px',
                textAlign: 'center',
                borderColor: 'white',
                borderWidth: '2px',
                fontSize: '24px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              },
              rightSection: {
                color: 'white'
              },
              dropdown: {
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
              option: {
                // padding: '12px 16px',
                borderRadius: '8px',
                margin: '-4px',
                '&[dataSelected]': {
                  backgroundColor: '#e0e7ff',
                  color: '#1e293b',
                },
                '&[dataHovered]': {
                  backgroundColor: '#e0e7ff',
                }
              }
            }}
          />
          <p className="text-center text-sm text-gray-600 mt-1">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading airports...
              </span>
            ) : (
              selectedAirport ? 
                `${selectedAirport.name}, ${selectedAirport.country.name} (${selectedAirport.code})` :
                value ? `${value} - Loading...` : ''
            )}
          </p>
        </div>
        <div className='absolute z-10 top-0 right-1 h-full w-5 bg-white'> {''}</div>
      </div>
    </div>
  )
}

export default SearchSelect