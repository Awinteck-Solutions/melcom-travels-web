import { useState } from 'react';
import ProgressStepper from './ProgressStepper';
import FlightResultCard from './FlightResultCard';
import { Text } from '@mantine/core';

const SearchResults = () => {
    const [currentStep, setCurrentStep] = useState(1);

    // Sample one-way flight data
    const flightData = [
        {
            id: 1,
            from: 'Accra',
            to: 'Paris',
            airlineLogo: '/emirates.svg',
            departure: new Date('2025-01-15T08:30:00'),
            arrival: new Date('2025-01-15T14:45:00'),
            airline: 'Emirates',
            price: 750,
            duration: '6h 15m',
            stops: 1,
            flightNumber: 'EK1234',
            segment: null
        },
        {
            id: 2,
            from: 'Accra',
            to: 'London',
            airlineLogo: '/emirates.svg',
            departure: new Date('2025-01-15T10:15:00'),
            arrival: new Date('2025-01-15T18:30:00'),
            airline: 'British Airways',
            price: 680,
            duration: '8h 15m',
            stops: 0,
            flightNumber: 'BA4567',
            segment: null
        },
        {
            id: 3,
            from: 'Accra',
            to: 'New York',
            airlineLogo: '/emirates.svg',
            departure: new Date('2025-01-15T14:20:00'),
            arrival: new Date('2025-01-15T22:45:00'),
            airline: 'Lufthansa',
            price: 920,
            duration: '8h 25m',
            stops: 1,
            flightNumber: 'LH7890',
            segment: null
        }
    ];


    // Handle booking a flight
    const handleBookNow = (flight) => {
        console.log('Booking flight:', flight);
        setCurrentStep(2);
    };

    // Handle viewing flight details
    const handleViewDetails = (flight, isExpanded) => {
        console.log('Viewing details for flight:', flight, 'Expanded:', isExpanded);
    };

    return (
        <div className="w-full max-w-[875px] mx-auto">
            {/* Progress Stepper */}
            <div className="mb-8 md:inline-block hidden">
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
                    <FlightResultCard
                        key={flight.id || index}
                        flight={flight}
                        onBookNow={handleBookNow}
                        onViewDetails={handleViewDetails}
                    />
                ))}
            </div>

           
        </div>
    );
};

export default SearchResults;
