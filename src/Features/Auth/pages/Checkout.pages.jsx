import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
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
    const [passengerData, setPassengerData] = useState({
        adult1: {
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            middleName: '',
            dateOfBirth: null,
            nationality: '',
            phoneNumber: ''
        },
        adult2: {
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            middleName: '',
            dateOfBirth: null,
            nationality: '',
            phoneNumber: ''
        },
        infant3: {
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            middleName: '',
            dateOfBirth: null,
            nationality: '',
            phoneNumber: ''
        }
    });

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

        // Check sessionStorage first (since we're using window.location.href)
        try {
            const storedFlight = sessionStorage.getItem('selectedFlight');
            if (storedFlight) {
                const parsedFlight = JSON.parse(storedFlight);
                console.log('Flight data received from sessionStorage:', parsedFlight);
                setFlight(parsedFlight);
                // Clear sessionStorage after use
                sessionStorage.removeItem('selectedFlight');
                return;
            }
        } catch (error) {
            console.error('Error parsing stored flight data:', error);
        }

        // Check if flight data was passed from the booking flow (React Router)
        if (location.state && location.state.flight) {
            console.log('Flight data received from location state:', location.state.flight);
            setFlight(location.state.flight);
        } else {
            console.log('No flight data received, using default');
            console.log('Using default flight data:', defaultFlight);
        }
    }, [location.state, location.pathname]);

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
        // Handle checkout logic here
        const checkoutData = {
            flight: flight,
            passengers: passengerData,
            totalPrice: ((flight.price * 3) + ((flight.price * 3) * 0.15) - ((flight.price * 3) * 0.05)).toFixed(0)
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


    const PassengerForm = ({ passengerType, title }) => (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Title *"
                    placeholder="Select your title (Mr, Mrs, Ms, Dr, etc.)"
                    data={['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']}
                    value={passengerData[passengerType].title}
                    onChange={(value) => handleInputChange(passengerType, 'title', value)}
                    required
                />

                <TextInput
                    label="First Name *"
                    placeholder="Enter first name"
                    value={passengerData[passengerType].firstName}
                    onChange={(e) => handleInputChange(passengerType, 'firstName', e.target.value)}
                    required
                />

                <TextInput
                    label="Last Name *"
                    placeholder="Enter last name"
                    value={passengerData[passengerType].lastName}
                    onChange={(e) => handleInputChange(passengerType, 'lastName', e.target.value)}
                    required
                />

                <TextInput
                    label="Email Address *"
                    placeholder="Enter email address"
                    type="email"
                    value={passengerData[passengerType].email}
                    onChange={(e) => handleInputChange(passengerType, 'email', e.target.value)}
                    required
                />

                <Select
                    label="Gender *"
                    placeholder="Select gender"
                    data={['Male', 'Female', 'Other']}
                    value={passengerData[passengerType].gender}
                    onChange={(value) => handleInputChange(passengerType, 'gender', value)}
                    required
                />

                <TextInput
                    label="Middle Name *"
                    placeholder="Enter your middle name"
                    value={passengerData[passengerType].middleName}
                    onChange={(e) => handleInputChange(passengerType, 'middleName', e.target.value)}
                    required
                />

                <DatePickerInput
                    label="Date of birth *"
                    placeholder="Select your birth date"
                    value={passengerData[passengerType].dateOfBirth}
                    onChange={(value) => handleInputChange(passengerType, 'dateOfBirth', value)}
                    required
                />

                <Select
                    label="Nationality *"
                    placeholder="Select your country of citizenship"
                    data={['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Netherlands']}
                    value={passengerData[passengerType].nationality}
                    onChange={(value) => handleInputChange(passengerType, 'nationality', value)}
                    required
                />

                <TextInput
                    label="Phone number *"
                    placeholder="XXX XXX XXXX"
                    value={passengerData[passengerType].phoneNumber}
                    onChange={(e) => handleInputChange(passengerType, 'phoneNumber', e.target.value)}
                    required
                />
            </div>
        </div>
    );

    const CartSummary = () => (
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
                    <span className="text-gray-600">Flights x 3 Travellers</span>
                    <span className="font-medium">GH₵{(flight.price * 3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">GH₵{((flight.price * 3) * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-red-600">-GH₵{((flight.price * 3) * 0.05).toFixed(0)}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Trip Total</span>
                <span className="text-2xl font-bold text-gray-800">GH₵ {((flight.price * 3) + ((flight.price * 3) * 0.15) - ((flight.price * 3) * 0.05)).toFixed(0)}</span>
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

    return (
        <Container>
            <div className="md:min-h-screen">
                {/* Header */}
                <Header currentPage="flights" />

                <div className='relative'>
                    <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
                        <img src="/contact-dots.svg" alt="stars" className="md:w-1/2 w-4/5 m-auto object-cover" />
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
                                        key={flight.id || index}
                                        flight={flight}
                                    // onBookNow={handleBookNow}
                                    // onViewDetails={handleViewDetails}
                                    />
                                </div>

                                <PassengerForm passengerType="adult1" title="Adult-1" />
                                <PassengerForm passengerType="adult2" title="Adult-2" />
                                <PassengerForm passengerType="infant3" title="Infant-3" />
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
