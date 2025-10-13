import React from 'react';
import { MultiCityFlightResultCard } from '../Features/Main/Flight/components/FlightResultCard';

const MultiCityExample = () => {
  // Sample multi-city flight data
  const sampleFlights = [
    {
      airline: 'Emirates',
      airlineLogo: '/emirates.svg',
      from: 'Accra',
      fromCode: 'ACC',
      to: 'Dubai',
      toCode: 'DXB',
      departure: '2024-03-15T08:30:00Z',
      arrival: '2024-03-15T18:45:00Z',
      duration: '10 hrs 15 mins',
      price: 2500,
      flightNumber: 'EK789',
      class: 'Economy',
      planeType: 'Boeing 777',
      transfers: 0
    },
    {
      airline: 'Qatar Airways',
      airlineLogo: '/emirates.svg',
      from: 'Dubai',
      fromCode: 'DXB',
      to: 'London',
      toCode: 'LHR',
      departure: '2024-03-16T14:20:00Z',
      arrival: '2024-03-16T18:30:00Z',
      duration: '7 hrs 10 mins',
      price: 1800,
      flightNumber: 'QR123',
      class: 'Economy',
      planeType: 'Airbus A350',
      transfers: 0
    },
    {
      airline: 'British Airways',
      airlineLogo: '/emirates.svg',
      from: 'London',
      fromCode: 'LHR',
      to: 'New York',
      toCode: 'JFK',
      departure: '2024-03-18T10:15:00Z',
      arrival: '2024-03-18T13:45:00Z',
      duration: '8 hrs 30 mins',
      price: 2200,
      flightNumber: 'BA456',
      class: 'Economy',
      planeType: 'Boeing 787',
      transfers: 0
    }
  ];

  const handleBookNow = (flights) => {
    console.log('Booking multi-city trip:', flights);
    alert(`Booking ${flights.length} flight segments for GH₵${flights.reduce((sum, flight) => sum + flight.price, 0).toLocaleString()}`);
  };

  const handleViewDetails = (flight, isExpanded) => {
    console.log('View details for flight:', flight, 'Expanded:', isExpanded);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Multi-City Flight Results</h1>
      <p className="text-gray-600 mb-8 text-center">
        Example of a multi-city trip with 3 segments: Accra → Dubai → London → New York
      </p>
      
      <div className="space-y-6">
        <MultiCityFlightResultCard
          flights={sampleFlights}
          onBookNow={handleBookNow}
          onViewDetails={handleViewDetails}
        />
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Features of MultiCityFlightResultCard:</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Multiple Segments:</strong> Displays multiple flight segments in a single card</li>
          <li>• <strong>Individual Expansion:</strong> Each segment can be expanded/collapsed independently</li>
          <li>• <strong>Total Price Calculation:</strong> Automatically calculates and displays total price for all segments</li>
          <li>• <strong>Segment Numbering:</strong> Each segment is clearly labeled with its number</li>
          <li>• <strong>Detailed Timeline:</strong> Expanded view shows detailed flight information with timeline</li>
          <li>• <strong>Unified Booking:</strong> Single "Book All Segments" button for the entire trip</li>
          <li>• <strong>Responsive Design:</strong> Works well on both desktop and mobile devices</li>
        </ul>
      </div>
    </div>
  );
};

export default MultiCityExample;

