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
import { CustomSearch, CustomSearchResultsList } from './CustomSearch';

const FlightSearch = ({ setResultLoading, isResultLoading }) => {
    const [searchType, setSearchType] = useState('oneway');
    const [selectedAirline, setSelectedAirline] = useState('Emirates');
    const [selectedFlightClass, setSelectedFlightClass] = useState('economy');

    const { setSearchData, setLoading, setResults, formData, setFormData } = useSearchContext();
    const navigate = useNavigate();


    // Initialize form state from persisted data or defaults
    // useEffect(() => {
    //     if (formData && JSON.stringify(formData) !== JSON.stringify(loadedFormDataRef.current)) {

    //         // Mark this form data as loaded to prevent re-loading
    //         loadedFormDataRef.current = formData;
    //         isLoadingFromContext.current = true;

    //         setFromLocation(formData.fromLocation || '');
    //         setToLocation(formData.toLocation || '');
    //         setDateValue(formData.dateValue || null);
    //         setReturnDateValue(formData.returnDateValue || null);
    //         setPassengers(formData.passengers || { adult: 1, children: 0, infant: 0 });
    //         setToleranceDays(formData.toleranceDays || 1);
    //         setOnlyDirectFlight(formData.onlyDirectFlight || false);
    //         setSelectedAirline(formData.selectedAirline || 'Emirates');
    //         setFlightClass(formData.flightClass || 'economy');
    //         if (formData.multiCityItems) {
    //             setMultiCityItems(formData.multiCityItems);
    //         }

    //         // Set the previous form data to prevent unnecessary saves
    //         previousFormData.current = formData;

    //         // Reset the flag after a short delay to allow state updates to complete
    //         setTimeout(() => {
    //             isLoadingFromContext.current = false;
    //         }, 200);
    //     }
    // }, [formData]);

    // Save form data to context whenever it changes (but not when loading from context)
    // useEffect(() => {
    //     // Only save if we're not currently loading from persisted data
    //     if (!isLoadingFromContext.current) {
    //         const currentFormData = {
    //             fromLocation,
    //             toLocation,
    //             dateValue,
    //             returnDateValue,
    //             passengers,
    //             toleranceDays,
    //             onlyDirectFlight,
    //             selectedAirline,
    //             flightClass,
    //             multiCityItems
    //         };

    //         // Only save if the form data has actually changed
    //         const hasChanged = JSON.stringify(currentFormData) !== JSON.stringify(previousFormData.current);
    //         if (hasChanged) {
    //             previousFormData.current = currentFormData;
    //             setFormData(currentFormData);
    //         }
    //     }
    // }, [fromLocation, toLocation, dateValue, returnDateValue, passengers, toleranceDays, onlyDirectFlight, selectedAirline, flightClass, multiCityItems, setFormData]);



    // Helper function to format date to YYYY-MM-DD
    const formatDateForAPI = (date) => {
        if (!date) return null;
        const dateObj = date instanceof Date ? date : new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSearch = async (searchType, searchData) => {
        const payload = {
            "origin": searchData.fromLocation?.code,
            "destination": searchData.toLocation?.code,
            "departureDate": formatDateForAPI(searchData.dateValue),
            "adults": searchData.passengers.adult,
            "children": searchData.passengers.children,
            "infants": searchData.passengers.infant,
            "cabin": searchData.flightClass || selectedFlightClass || "ECO",
            "tripType": searchType,
            "directFlightsOnly": searchData.onlyDirectFlight,
            "currency": "GHS",
            airline: searchData.selectedAirline || selectedAirline,
            toleranceDays: searchData.toleranceDays || 0,
        };

        // Add returnDate for round trip searches
        if (searchType === 'return' && searchData.returnDateValue) {
            payload.returnDate = formatDateForAPI(searchData.returnDateValue);
        }

        console.log('Flight Search Payload:', payload);
        console.log('Flight Search Search Data:', searchData);
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
                if (window.location.pathname !== '/flights/search') {
                    setTimeout(() => {
                        navigate('/flights/search');
                        // window.location.href = '/flights/search';
                    }, 100);
                }
            } else {
                notifications.show({
                    title: 'Flight search error',
                    message: response.message || 'Please try again',
                    color: 'red',
                    position: 'top-right',
                });
            }
        } catch (error) {
            notifications.show({
                title: 'Flight search error',
                message: error.message || 'Please try again',
                color: 'red',
                position: 'top-right',
            });
        }
        finally {
            setLoading(false);
            setResultLoading(false);
        }
    }
    const handleSearchType = (type) => {
        setSearchType(type);
    }



    return (
        <AnimatedDiv
            variant={scaleIn}
            delay={0}
            className="relative bg-white border-2 border-[#364A9C] rounded-2xl p-1 md:p-5 max-w-7xl mx-auto px-1 md:px-6"
        >
            <div className="flex justify-between">
            <div className='flex items-center border border-gray-300 overflow-hidden rounded-lg md:text-base text-sm w-fit md:mx-0 mx-auto mb-2'>
                <button onClick={() => handleSearchType('oneway')} className={`${searchType === 'oneway' ? 'bg-[#364A9C] text-white rounded-l-lg border border-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'} px-4 py-2 border-r flex items-center gap-2`}>
                    <IconPlane size={16}/>
                    <span>One Way</span>
                </button>
                <button onClick={() => handleSearchType('roundtrip')} className={`${searchType === 'roundtrip' ? 'bg-[#364A9C] text-white border border-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'} px-4 py-2 border-r  flex md:flex-0 flex-1l items-center gap-2`}>
                    <IconPlaneDeparture size={16} />
                    <span>Round Trip</span>
                </button>
                <button onClick={() => handleSearchType('multicity')} className={`${searchType === 'multicity' ? 'bg-[#364A9C] text-white rounded-r-lg border border-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'} px-4 py-2 flex items-center gap-2`}>
                    <IconRoute size={16} />
                    <span>Multi-city</span>
                </button>
                </div>
                <div className='md:block hidden'>
                    <Select
                        placeholder="Select class"
                        data={[
                            { value: 'economy', label: 'Economy' },
                            { value: 'business', label: 'Business' },
                            { value: 'first-class', label: 'First Class' }
                        ]}
                        value={selectedFlightClass}
                        onChange={setSelectedFlightClass}
                    />
                </div>
            </div>
            <div>
                {searchType === 'oneway' && <div>
                    <OneWayFlightSearch
                        handleSearch={handleSearch}
                        isResultLoading={isResultLoading}
                    />
                </div>}
                {searchType === 'roundtrip' && <div>
                    <RoundTripFlightSearch
                        handleSearch={handleSearch}
                        isResultLoading={isResultLoading}
                    />
                </div>}
                {searchType === 'multicity' && <div>
                    {/* <MultiCityFlightSearch
                        selectedAirline={selectedAirline}
                        setSelectedAirline={setSelectedAirline}
                        toleranceDays={toleranceDays}
                        setToleranceDays={setToleranceDays}
                    /> */}
                </div>}
            </div>

        </AnimatedDiv>
    );
};

export default FlightSearch;


const OneWayFlightSearch = ({ handleSearch, isResultLoading = false }) => {

    const { setSearchData, searchData, results } = useSearchContext(); 
    const today = new Date();
    const [dateValue, setDateValue] = useState(today);
    const [passengers, setPassengers] = useState({ adult: 1, children: 0, infant: 0 });
    const [toleranceDays, setToleranceDays] = useState(1);
    const [onlyDirectFlight, setOnlyDirectFlight] = useState(false);
    const [fromLocation, setFromLocation] = useState({
        code: 'ACC',
        name: 'Accra - Kotoka',
        country: {
            code: 'GH',
            name: 'GH'
        }
    }); // Use uppercase to match API response
    const [toLocation, setToLocation] = useState({});
    const [selectedAirline, setSelectedAirline] = useState('');
    const [flightClass, setFlightClass] = useState('economy');

    const handleOneWaySearch = () => {
        const data = {
            fromLocation,
            toLocation,
            flightClass,
            selectedAirline,
            dateValue,
            passengers,
            toleranceDays,
            onlyDirectFlight,
            flightClass
        }
        handleSearch('oneway', data)
        setSearchData(data)
    }
 
    useEffect(() => {
        console.log('CONTEXT SEARCH DATA - USE EFFECT', searchData)
        if (searchData?.fromLocation) {
            setFromLocation(searchData.fromLocation);
        }
        if (searchData?.toLocation) {
            setToLocation(searchData.toLocation);
        }
        if (searchData?.flightClass) {
            setFlightClass(searchData.flightClass);
        }
        if (searchData?.selectedAirline) {
            setSelectedAirline(searchData.selectedAirline);
        }
        if (searchData?.dateValue) {
            setDateValue(searchData.dateValue);
        }
        if (searchData?.passengers) {
            setPassengers(searchData.passengers);
        }
        if (searchData?.toleranceDays) {
            setToleranceDays(searchData.toleranceDays);
        }
        if (searchData?.onlyDirectFlight) {
            setOnlyDirectFlight(searchData.onlyDirectFlight);
        }
    }, []);


    return (
        <div>
            <div className="text-center">
                <div className='md:border-2 border md:mt-0 mt-1 border-[#E7E7E7] w-full rounded-2xl flex flex-col lg:flex-row'>

                    <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 pb-6 md:py-4 border-b lg:border-b-0 lg:border-r border-[#E7E7E7] relative'>
                        <CustomSearch value={fromLocation} label="From" selectedAirport={(val) => setFromLocation(val)} />
                        <div className='rounded-full h-fit p-1 md:p-4 bg-gradient-to-r from-[#243167] to-[#364A9C] text-white ring-4 absolute -bottom-3 lg:-bottom-0 lg:-right-7 lg:top-10 left-1/2 lg:left-auto transform -translate-x-1/2 lg:transform-none z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path stroke-dasharray="14" stroke-dashoffset="14" d="M15 7h-11.5M9 17h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="14;0" /></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M3 7l4 4M3 7l4 -4M21 17l-4 4M21 17l-4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="8;0" /></path></g></svg>
                        </div>
                    </div>

                    <div className='w-full flex justify-center lg:w-fit p-3 md:p-4 md:py-4 pt-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                        <CustomSearch value={toLocation} label="To" selectedAirport={(val) => setToLocation(val)} />
                    </div>

                    <div className='grid grid-cols-2 gap-0'>

                        <div className='col-span-1 w-full lg:w-fit flex justify-center p-3 md:p-0 md:py-4 md:border-b-0 md:border-l md:border-r-0 border-r border-[#E7E7E7]'>
                            <DatePicker
                                type="oneway"
                                title="Departure"
                                placeholder="Select Date"
                                disabled={false}
                                value={dateValue}
                                onChange={(value) => setDateValue(new Date(value))}
                            />
                        </div>
                        <div className='col-span-1 w-full lg:w-fit flex justify-center p-3 md:p-0 md:py-4 lg:border-l border-[#E7E7E7]'>
                            <Passengers
                                value={passengers}
                                onChange={setPassengers}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between mt-1 lg:mt-2 gap-4 lg:gap-0">
                    <div className='flex flex-col lg:flex-row md:items-start items-center lg:items-center md:justify-start lg:justify-around space-y-1 lg:space-y-0 lg:space-x-2'>
                        <div className='grid grid-cols-2 md:grid-cols-1 gap-2'>
                            <div className='col-span-1'>
                                <Select
                                    placeholder="All Airlines"
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
                            </div>

                            <div className="col-span-1 lg:ml-6 w-full lg:w-auto block md:hidden">
                                <Select
                                    placeholder="Select class"
                                    data={[
                                        { value: 'ECO', label: 'Economy' },
                                        { value: 'PRE', label: 'Premium Economy' },
                                        { value: 'BUS', label: 'Business' },
                                        { value: '1ST', label: 'First Class' }
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


const RoundTripFlightSearch = ({ handleSearch, isResultLoading = false }) => {
    const { setSearchData, searchData } = useSearchContext();
    const today = new Date();
    const returnDateDefault = new Date(today);
    returnDateDefault.setDate(today.getDate() + 7); // Default return date 7 days after departure
    
    const [dateValue, setDateValue] = useState(today);
    const [returnDateValue, setReturnDateValue] = useState(returnDateDefault);
    const [passengers, setPassengers] = useState({ adult: 1, children: 0, infant: 0 });
    const [toleranceDays, setToleranceDays] = useState(1);
    const [onlyDirectFlight, setOnlyDirectFlight] = useState(false);
    const [fromLocation, setFromLocation] = useState({
        code: 'ACC',
        name: 'Accra - Kotoka',
        country: {
            code: 'GH',
            name: 'GH'
        }
    });
    const [toLocation, setToLocation] = useState({});
    const [selectedAirline, setSelectedAirline] = useState('');
    const [flightClass, setFlightClass] = useState('ECO');

    const handleRoundTripSearch = () => {
        const data = {
            fromLocation,
            toLocation,
            flightClass,
            selectedAirline,
            dateValue,
            returnDateValue,
            passengers,
            toleranceDays,
            onlyDirectFlight,
            tripType: 'return'
        };
        handleSearch('return', data);
        setSearchData(data);
    };

    useEffect(() => {
        console.log('CONTEXT SEARCH DATA - USE EFFECT', searchData);
        if (searchData?.fromLocation) {
            setFromLocation(searchData.fromLocation);
        }
        if (searchData?.toLocation) {
            setToLocation(searchData.toLocation);
        }
        if (searchData?.flightClass) {
            setFlightClass(searchData.flightClass);
        }
        if (searchData?.selectedAirline) {
            setSelectedAirline(searchData.selectedAirline);
        }
        if (searchData?.dateValue) {
            setDateValue(searchData.dateValue);
        }
        if (searchData?.returnDateValue) {
            setReturnDateValue(searchData.returnDateValue);
        }
        if (searchData?.passengers) {
            setPassengers(searchData.passengers);
        }
        if (searchData?.toleranceDays) {
            setToleranceDays(searchData.toleranceDays);
        }
        if (searchData?.onlyDirectFlight !== undefined) {
            setOnlyDirectFlight(searchData.onlyDirectFlight);
        }
    }, []);

    return (
        <div>
            <div className="text-center">
                <div className='md:border-2 border md:mt-0 mt-1 border-[#E7E7E7] w-full rounded-2xl flex flex-col lg:flex-row'>

                    <div className='w-full  lg:max-w-[270px] lg:w-fit flex justify-center  p-3 md:p-4 pb-6 md:py-4 border-b lg:border-b-0 lg:border-r border-[#E7E7E7] relative'>
                        <CustomSearch value={fromLocation} label="From" selectedAirport={(val) => setFromLocation(val)} />
                        <div className='rounded-full h-fit p-1 md:p-4 bg-gradient-to-r from-[#243167] to-[#364A9C] text-white ring-4 absolute -bottom-3 lg:-bottom-0 lg:-right-7 lg:top-10 left-1/2 lg:left-auto transform -translate-x-1/2 lg:transform-none z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path stroke-dasharray="14" stroke-dashoffset="14" d="M15 7h-11.5M9 17h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="14;0" /></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M3 7l4 4M3 7l4 -4M21 17l-4 4M21 17l-4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="8;0" /></path></g></svg>
                        </div>
                    </div>

                    <div className='w-full  lg:max-w-[270px] lg:w-fit flex justify-center p-3 md:p-4 md:py-4 pt-4 border-b lg:border-b-0 lg:border-l border-[#E7E7E7]'>
                        <CustomSearch value={toLocation} label="To" selectedAirport={(val) => setToLocation(val)} />
                    </div>

                    <div className='grid grid-cols-2 gap-0'>
                        <div className='col-span-1 w-full lg:w-fitl flex justify-center p-3 md:p-4 lg:border-b-0 lg:border-l border-r border-[#E7E7E7]'>
                            <DatePicker
                                type="roundtrip"
                                title="Departure"
                                placeholder="Select Date"
                                disabled={false}
                                value={dateValue}
                                onChange={(value) => setDateValue(new Date(value))}
                            />
                        </div>
                        <div className='col-span-1 w-full lg:w-fitl flex justify-center p-3 md:p-4 md:border-r border-[#E7E7E7]'>
                            <DatePicker
                                type="roundtrip"
                                title="Return"
                                placeholder="Select Date"
                                disabled={false}
                                value={returnDateValue}
                                onChange={(value) => setReturnDateValue(new Date(value))}
                            />
                        </div>
                    </div>

                    <div className='w-full lg:w-fit flex justify-center p-3 md:p-4 lg:border-l md:border-t-0 border-t border-[#E7E7E7]'>
                        <Passengers
                            value={passengers}
                            onChange={setPassengers}
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between mt-1 lg:mt-2 gap-4 lg:gap-0">
                    <div className='flex flex-col lg:flex-row md:items-start items-center lg:items-center md:justify-start lg:justify-around space-y-1 lg:space-y-0 lg:space-x-2'>
                        <div className='grid grid-cols-2 md:grid-cols-1 gap-2'>
                            <div className='col-span-1'>
                                <Select
                                    placeholder="All Airlines"
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
                            </div>

                            <div className="col-span-1 lg:ml-6 w-full lg:w-auto block md:hidden">
                                <Select
                                    placeholder="Select class"
                                    data={[
                                        { value: 'ECO', label: 'Economy' },
                                        { value: 'PRE', label: 'Premium Economy' },
                                        { value: 'BUS', label: 'Business' },
                                        { value: '1ST', label: 'First Class' }
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
                        onClick={() => handleRoundTripSearch()}
                    >
                        Search
                    </LoadingButton>
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
