import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import { useSearchContext } from '../../../context/SearchContext';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { Select, TextInput, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { OneWayFlightResultCard, ProgressStepper } from '../../Main/Flight/components';
import { notifications } from '@mantine/notifications';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useGlobalContext();
    const { searchData } = useSearchContext();
    
    // This component now supports dynamic passenger forms based on stored booking data
    // The booking data includes both flight information and passenger counts from the search
    
    // Initialize passenger data structure
    const initializePassengerData = (passengerCounts) => {
        const data = {};
        let passengerIndex = 1;
        
        // Add adults
        for (let i = 0; i < passengerCounts.adult; i++) {
            data[`adult${passengerIndex}`] = {
                title: '',
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                middleName: '',
                dateOfBirth: null,
                nationality: '',
                phoneNumber: '',
                type: 'adult'
            };
            passengerIndex++;
        }
        
        // Add children
        for (let i = 0; i < passengerCounts.children; i++) {
            data[`child${passengerIndex}`] = {
                title: '',
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                middleName: '',
                dateOfBirth: null,
                nationality: '',
                phoneNumber: '',
                type: 'child'
            };
            passengerIndex++;
        }
        
        // Add infants
        for (let i = 0; i < passengerCounts.infant; i++) {
            data[`infant${passengerIndex}`] = {
                title: '',
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                middleName: '',
                dateOfBirth: null,
                nationality: '',
                phoneNumber: '',
                type: 'infant'
            };
            passengerIndex++;
        }
        
        return data;
    };
    
    // Get passenger counts from search data or use defaults
    const getPassengerCounts = () => {
        if (searchData) {
            const counts = {
                adult: searchData.adults || 1,
                children: searchData.children || 0,
                infant: searchData.infants || 0
            };
            console.log('Passenger counts from search context:', counts);
            return counts;
        }
        // Fallback to default if no search data
        console.log('No search data available, using default passenger counts');
        return { adult: 1, children: 0, infant: 0 };
    };
    
    const [passengerCounts, setPassengerCounts] = useState(getPassengerCounts());
    const [passengerData, setPassengerData] = useState(initializePassengerData(passengerCounts));

    // Default flight data (fallback)
    const defaultFlight = {
        id: 1,
        from: 'Accra - Kotoka (ACC)',
        fromCode: 'ACC',
        to: 'Abidjan - Felix Houphouet Boigny (ABJ)',
        toCode: 'ABJ',
        airlineLogo: '/emirates.svg',
        departure: new Date('2025-01-15T08:30:00'),
        arrival: new Date('2025-01-15T14:45:00'),
        airline: 'Emirates',
        planeType: 'Boeing 777-300ER',
        flightType: 'round-trip',
        returnDate: new Date('2025-01-15T14:45:00'),
        price: 750,
        duration: '6h 15m',
        stops: 1,
        flightNumber: 'EK1234',
        class: 'Q',
        segment: null
    };

    // Get flight data from location state or use default
    const [flight, setFlight] = useState(defaultFlight);

    useEffect(() => {
        console.log('Checkout page mounted');
        console.log('Location state:', location.state);
        console.log('Current pathname:', location.pathname);
        console.log('Search data:', searchData);

        // Check sessionStorage first (since we're using window.location.href)
        try {
            const storedBookingData = sessionStorage.getItem('selectedFlight');
            if (storedBookingData) {
                const parsedBookingData = JSON.parse(storedBookingData);
                console.log('Booking data received from sessionStorage:', parsedBookingData);
                
                // Handle both old format (just flight) and new format (booking data with passenger info)
                if (parsedBookingData.flight) {
                    // New format: booking data with flight and passenger info
                    setFlight(parsedBookingData.flight);
                    
                    // Use passenger info from stored booking data
                    if (parsedBookingData.passengerInfo) {
                        const storedPassengerCounts = {
                            adult: parsedBookingData.passengerInfo.adults || 1,
                            children: parsedBookingData.passengerInfo.children || 0,
                            infant: parsedBookingData.passengerInfo.infants || 0
                        };
                        console.log('Using stored passenger counts:', storedPassengerCounts);
                        setPassengerCounts(storedPassengerCounts);
                        setPassengerData(initializePassengerData(storedPassengerCounts));
                    }
                } else {
                    // Old format: just flight data
                    setFlight(parsedBookingData);
                }
                
                // Clear sessionStorage after use
                sessionStorage.removeItem('selectedFlight');
                return;
            }
        } catch (error) {
            console.error('Error parsing stored booking data:', error);
        }

        // Check if flight data was passed from the booking flow (React Router)
        if (location.state && location.state.flight) {
            console.log('Flight data received from location state:', location.state.flight);
            setFlight(location.state.flight);
        } else if (!sessionStorage.getItem('selectedFlight')) {
            console.log('No flight data received, using default');
            console.log('Using default flight data:', defaultFlight);
        }

        // Initialize passenger data based on search context (fallback)
        const counts = getPassengerCounts();
        console.log('Passenger counts from search context:', counts);
        setPassengerCounts(counts);
        setPassengerData(initializePassengerData(counts));
    }, [location.state, location.pathname, searchData]);

    const handleInputChange = (passengerType, field, value) => {
        setPassengerData(prev => ({
            ...prev,
            [passengerType]: {
                ...prev[passengerType],
                [field]: value
            }
        }));
    };

    const handleCheckout = () => {
        // Calculate total passengers
        const totalPassengers = passengerCounts.adult + passengerCounts.children + passengerCounts.infant;
        
        // Handle checkout logic here
        const checkoutData = {
            flight: flight,
            passengers: passengerData,
            passengerCounts: passengerCounts,
            totalPrice: ((flight.price * totalPassengers) + ((flight.price * totalPassengers) * 0.15) - ((flight.price * totalPassengers) * 0.05)).toFixed(0)
        };
        console.log('Checkout data:', checkoutData);
        // navigate('/confirm-booking');
        notifications.show({
            title: "Success",
            message: "Checkout successful!",
            color: "green",
            position: 'top-right'
        });
    };


    // Generate passenger forms dynamically
    const generatePassengerForms = () => {
        const forms = [];
        const passengerKeys = Object.keys(passengerData);
        
        passengerKeys.forEach((key, index) => {
            const passenger = passengerData[key];
            const passengerNumber = index + 1;
            let title = '';
            
            // Determine title based on passenger type
            switch (passenger.type) {
                case 'adult':
                    title = `Adult ${passengerNumber}`;
                    break;
                case 'child':
                    title = `Child ${passengerNumber}`;
                    break;
                case 'infant':
                    title = `Infant ${passengerNumber}`;
                    break;
                default:
                    title = `Passenger ${passengerNumber}`;
            }
            
            forms.push(
                <PassengerForm 
                    key={key} 
                    passengerType={key} 
                    title={title}
                    passengerTypeLabel={passenger.type}
                />
            );
        });
        
        return forms;
    };

    const PassengerForm = ({ passengerType, title, passengerTypeLabel }) => (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Title *"
                    placeholder="Select your title (Mr, Mrs, Ms, Dr, etc.)"
                    data={['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']}
                    value={passengerData[passengerType]?.title || ''}
                    onChange={(value) => handleInputChange(passengerType, 'title', value)}
                    required
                />

                <TextInput
                    label="First Name *"
                    placeholder="Enter first name"
                    value={passengerData[passengerType]?.firstName || ''}
                    onChange={(e) => handleInputChange(passengerType, 'firstName', e.target.value)}
                    required
                />

                <TextInput
                    label="Last Name *"
                    placeholder="Enter last name"
                    value={passengerData[passengerType]?.lastName || ''}
                    onChange={(e) => handleInputChange(passengerType, 'lastName', e.target.value)}
                    required
                />

                <TextInput
                    label="Email Address *"
                    placeholder="Enter email address"
                    type="email"
                    value={passengerData[passengerType]?.email || ''}
                    onChange={(e) => handleInputChange(passengerType, 'email', e.target.value)}
                    required
                />

                <Select
                    label="Gender *"
                    placeholder="Select gender"
                    data={['Male', 'Female', 'Other']}
                    value={passengerData[passengerType]?.gender || ''}
                    onChange={(value) => handleInputChange(passengerType, 'gender', value)}
                    required
                />

                <TextInput
                    label="Middle Name *"
                    placeholder="Enter your middle name"
                    value={passengerData[passengerType]?.middleName || ''}
                    onChange={(e) => handleInputChange(passengerType, 'middleName', e.target.value)}
                    required
                />

                <DatePickerInput
                    label="Date of birth *"
                    placeholder="Select your birth date"
                    value={passengerData[passengerType]?.dateOfBirth || null}
                    onChange={(value) => handleInputChange(passengerType, 'dateOfBirth', value)}
                    required
                />

                <Select
                    label="Nationality *"
                    placeholder="Select your country of citizenship"
                    data={['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Netherlands']}
                    value={passengerData[passengerType]?.nationality || ''}
                    onChange={(value) => handleInputChange(passengerType, 'nationality', value)}
                    required
                />

                <TextInput
                    label="Phone number *"
                    placeholder="XXX XXX XXXX"
                    value={passengerData[passengerType]?.phoneNumber || ''}
                    onChange={(e) => handleInputChange(passengerType, 'phoneNumber', e.target.value)}
                    required
                />
            </div>
        </div>
    );

    const CartSummary = () => {
        const totalPassengers = passengerCounts.adult + passengerCounts.children + passengerCounts.infant;
        const basePrice = flight.price * totalPassengers;
        const taxes = basePrice * 0.15;
        const discount = basePrice * 0.05;
        const totalPrice = basePrice + taxes - discount;

        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-6 z-10 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-6">My Cart</h3>

                <div className="flex items-center space-x-3 mb-4">
                    <div className='rounded-full overflow-hidden bg-gray-100 p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512"><path fill="#364A9C" d="M372 143.9L172.7 40.2c-8-4.1-17.3-4.8-25.7-1.7l-41.1 15c-10.3 3.7-13.8 16.4-7.1 25l101.5 127.9l-100.2 36.4L40 206.2c-6.2-3.8-13.8-4.5-20.7-2.1l-16.3 6c-9.4 3.4-13.4 14.5-8.3 23.1L48.3 325c15.6 26.7 48.1 38.4 77.1 27.8l12.9-4.7l398.4-145c29.1-10.6 44-42.7 33.5-71.8s-42.7-44-71.8-33.5zM32.2 448c-17.7 0-32 14.3-32 32s14.3 32 32 32h512c17.7 0 32-14.3 32-32s-14.3-32-32-32z" /></svg>
                    </div>
                    <div>
                        <div className="font-medium">{flight.fromCode} to {flight.toCode}</div>
                        <div className="text-sm text-gray-600">Economy: {flight.flightType === 'one-way' ? 'One Way' : 'Round Trip'}</div>
                    </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Flights x {totalPassengers} Traveller{totalPassengers > 1 ? 's' : ''}</span>
                        <span className="font-medium">GH₵{basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Taxes</span>
                        <span className="font-medium">GH₵{taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-red-600">-GH₵{discount.toFixed(0)}</span>
                    </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Trip Total</span>
                    <span className="text-2xl font-bold text-gray-800">GH₵ {totalPrice.toFixed(0)}</span>
                </div>

                <Button
                    fullWidth
                    size="lg"
                    color="#364A9C"
                    onClick={handleCheckout}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Checkout
                </Button>
            </div>
        );
    };

    return (
        <Container>
            <div className="md:min-h-screen">
                {/* Header */}
                <Header currentPage="flights" />

                <div className='relative'>
                    <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
                        <img src="/contact-dots.svg" alt="stars" className="lg:hidden md:w-1/2 w-4/5 m-auto object-cover" />
                    </div>
                </div>

                <div className="md:min-h-screen py-8">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back</span>
                        </button>

                        {/* Progress Stepper */}
                        <div className="mb-8 md:inline-block hidden w-full">
                            <ProgressStepper currentStep={3} />
                        </div>

                        <div className="flex flex-wrap gap-8">
                            {/* Left Column - Flight Details and Forms */}
                            <div className="flex-1">

                                <div className='mb-4 border rounded-[35px] bg-[#364A9C]'>
                                    <OneWayFlightResultCard
                                        key={flight.id || 'default'}
                                        flight={flight}
                                    // onBookNow={handleBookNow}
                                    // onViewDetails={handleViewDetails}
                                    />
                                </div>

                                {/* Dynamic Passenger Forms */}
                                {generatePassengerForms()}
                            </div>

                            {/* Right Column - Cart Summary */}
                            <div className="w-80">
                                <CartSummary />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutPage;
