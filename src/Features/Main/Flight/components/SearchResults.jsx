import { useState } from 'react';
import ProgressStepper from './ProgressStepper';
import { MultiCityFlightResultCard, OneWayFlightResultCard, RoundTripFlightResultCard } from './FlightResultCard';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    // Sample one-way flight data
    const flightData = [
        {
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
        },
        {
            id: 2,
            from: 'Accra - Kotoka (ACC)',
            fromCode: 'ACC',
            to: 'Abidjan - Felix Houphouet Boigny (ABJ)',
            toCode: 'ABJ',
            airlineLogo: '/emirates.svg',
            departure: new Date('2025-01-15T10:15:00'),
            arrival: new Date('2025-01-15T18:30:00'),
            airline: 'British Airways',
            flightType: 'one-way',
            price: 680,
            duration: '8h 15m',
            stops: 0,
            flightNumber: 'BA4567',
            segment: null
        },
        {
            id: 3,
            from: 'Accra - Kotoka (ACC)',
            fromCode: 'ACC',
            to: 'Abidjan - Felix Houphouet Boigny (ABJ)',
            toCode: 'ABJ',
            airlineLogo: '/emirates.svg',
            departure: new Date('2025-01-15T14:20:00'),
            arrival: new Date('2025-01-15T22:45:00'),
            airline: 'Lufthansa',
            flightType: 'one-way',
            price: 920,
            duration: '8h 25m',
            stops: 1,
            flightNumber: 'LH7890',
            segment: null
        }
    ];


    // Handle booking a flight
    const handleBookNow = (flight) => {
        console.log('=== BOOK NOW CLICKED ===');
        console.log('Booking flight:', flight);
        console.log('Attempting to navigate to /checkout');
        
        // Show alert to confirm click is working
        // alert('Book Now clicked! Navigating to checkout...');
        
        // Store flight data in sessionStorage
        try {
            sessionStorage.setItem('selectedFlight', JSON.stringify(flight));
            console.log('Flight data stored in sessionStorage');
        } catch (error) {
            console.error('Error storing flight data:', error);
        }
        
        // Use window.location.href for immediate navigation
        console.log('Using window.location.href for navigation');
        window.location.href = '/checkout';
    };

    // Handle viewing flight details
    const handleViewDetails = (flight, isExpanded) => {
        console.log('Viewing details for flight:', flight, 'Expanded:', isExpanded);
    };

    return (
        <div className="w-full max-w-[875px] mx-auto">
            {/* Progress Stepper */}
            <div className="mb-8 md:inline-block hidden w-full">
                <ProgressStepper currentStep={currentStep} />
            </div>

            {/* Results Summary */}
            <div className="my-4 p-4 bg-gray-100 rounded-lg">
                <Text size="sm" color="dimmed">
                    Showing {flightData.length} flights
                </Text>
            </div>

            {/* Search Results */}
            <div className="space-y-6">
                {flightData.map((flight, index) => (
                    <OneWayFlightResultCard
                        key={flight.id || index}
                        flight={flight}
                        onBookNow={handleBookNow}
                        onViewDetails={handleViewDetails}
                    />
                ))}

                {flightData.map((flight, index) => (
                    <RoundTripFlightResultCard
                        key={flight.id || index}
                        flight={flight}
                        onBookNow={handleBookNow}
                        onViewDetails={handleViewDetails}
                    />
                ))}

                {/* {flightData.map((flight, index) => ( */}
                    <MultiCityFlightResultCard
                        key={1}
                        flights={flightData}
                        onBookNow={handleBookNow}
                        onViewDetails={handleViewDetails}
                    />
                {/* ))} */}
            </div>


        </div>
    );
};

export default SearchResults;
