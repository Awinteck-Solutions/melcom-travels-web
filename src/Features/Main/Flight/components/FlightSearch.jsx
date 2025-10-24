import { Tabs, Select, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconPlane, IconPlaneDeparture, IconRoute, IconPlus, IconTrash } from '@tabler/icons-react';
import SearchSelect from '../../../../components/SearchSelect';
import { useState, useEffect, useRef } from 'react';
import DatePicker from '../../../../components/DatePicker';
import Passengers from '../../../../components/Passengers';
import { useSearchContext } from '../../../../context';
import { useNavigate } from 'react-router-dom';
import { updateDaysCount } from '../../../../utils/page.helper';
import { searchAirports, searchFlights } from '../services/Flight.services';
import { notifications } from '@mantine/notifications';
import { 
  AnimatedDiv, 
  AnimatedButton, 
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  LoadingButton
} from '../../../../components/animations';

const FlightSearch = ({ setResultLoading, isResultLoading }) => {
    const [dateValue, setDateValue] = useState(null);
    const [passengers, setPassengers] = useState({ adult: 1, children: 0, infant: 0 });
    const [toleranceDays, setToleranceDays] = useState(1);
    const [onlyDirectFlight, setOnlyDirectFlight] = useState(false);
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [returnDateValue, setReturnDateValue] = useState(null);
    const [selectedAirline, setSelectedAirline] = useState('Emirates');
    const [flightClass, setFlightClass] = useState('economy');
    const [multiCityItems, setMultiCityItems] = useState([
        {
            id: 1,
            fromLocation: '',
            toLocation: '',
            dateValue: null,
            passengers: { adult: 1, children: 0, infant: 0 }
        }
    ]);

    // PERSONAL CODE
    const [OneWayFlightSearchData, setOneWayFlightSearchData] = useState({})

    const { setSearchData, setLoading, setResults, formData, setFormData } = useSearchContext();
    const navigate = useNavigate();
    const isLoadingFromContext = useRef(false);
    const previousFormData = useRef(null);
    const loadedFormDataRef = useRef(null);

    // Initialize form state from persisted data or defaults
    useEffect(() => {
        if (formData && JSON.stringify(formData) !== JSON.stringify(loadedFormDataRef.current)) {

            // Mark this form data as loaded to prevent re-loading
            loadedFormDataRef.current = formData;
            isLoadingFromContext.current = true;

            setFromLocation(formData.fromLocation || '');
            setToLocation(formData.toLocation || '');
            setDateValue(formData.dateValue || null);
            setReturnDateValue(formData.returnDateValue || null);
            setPassengers(formData.passengers || { adult: 1, children: 0, infant: 0 });
            setToleranceDays(formData.toleranceDays || 1);
            setOnlyDirectFlight(formData.onlyDirectFlight || false);
            setSelectedAirline(formData.selectedAirline || 'Emirates');
            setFlightClass(formData.flightClass || 'economy');
            if (formData.multiCityItems) {
                setMultiCityItems(formData.multiCityItems);
            }

            // Set the previous form data to prevent unnecessary saves
            previousFormData.current = formData;

            // Reset the flag after a short delay to allow state updates to complete
            setTimeout(() => {
                isLoadingFromContext.current = false;
            }, 200);
        }
    }, [formData]);

    // Save form data to context whenever it changes (but not when loading from context)
    useEffect(() => {
        // Only save if we're not currently loading from persisted data
        if (!isLoadingFromContext.current) {
            const currentFormData = {
                fromLocation,
                toLocation,
                dateValue,
                returnDateValue,
                passengers,
                toleranceDays,
                onlyDirectFlight,
                selectedAirline,
                flightClass,
                multiCityItems
            };

            // Only save if the form data has actually changed
            const hasChanged = JSON.stringify(currentFormData) !== JSON.stringify(previousFormData.current);
            if (hasChanged) {
                previousFormData.current = currentFormData;
                setFormData(currentFormData);
            }
        }
    }, [fromLocation, toLocation, dateValue, returnDateValue, passengers, toleranceDays, onlyDirectFlight, selectedAirline, flightClass, multiCityItems, setFormData]);

    // Cleanup function to reset flags
    useEffect(() => {
        return () => {
            isLoadingFromContext.current = false;
            previousFormData.current = null;
            loadedFormDataRef.current = null;
        };
    }, []);

    const handleSearch = async (searchType, searchData) => {
        const payload = {
            "origin": searchData.fromLocation,
            "destination": searchData.toLocation,
            "departureDate": searchData.dateValue,
            "adults": searchData.passengers.adult,
            "children": searchData.passengers.children,
            "infants": searchData.passengers.infant,
            "cabin": "ECO",
            "tripType": searchType,
            "directFlightsOnly": searchData.onlyDirectFlight,
            "currency": "GHS",
            airline: selectedAirline,
            toleranceDays: searchData.toleranceDays,
        };

        console.log('Flight Search Payload:', payload);

        // Set loading state
        setLoading(true);
        setSearchData(payload);

        try {
            console.log('Search Flights API Payload:', payload);
            setResultLoading(true);
            // Call the searchFlights API
            const response = await searchFlights(payload);

            if (response.status) {
                // Store flight results in context
                setResults(response.data);
                console.log('Flight search results:', response.data);
                notifications.show({
                    title: 'Flight search results',
                    message: 'Flight search results',
                    color: 'green',
                    position: 'top-right',
                });
                // Navigate to search results page
                if (window.location.pathname !== '/flights/search') {
                    setTimeout(() => {
                        navigate('/flights/search');
                        // window.location.href = '/flights/search';
                    }, 100);
                }
            } else {
                notifications.show({
                    title: 'Flight search error',
                    message: response.message || 'Failed to search flights',
                    color: 'red',
                    position: 'top-right',
                });
            }
        } catch (error) {
            notifications.show({
                title: 'Flight search error',
                message: error.message || 'Failed to search flights',
                color: 'red',
                position: 'top-right',
            });
        }
        finally {
            setLoading(false);
            setResultLoading(false);
        }


    }


    return (
        <AnimatedDiv 
            variant={scaleIn} 
            delay={0}
            className="relative bg-white border-2 border-[#364A9C] rounded-2xl p-3 md:p-5 max-w-7xl mx-auto px-3 md:px-6"
        >
            <Tabs defaultValue="oneway" variant="pills" color="#364A9C">
                <div className='flex flex-col lg:flex-row lg:items-start md:gap-4 lg:gap-0'>
                    <Tabs.List
                        className="md:mb-4 lg:mb-6 rounded-md bg-gray-100 border w-full lg:w-fit p-2"
                    >
                        <Tabs.Tab
                            value="oneway"
                            leftSection={<IconPlane size={16} />}
                            className="text-sm font-medium flex-1 lg:flex-none"
                        >
                            <span className="text-base font-medium">One way</span>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="roundtrip"
                            leftSection={<IconPlaneDeparture size={16} />}
                            className="text-sm font-medium flex-1 lg:flex-none"
                        >
                            <span className="text-base font-medium">Round Trip</span>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="multicity"
                            leftSection={<IconRoute size={16} />}
                            className="text-sm font-medium flex-1 lg:flex-none"
                        >
                            <span className="text-base font-medium">Multi-city</span>
                        </Tabs.Tab>
                    </Tabs.List>

                    <div className="lg:ml-6 w-full lg:w-auto">
                        <Select
                            placeholder="Select class"
                            data={[
                                { value: 'economy', label: 'Economy' },
                                { value: 'business', label: 'Business' },
                                { value: 'first-class', label: 'First Class' }
                            ]}
                            value={flightClass}
                            onChange={setFlightClass}
                            className="w-full lg:w-fit mt-1 font-bold"
                            styles={{
                                input: {
                                    width: '100%',
                                    height: '50px',
                                    textAlign: 'center',
                                    borderColor: '#E7E7E7',
                                    borderWidth: '2px',
                                    '&:focus': {
                                        borderColor: '#364A9C',
                                        boxShadow: '0 0 0 1px #364A9C'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                <Tabs.Panel value="oneway" className="md:pt-1">
                    <OneWayFlightSearch
                        handleSearch={handleSearch}
                        isResultLoading={isResultLoading}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="roundtrip" className="pt-1">
                    <RoundTripFlightSearch
                        fromLocation={fromLocation}
                        setFromLocation={setFromLocation}
                        toLocation={toLocation}
                        setToLocation={setToLocation}
                        dateValue={dateValue}
                        setDateValue={setDateValue}
                        returnDateValue={returnDateValue}
                        setReturnDateValue={setReturnDateValue}
                        passengers={passengers}
                        setPassengers={setPassengers}
                        toleranceDays={toleranceDays}
                        setToleranceDays={setToleranceDays}
                        onlyDirectFlight={onlyDirectFlight}
                        setOnlyDirectFlight={setOnlyDirectFlight}
                        selectedAirline={selectedAirline}
                        setSelectedAirline={setSelectedAirline}
                        handleSearch={handleSearch}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="multicity" className="pt-1">
                    <MultiCityFlightSearch
                        selectedAirline={selectedAirline}
                        setSelectedAirline={setSelectedAirline}
                        toleranceDays={toleranceDays}
                        setToleranceDays={setToleranceDays}
                        onlyDirectFlight={onlyDirectFlight}
                        setOnlyDirectFlight={setOnlyDirectFlight}
                        handleSearch={handleSearch}
                        multiCityItems={multiCityItems}
                        setMultiCityItems={setMultiCityItems}
                    />
                </Tabs.Panel>
            </Tabs>

        </AnimatedDiv>
    );
};

export default FlightSearch;


const OneWayFlightSearch = ({handleSearch, isResultLoading=false}) => {

    const { searchData } = useSearchContext();
    // console.log('searchData', searchData)
    // get todays date
    const today = new Date();
    const [dateValue, setDateValue] = useState(today);
    const [passengers, setPassengers] = useState({ adult: 1, children: 0, infant: 0 });
    const [toleranceDays, setToleranceDays] = useState(1);
    const [onlyDirectFlight, setOnlyDirectFlight] = useState(false);
    const [fromLocation, setFromLocation] = useState('ACC'); // Use uppercase to match API response
    const [toLocation, setToLocation] = useState('');
    const [selectedAirline, setSelectedAirline] = useState('');

    const handleOneWaySearch = () => {
        handleSearch('oneway', { fromLocation, toLocation, selectedAirline, dateValue, passengers, toleranceDays, onlyDirectFlight })
    }

    const [apiAirportsfrom, setApiAirportsfrom] = useState([]);
    const [apiAirportsto, setApiAirportsto] = useState([]);
    const [isLoading, setIsLoading] = useState({ from: false, to: false });
    const searchTimeoutRef = useRef(null);
    const hasInitializedRef = useRef(false);
    // Search airports from API
    const searchAirportsFromAPI = async (query = 'acc', type = 'from') => {
        console.log('🔍 ======= SearchAirportsFromAPI:', query, 'type:', type);

        setIsLoading(prev => ({ ...prev, [type]: true }));
        try {
            const response = await searchAirports(query);
            console.log('searchAirports', response.data.airports)
            if (response.status) {
                if (type === 'from') {
                    setApiAirportsfrom(response.data.airports || []);
                    console.log('✅ Set apiAirportsfrom:', response.data.airports);
                    // If this is the initial load and we have a default value, ensure it's set
                    if (query === 'acc' && fromLocation === 'ACC') {
                        console.log('🎯 Initial load with acc - fromLocation:', fromLocation);
                    }
                } else if (type === 'to') {
                    setApiAirportsto(response.data.airports || []);
                    console.log('✅ Set apiAirportsto:', response.data.airports);
                }
            } else {
                console.error('Failed to search airports:', response.message);
            }
        } catch (error) {
            console.error('Error searching airports:', error);
        } finally {
            setIsLoading(prev => ({ ...prev, [type]: false }));
        }
    };

    const handleFromSearchChange = (searchValue) => {
        console.log('🔍 ======= handleFromSearchChange:', searchValue);
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set new timeout for debounced search
        searchTimeoutRef.current = setTimeout(() => {
            if (searchValue && searchValue.length >= 3) {
                searchAirportsFromAPI(searchValue, 'from');
            } else if (searchValue === '') {
                searchAirportsFromAPI('acc', 'from');
            }
        }, 300); // 300ms debounce
    };

    const handleToSearchChange = (searchValue) => {
        console.log('🔍 ======= handleToSearchChange:', searchValue);
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set new timeout for debounced search
        searchTimeoutRef.current = setTimeout(() => {
            if (searchValue && searchValue.length >= 3) {
                searchAirportsFromAPI(searchValue, 'to');
            } else if (searchValue === '') {
                searchAirportsFromAPI('', 'to');
            }
        }, 300); // 300ms debounce
    };

    useEffect(() => {
        console.log('CONTEXT SEARCH DATA - USE EFFECT', searchData)
        if (searchData?.origin) {
            console.log('CONTEXT SEARCH DATA - GET', searchData)
            setFromLocation(searchData.origin);
        }
        if (searchData?.destination) {
            setToLocation(searchData.destination);
            searchAirportsFromAPI(searchData.destination, 'to')
        }
        if (searchData?.departureDate) {
            setDateValue(searchData.departureDate);
        }
        if (searchData?.adults || searchData?.children || searchData?.infants) {
            let passengers = { adult: searchData.adults || 1, children: searchData.children || 0, infant: searchData.infants || 0 };
            setPassengers(passengers);
        }
        if (searchData?.toleranceDays) {
            setToleranceDays(searchData.toleranceDays || 1);
        }
        if (searchData?.directFlightsOnly) {
            setOnlyDirectFlight(searchData.directFlightsOnly || false);
        }
        if (searchData?.airline) {
            setSelectedAirline(searchData.selectedAirline || '');
        }
        searchAirportsFromAPI('acc', 'from');

    }, []);

    return (
        <div>
            <div className="text-center">
                <div className='border-2 md:mt-0 mt-1 border-[#E7E7E7] w-full rounded-2xl flex flex-col lg:flex-row'>

                    <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 py-10 md:py-4 border-b lg:border-b-0 lg:border-r border-[#E7E7E7] relative'>
                        <SearchSelect
                            apiAirports={apiAirportsfrom}
                            isLoading={isLoading.from}
                            label="From"
                            value={fromLocation}
                            onChange={setFromLocation}
                            onSearchChange={handleFromSearchChange} />
                        <div className='rounded-full h-fit p-2 md:p-4 bg-gradient-to-r from-[#243167] to-[#364A9C] text-white ring-4 absolute -bottom-3 lg:-bottom-0 lg:-right-7 lg:top-10 left-1/2 lg:left-auto transform -translate-x-1/2 lg:transform-none z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path stroke-dasharray="14" stroke-dashoffset="14" d="M15 7h-11.5M9 17h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="14;0" /></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M3 7l4 4M3 7l4 -4M21 17l-4 4M21 17l-4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="8;0" /></path></g></svg>
                        </div>
                    </div>

                    <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 py-10 md:py-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                        <SearchSelect
                            apiAirports={apiAirportsto}
                            isLoading={isLoading.to}
                            label="To"
                            value={toLocation}
                            onChange={setToLocation}
                            onSearchChange={handleToSearchChange} />
                    </div>
                    <div className='w-full lg:w-fit flex justify-center p-3 md:p-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                        <DatePicker
                            type="oneway"
                            title="Departure"
                            placeholder="Select Date"
                            disabled={false}
                            value={dateValue}
                            onChange={(value) => setDateValue(new Date(value))}
                        />
                    </div>
                    <div className='w-full lg:w-fit flex justify-center p-3 md:p-4 lg:border-l border-[#E7E7E7]'>
                        <Passengers
                            value={passengers}
                            onChange={setPassengers}
                        />
                    </div>

                </div>

                <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-2 gap-4 lg:gap-0">
                    <div className='flex flex-col lg:flex-row md:items-start items-center lg:items-center md:justify-start lg:justify-around space-y-3 lg:space-y-0 lg:space-x-2'>
                        <Select
                            placeholder="Select airline"
                            data={[
                                { value: 'Airline', label: 'Airline' },
                                { value: 'Emirates', label: 'Emirates' },
                                { value: 'British Airways', label: 'British Airways' },
                                { value: 'Lufthansa', label: 'Lufthansa' },
                            ]}
                            value={selectedAirline}
                            onChange={setSelectedAirline}
                            className="w-full lg:w-fit mt-1 font-bold"
                            styles={{
                                input: {
                                    width: '100%',
                                    height: '50px',
                                    textAlign: 'center',
                                    borderColor: '#E7E7E7',
                                    borderWidth: '2px',
                                    '&:focus': {
                                        borderColor: '#364A9C',
                                        boxShadow: '0 0 0 1px #364A9C'
                                    }
                                }
                            }}
                        />
                        <div className='flex items-center space-x-2 md:w-full w-fit lg:w-auto'>
                            <p className="font-medium text-center text-sm lg:text-base">Tolerance Days</p>
                            <div className="flex items-center space-x-2 rounded-full p-1">
                                <button
                                    onClick={() => setToleranceDays(prev => Math.max(prev - 1, 1))}
                                    disabled={toleranceDays <= 1}
                                    className={`
                      w-7 h-7 lg:w-8 lg:h-8 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center 
                      hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      ${toleranceDays <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                                >
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <span className="flex text-center font-medium text-gray-900 text-sm lg:text-base">
                                    {toleranceDays} {toleranceDays > 1 ? 'days' : 'day'}
                                </span>

                                <button
                                    onClick={() => setToleranceDays(prev => Math.min(prev + 1, 7))}
                                    className="w-7 h-7 lg:w-8 lg:h-8 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-center lg:justify-end space-x-3'>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={onlyDirectFlight}
                                onChange={(e) => setOnlyDirectFlight(e.target.checked)}
                                className="w-4 h-4 text-[#364A9C] bg-gray-100 border-gray-300 rounded focus:ring-[#364A9C] focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Only Direct Flight</span>
                        </label>
                    </div>

                    <LoadingButton
                        isLoading={isResultLoading}
                        loadingText="Searching..."
                        className='w-full lg:w-auto p-3 md:p-2 bg-gradient-to-r from-[#243167] to-[#364A9C] hover:from-[#364A9C] hover:to-[#243167] text-white rounded-lg font-semibold text-base md:text-lg px-6 md:px-8'
                        onClick={() => handleOneWaySearch()}
                    >
                        Search
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
};


const RoundTripFlightSearch = ({ fromLocation, setFromLocation, toLocation, setToLocation, dateValue, setDateValue, passengers, setPassengers, toleranceDays, setToleranceDays, onlyDirectFlight, setOnlyDirectFlight, selectedAirline, setSelectedAirline, handleSearch, returnDateValue, setReturnDateValue }) => {
    // Function to update tolerance days count
    const updateDaysCount = (action) => {
        if (action === 'increase') {
            setToleranceDays(prev => Math.min(prev + 1, 7)); // Max 7 days
        } else if (action === 'decrease') {
            setToleranceDays(prev => Math.max(prev - 1, 1)); // Min 1 day
        }
    };

    return (
        <div>
            <div className="text-center">
                <div className='border-2 border-[#E7E7E7] w-full rounded-2xl flex flex-col lg:flex-row'>

                    <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 py-10 md:py-4 border-b lg:border-b-0 lg:border-r border-[#E7E7E7] relative'>
                        <SearchSelect label="From" value={fromLocation} onChange={setFromLocation} />
                        <div className='rounded-full h-fit p-2 md:p-4 bg-gradient-to-r from-[#243167] to-[#364A9C] text-white ring-4 absolute -bottom-3 lg:-bottom-0 lg:-right-7 lg:top-10 left-1/2 lg:left-auto transform -translate-x-1/2 lg:transform-none z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path stroke-dasharray="14" stroke-dashoffset="14" d="M15 7h-11.5M9 17h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="14;0" /></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M3 7l4 4M3 7l4 -4M21 17l-4 4M21 17l-4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="8;0" /></path></g></svg>
                        </div>
                    </div>

                    <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 py-10 md:py-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                        <SearchSelect label="To" value={toLocation} onChange={setToLocation} />
                    </div>
                    <div className='w-full lg:w-fit min-w-[150px] flex justify-center p-3 md:py-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                        <DatePicker
                            type="roundtrip"
                            title="Return"
                            placeholder="Select Date"
                            className="w-[200px] h-[60px]"
                            disabled={false}
                            value={returnDateValue}
                            onChange={setReturnDateValue}
                        />
                    </div>
                    <div className='w-full lg:w-fit min-w-[150px] flex justify-center p-3 md:p-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                        <DatePicker
                            type="roundtrip"
                            title="Departure"
                            placeholder="Select Date"
                            className="w-[200px] h-[60px]"
                            disabled={false}
                            value={dateValue}
                            onChange={setDateValue}
                        />
                    </div>
                    <div className='w-full lg:w-fit flex justify-center p-3 md:p-4 lg:border-l border-[#E7E7E7]'>
                        <Passengers
                            value={passengers}
                            onChange={setPassengers}
                        />
                    </div>

                </div>

                <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-2 gap-4 lg:gap-0">
                    <div className='flex flex-col lg:flex-row md:items-start items-center lg:items-center md:justify-start lg:justify-around space-y-3 lg:space-y-0 lg:space-x-2'>
                        <Select
                            placeholder="Select airline"
                            data={[
                                { value: 'Airline', label: 'Airline' },
                                { value: 'Emirates', label: 'Emirates' },
                                { value: 'British Airways', label: 'British Airways' },
                                { value: 'Lufthansa', label: 'Lufthansa' },
                            ]}
                            value={selectedAirline}
                            onChange={setSelectedAirline}
                            className="w-full lg:w-fit mt-1 font-bold"
                            styles={{
                                input: {
                                    width: '100%',
                                    height: '50px',
                                    textAlign: 'center',
                                    borderColor: '#E7E7E7',
                                    borderWidth: '2px',
                                    '&:focus': {
                                        borderColor: '#364A9C',
                                        boxShadow: '0 0 0 1px #364A9C'
                                    }
                                }
                            }}
                        />
                        <div className='flex items-center space-x-2 md:w-full w-fit lg:w-auto'>
                            <p className="font-medium text-center text-sm lg:text-base">Tolerance Days</p>
                            <div className="flex items-center space-x-2 rounded-full p-1">
                                <button
                                    onClick={() => updateDaysCount('decrease')}
                                    disabled={toleranceDays <= 1}
                                    className={`
                      w-7 h-7 lg:w-8 lg:h-8 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center 
                      hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      ${toleranceDays <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                                >
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <span className="flex text-center font-medium text-gray-900 text-sm lg:text-base">
                                    {toleranceDays} {toleranceDays > 1 ? 'days' : 'day'}
                                </span>

                                <button
                                    onClick={() => updateDaysCount('increase')}
                                    className="w-7 h-7 lg:w-8 lg:h-8 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-center lg:justify-end space-x-3'>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={onlyDirectFlight}
                                onChange={(e) => setOnlyDirectFlight(e.target.checked)}
                                className="w-4 h-4 text-[#364A9C] bg-gray-100 border-gray-300 rounded focus:ring-[#364A9C] focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Only Direct Flight</span>
                        </label>
                    </div>

                    <AnimatedButton 
                        className='w-full lg:w-auto p-3 md:p-2 bg-gradient-to-r from-[#243167] to-[#364A9C] hover:from-[#364A9C] hover:to-[#243167] text-white rounded-lg font-semibold text-base md:text-lg px-6 md:px-8' 
                        onClick={() => handleSearch('roundtrip', { fromLocation, toLocation, dateValue, returnDateValue, passengers })}
                        delay={0.2}
                    >
                        Search
                    </AnimatedButton>
                </div>
            </div>
        </div>
    );
};

const MultiCityFlightSearch = ({ selectedAirline, setSelectedAirline, toleranceDays, setToleranceDays, onlyDirectFlight, setOnlyDirectFlight, handleSearch, multiCityItems, setMultiCityItems }) => {

    const updateDaysCount = (action) => {
        if (action === 'increase') {
            setToleranceDays(prev => Math.min(prev + 1, 7)); // Max 7 days
        } else if (action === 'decrease') {
            setToleranceDays(prev => Math.max(prev - 1, 1)); // Min 1 day
        }
    };

    const addMultiCityItem = () => {
        const newItem = {
            id: Date.now(),
            fromLocation: 'ACC',
            toLocation: 'CDG',
            dateValue: Date.now(),
            passengers: { adult: 1, children: 0, infant: 0 }
        };
        setMultiCityItems([...multiCityItems, newItem]);
    };

    const removeMultiCityItem = (id) => {
        if (multiCityItems.length > 1) {
            setMultiCityItems(multiCityItems.filter(item => item.id !== id));
        }
    };

    const updateMultiCityItem = (id, updatedItem) => {
        setMultiCityItems(multiCityItems.map(item =>
            item.id === id ? { ...item, ...updatedItem } : item
        ));
    };

    const handleMultiCitySearch = () => {
        const searchData = {
            multiCityItems: multiCityItems.map(item => ({
                fromLocation: item.fromLocation,
                toLocation: item.toLocation,
                dateValue: item.dateValue,
                passengers: item.passengers
            }))
        };
        handleSearch('multicity', searchData);
    };

    const validateMultiCityForm = () => {
        return multiCityItems.every(item =>
            item.fromLocation &&
            item.toLocation &&
            item.dateValue &&
            item.passengers.adult > 0
        );
    };

    return (
        <div>
            <div className="space-y-4">
                {multiCityItems.map((item, index) => (
                    <div key={item.id} className="relative">
                        <div className="text-center">
                            <div className='border-2 border-[#E7E7E7] w-full rounded-2xl flex flex-col lg:flex-row'>
                                <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 py-10 md:py-4 border-b lg:border-b-0 lg:border-r border-[#E7E7E7] relative'>
                                    <SearchSelect
                                        label="From"
                                        value={item.fromLocation}
                                        onChange={(value) => updateMultiCityItem(item.id, { fromLocation: value })}
                                    />
                                    <div className='rounded-full h-fit p-2 md:p-4 bg-gradient-to-r from-[#243167] to-[#364A9C] text-white ring-4 absolute -bottom-3 lg:-bottom-0 lg:-right-7 lg:top-10 left-1/2 lg:left-auto transform -translate-x-1/2 lg:transform-none z-10'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path stroke-dasharray="14" stroke-dashoffset="14" d="M15 7h-11.5M9 17h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="14;0" /></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M3 7l4 4M3 7l4 -4M21 17l-4 4M21 17l-4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="8;0" /></path></g></svg>
                                    </div>
                                </div>

                                <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 py-10 md:py-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                                    <SearchSelect
                                        label="To"
                                        value={item.toLocation}
                                        onChange={(value) => updateMultiCityItem(item.id, { toLocation: value })}
                                    />
                                </div>

                                <div className='w-full lg:w-fit flex justify-center p-3 md:p-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                                    <DatePicker
                                        type="multicity"
                                        title="Departure"
                                        placeholder="Select Date"
                                        value={item.dateValue}
                                        onChange={(value) => updateMultiCityItem(item.id, { dateValue: value })}
                                    />
                                </div>

                                <div className='w-full lg:w-fit flex justify-center p-3 md:p-4 lg:border-l border-[#E7E7E7]'>
                                    <Passengers
                                        value={item.passengers}
                                        onChange={(value) => updateMultiCityItem(item.id, { passengers: value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delete button - top right corner */}
                        {multiCityItems.length > 1 && (
                            <button
                                onClick={() => removeMultiCityItem(item.id)}
                                className="absolute top-3 right-0 p-2 text-white hover:bg-red-700 hover:bg-red-50 border bg-red-600 rounded-full transition-colors"
                                title="Remove flight"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Single Add Flight button */}
            <div className="flex justify-center mt-6">
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={addMultiCityItem}
                    variant="outline"
                    color="#364A9C"
                    size="md"
                >
                    Add Another Flight
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-2 gap-4 lg:gap-0">
                <div className='flex flex-col lg:flex-row md:items-start items-center lg:items-center md:justify-start lg:justify-around space-y-3 lg:space-y-0 lg:space-x-2'>
                    <Select
                        placeholder="Select airline"
                        data={[
                            { value: 'Airline', label: 'Airline' },
                            { value: 'Emirates', label: 'Emirates' },
                            { value: 'British Airways', label: 'British Airways' },
                            { value: 'Lufthansa', label: 'Lufthansa' },
                        ]}
                        value={selectedAirline}
                        onChange={setSelectedAirline}
                        className="w-full lg:w-fit mt-1 font-bold"
                        styles={{
                            input: {
                                width: '100%',
                                height: '50px',
                                textAlign: 'center',
                                borderColor: '#E7E7E7',
                                borderWidth: '2px',
                                '&:focus': {
                                    borderColor: '#364A9C',
                                    boxShadow: '0 0 0 1px #364A9C'
                                }
                            }
                        }}
                    />
                    <div className='flex items-center space-x-2 md:w-full w-fit lg:w-auto'>
                        <p className="font-medium text-center text-sm lg:text-base">Tolerance Days</p>
                        <div className="flex items-center space-x-2 rounded-full p-1">
                            <button
                                onClick={() => updateDaysCount('decrease')}
                                disabled={toleranceDays <= 1}
                                className={`
                      w-7 h-7 lg:w-8 lg:h-8 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center 
                      hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      ${toleranceDays <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                            >
                                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <span className="flex text-center font-medium text-gray-900 text-sm lg:text-base">
                                {toleranceDays} {toleranceDays > 1 ? 'days' : 'day'}
                            </span>

                            <button
                                onClick={() => updateDaysCount('increase')}
                                className="w-7 h-7 lg:w-8 lg:h-8 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-center lg:justify-end space-x-3'>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={onlyDirectFlight}
                            onChange={(e) => setOnlyDirectFlight(e.target.checked)}
                            className="w-4 h-4 text-[#364A9C] bg-gray-100 border-gray-300 rounded focus:ring-[#364A9C] focus:ring-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Only Direct Flight</span>
                    </label>
                </div>

                <AnimatedButton
                    className='w-full lg:w-auto p-3 md:p-2 bg-gradient-to-r from-[#243167] to-[#364A9C] hover:from-[#364A9C] hover:to-[#243167] text-white rounded-lg font-semibold text-base md:text-lg px-6 md:px-8 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={handleMultiCitySearch}
                    disabled={!validateMultiCityForm()}
                    delay={0.2}
                >
                    Search Multi-City
                </AnimatedButton>
            </div>
        </div>
    );
}
