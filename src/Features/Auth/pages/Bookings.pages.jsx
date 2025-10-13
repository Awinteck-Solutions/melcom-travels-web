import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import Container from '../../../components/Container';
import Header from '../../../components/Header';

const BookingsPage = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock booking data
  const bookings = [
    {
      id: 1,
      airlineName: 'Emirates',
      flightPrice: 'GH 100',
      flightType: 'One way',
      departure: 'Sept 5, 2025 8:30 AM',
      arrival: 'Sept 9, 2025 8:30 AM',
      duration: '7hrs 3m',
      flightClass: 'First Class'
    },
    {
      id: 2,
      airlineName: 'Emirates',
      flightPrice: 'GH 100',
      flightType: 'One way',
      departure: 'Sept 5, 2025 8:30 AM',
      arrival: 'Sept 9, 2025 8:30 AM',
      duration: '7hrs 3m',
      flightClass: 'First Class'
    },
    {
      id: 3,
      airlineName: 'Emirates',
      flightPrice: 'GH 100',
      flightType: 'One way',
      departure: 'Sept 5, 2025 8:30 AM',
      arrival: 'Sept 9, 2025 8:30 AM',
      duration: '7hrs 3m',
      flightClass: 'First Class'
    }
  ];

  const handleBack = () => {
    navigate('/profile');
  };

  const handlePreview = (bookingId) => {
    console.log('Preview booking:', bookingId);
    // Navigate to booking details page
    navigate(`/booking/${bookingId}`);
  };

  const filteredBookings = bookings.filter(booking =>
    booking.airlineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.flightType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.flightClass.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/* Header */}
      <Header currentPage="flights" />
      <div className='relative'>
        <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
          <img src="/contact-dots.svg" alt="stars" className="md:w-1/2 w-4/5 m-auto object-cover" />
        </div>
      </div>

      <div className='md:mx-20 mx-4 rounded-3xl border mb-5 overflow-hidden h-fit'>
        {/* Back Button */}
        <div className="flex items-center m-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-medium">Back</span>
          </button>
        </div>

        <div className="bg-white flex justify-center md:px-4">
          <div className="w-full max-w-6xl">
            {/* Page Header */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Bookings</h1>
              <p className="text-gray-600">Manage updates your way.</p>
            </div>

            {/* Search and Filter Section */}
            <div className="flex justify-end items-center mb-6 relative z-10">
              <div className="flex items-center space-x-3">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Booking"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Filter Button */}
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.5 7h15M7 12h10m-7 5h4"/></svg>
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden relative z-10">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  {/* Table Header */}
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Airline Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Flight Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Flight Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departure
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Arrival
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Flight Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.airlineName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.flightPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.flightType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.departure}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.arrival}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.flightClass}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handlePreview(booking.id)}
                            className="bg-[#364A9C] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? 'Try adjusting your search terms.' : 'You don\'t have any bookings yet.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookingsPage;
