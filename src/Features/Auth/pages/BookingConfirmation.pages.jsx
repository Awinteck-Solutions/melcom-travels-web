import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { notifications } from '@mantine/notifications';
import { useScrollToTop } from '../../../hooks/useScrollToTop';

const BookingConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useGlobalContext();
    const [checkoutData, setCheckoutData] = useState(null);
    const [flightData, setFlightData] = useState(null);
    const [passengerData, setPassengerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Auto scroll to top when page loads
    useScrollToTop();

    useEffect(() => {
        // Get checkout data from navigation state
        if (location.state && location.state.checkoutData) {
            setCheckoutData(location.state.checkoutData);
            
            // Extract flight and passenger data if available
            if (location.state.flightData) {
                setFlightData(location.state.flightData);
            }
            if (location.state.passengerData) {
                setPassengerData(location.state.passengerData);
            }
            
            setIsLoading(false);
        } else {
            // If no data, redirect to home
            notifications.show({
                title: "No Booking Data",
                message: "No booking information found. Redirecting to home page.",
                color: "orange",
                position: 'top-right'
            });
            navigate('/');
        }
    }, [location.state, navigate]);

    const handleDownloadTicket = () => {
        // TODO: Implement ticket download functionality
        notifications.show({
            title: "Download Started",
            message: "Your ticket is being prepared for download.",
            color: "blue",
            position: 'top-right'
        });
    };

    const handleEmailConfirmation = () => {
        // TODO: Implement email confirmation functionality
        notifications.show({
            title: "Email Sent",
            message: "A confirmation email has been sent to your registered email address.",
            color: "green",
            position: 'top-right'
        });
    };

    const handleViewBookings = () => {
        navigate('/bookings');
    };

    const handleNewBooking = () => {
        navigate('/flights/search');
    };

    if (isLoading) {
        return (
            <Container>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#364A9C] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading booking confirmation...</p>
                    </div>
                </div>
            </Container>
        );
    }

    if (!checkoutData) {
        return null;
    }

    return (
        <Container>
            <div className="min-h-screen">
                {/* Header */}
                <Header currentPage="flights" />

                <div className='relative'>
                    <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
                        <img src="/contact-dots.svg" alt="stars" className="lg:hidden md:w-1/2 w-4/5 m-auto object-cover" />
                    </div>
                </div>

                <div className="md:py-8 py-1">
                    <div className="max-w-4xl mx-auto md:px-6 px-1">
                        {/* Success Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
                            <p className="text-gray-600">Your flight has been successfully booked. You will receive a confirmation email shortly.</p>
                        </div>

                        {/* Booking Details Card */}
                        <div className="bg-white rounded-xl shadow-lg border mb-8">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Booking Reference */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Booking Reference</label>
                                        <p className="text-lg font-bold text-[#364A9C]">{checkoutData.bookingReference}</p>
                                    </div>

                                    {/* Checkout ID */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Transaction ID</label>
                                        <p className="text-sm text-gray-800 font-mono">{checkoutData.checkoutId}</p>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            checkoutData.status === 'PENDING' 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : checkoutData.status === 'COMPLETED'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {checkoutData.status}
                                        </span>
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
                                        <p className="text-sm text-gray-800">Hubtel Payment Gateway</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flight Information */}
                        <div className="bg-white rounded-xl shadow-lg border mb-8">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">Flight Information</h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Flight Details</h3>
                                            <p className="text-sm text-gray-600">Economy Class</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Departure</p>
                                        <p className="font-semibold text-gray-800">Today</p>
                                    </div>
                                </div>

                                {/* Flight Route */}
                                <div className="flex items-center justify-between py-4 border-t border-b">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-800">
                                            {flightData?.fromCode || 'ACC'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {flightData?.from?.split(' - ')[0] || 'Accra'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {flightData?.from?.split(' - ')[1] || 'Kotoka International'}
                                        </p>
                                    </div>
                                    
                                    <div className="flex-1 mx-6">
                                        <div className="flex items-center">
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                            <div className="mx-4">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                        </div>
                                        <p className="text-center text-sm text-gray-500 mt-2">
                                            {flightData?.duration || '1h 10m'}
                                        </p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-800">
                                            {flightData?.toCode || 'LOS'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {flightData?.to?.split(' - ')[0] || 'Lagos'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {flightData?.to?.split(' - ')[1] || 'Murtala Muhammed'}
                                        </p>
                                    </div>
                                </div>

                                {/* Flight Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Airline</label>
                                        <p className="text-sm text-gray-800">
                                            {flightData?.airline || 'Africa World Airlines'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Flight Number</label>
                                        <p className="text-sm text-gray-800">
                                            {flightData?.flightNumber || 'AW 208'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Aircraft</label>
                                        <p className="text-sm text-gray-800">
                                            {flightData?.planeType || 'ER4'}
                                        </p>
                                    </div>
                                </div>

                                {/* Departure and Arrival Times */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Departure Time</label>
                                        <p className="text-sm text-gray-800">
                                            {flightData?.departure ? new Date(flightData.departure).toLocaleString() : '08:30 AM'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Arrival Time</label>
                                        <p className="text-sm text-gray-800">
                                            {flightData?.arrival ? new Date(flightData.arrival).toLocaleString() : '09:40 AM'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Passenger Information */}
                        <div className="bg-white rounded-xl shadow-lg border mb-8">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">Passenger Information</h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-4">
                                    {passengerData ? (
                                        Object.entries(passengerData).map(([key, passenger]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {passenger.title} {passenger.firstName} {passenger.lastName}
                                                    </p>
                                                    <p className="text-sm text-gray-600 capitalize">
                                                        {passenger.type} Passenger
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {passenger.email}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Seat</p>
                                                    <p className="font-semibold text-gray-800">
                                                        {Math.floor(Math.random() * 30) + 1}{String.fromCharCode(65 + Math.floor(Math.random() * 6))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-semibold text-gray-800">Passenger Information</p>
                                                <p className="text-sm text-gray-600">Details will be available after payment confirmation</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handleDownloadTicket}
                                className="flex-1 bg-[#364A9C] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Download Ticket</span>
                            </button>
                            
                            <button
                                onClick={handleEmailConfirmation}
                                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Email Confirmation</span>
                            </button>
                        </div>

                        {/* Additional Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleViewBookings}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                            >
                                {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg> */}
                                {/* <span>View All Bookings</span> */}
                            </button>
                            
                            <button
                                onClick={handleNewBooking}
                                className="flex-1 bg-white border-2 border-[#364A9C] text-[#364A9C] py-3 px-6 rounded-lg font-semibold hover:bg-[#364A9C] hover:text-white transition-colors flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Book Another Flight</span>
                            </button>
                        </div>

                        {/* Important Information */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                            <h3 className="font-semibold text-blue-800 mb-2">Important Information</h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Please arrive at the airport at least 2 hours before departure</li>
                                <li>• Bring a valid ID and your booking reference</li>
                                <li>• Check-in opens 24 hours before departure</li>
                                <li>• Baggage allowance: 23kg for economy class</li>
                                <li>• Contact customer service for any changes or cancellations</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BookingConfirmationPage;
