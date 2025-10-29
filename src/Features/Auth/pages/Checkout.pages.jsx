import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from '../../../context';
import { useSearchContext } from '../../../context/SearchContext';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { Select, TextInput, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { OneWayFlightResultCard, ProgressStepper } from '../../Main/Flight/components';
import { notifications } from '@mantine/notifications';
import { createCheckout, transformPassengerData, transformFlightData } from '../services/checkout.service';
import { useScrollToTop } from '../../../hooks/useScrollToTop';

// Formik-based PassengerForm component
const PassengerForm = React.memo(({ passengerKey, title, formik }) => (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{title}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                </label>
                <select
                    name={`passengers.${passengerKey}.title`}
                    value={formik.values.passengers[passengerKey]?.title || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800"
                >
                    <option value="">Select your title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                </select>
                {formik.touched.passengers?.[passengerKey]?.title && formik.errors.passengers?.[passengerKey]?.title && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].title}</p>
                )}
            </div>

            {/* First Name Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                </label>
                <input
                    type="text"
                    name={`passengers.${passengerKey}.firstName`}
                    value={formik.values.passengers[passengerKey]?.firstName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                {formik.touched.passengers?.[passengerKey]?.firstName && formik.errors.passengers?.[passengerKey]?.firstName && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].firstName}</p>
                )}
            </div>

            {/* Last Name Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                </label>
                <input
                    type="text"
                    name={`passengers.${passengerKey}.lastName`}
                    value={formik.values.passengers[passengerKey]?.lastName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                {formik.touched.passengers?.[passengerKey]?.lastName && formik.errors.passengers?.[passengerKey]?.lastName && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].lastName}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    name={`passengers.${passengerKey}.email`}
                    value={formik.values.passengers[passengerKey]?.email || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                {formik.touched.passengers?.[passengerKey]?.email && formik.errors.passengers?.[passengerKey]?.email && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].email}</p>
                )}
            </div>

            {/* Gender Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                </label>
                <select
                    name={`passengers.${passengerKey}.gender`}
                    value={formik.values.passengers[passengerKey]?.gender || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800"
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {formik.touched.passengers?.[passengerKey]?.gender && formik.errors.passengers?.[passengerKey]?.gender && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].gender}</p>
                )}
            </div>

            {/* Middle Name Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Middle Name
                </label>
                <input
                    type="text"
                    name={`passengers.${passengerKey}.middleName`}
                    value={formik.values.passengers[passengerKey]?.middleName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your middle name"
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                {formik.touched.passengers?.[passengerKey]?.middleName && formik.errors.passengers?.[passengerKey]?.middleName && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].middleName}</p>
                )}
            </div>

            {/* Date of Birth Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                </label>
                <input
                    type="date"
                    name={`passengers.${passengerKey}.dateOfBirth`}
                    value={formik.values.passengers[passengerKey]?.dateOfBirth || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800"
                />
                {formik.touched.passengers?.[passengerKey]?.dateOfBirth && formik.errors.passengers?.[passengerKey]?.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].dateOfBirth}</p>
                )}
            </div>

            {/* Nationality Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                </label>
                <select
                    name={`passengers.${passengerKey}.nationality`}
                    value={formik.values.passengers[passengerKey]?.nationality || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800"
                >
                    <option value="">Select your country of citizenship</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                </select>
                {formik.touched.passengers?.[passengerKey]?.nationality && formik.errors.passengers?.[passengerKey]?.nationality && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].nationality}</p>
                )}
            </div>

            {/* Phone Number Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                </label>
                <input
                    type="tel"
                    name={`passengers.${passengerKey}.phoneNumber`}
                    value={formik.values.passengers[passengerKey]?.phoneNumber || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="XXX XXX XXXX"
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                {formik.touched.passengers?.[passengerKey]?.phoneNumber && formik.errors.passengers?.[passengerKey]?.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].phoneNumber}</p>
                )}
            </div>

            {/* Passport Number Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport Number
                </label>
                <input
                    type="text"
                    name={`passengers.${passengerKey}.passport`}
                    value={formik.values.passengers[passengerKey]?.passport || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter passport number"
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                {formik.touched.passengers?.[passengerKey]?.passport && formik.errors.passengers?.[passengerKey]?.passport && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.passengers[passengerKey].passport}</p>
                )}
            </div>
        </div>
    </div>
));
const CheckoutPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { user } = useGlobalContext();
    const { searchData } = useSearchContext();
    const [passengerCounts, setPassengerCounts] = useState({});
    const [bookingData, setBookingData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [flight, setFlight] = useState();

    // Parse booking data only once when component mounts
    useEffect(() => {
        try {
            const dataParam = params.get('data');
            if (dataParam) {
                const parsedData = JSON.parse(dataParam);
                console.log('Parsed booking data:', parsedData);
                setBookingData(parsedData);
                setFlight(parsedData.flight);
                setPassengerCounts(parsedData.passengerInfo);
                setIsLoading(false);
            } else {
                console.log('No data parameter found');
                navigate('/flights/search');
            }
        } catch (error) {
            console.error('Error parsing booking data:', error);
            navigate('/flights/search');
        }
    }, [params, navigate]);
    
    // Auto scroll to top when page loads
    useScrollToTop();

   const [checkoutData, setCheckoutData] = useState(null);
    const [showPaymentIframe, setShowPaymentIframe] = useState(false);
    
    // Initialize passenger data structure for Formik
    const initializePassengerData = (passengerCounts) => {
        const data = {};
        let passengerIndex = 1;
        // Add adults
        for (let i = 0; i < passengerCounts.adults; i++) {
            data[`adult${passengerIndex}`] = {
                title: '',
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                middleName: '',
                dateOfBirth: '',
                nationality: '',
                phoneNumber: '',
                passport: '',
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
                dateOfBirth: '',
                nationality: '',
                phoneNumber: '',
                passport: '',
                type: 'child'
            };
            passengerIndex++;
        }
        
        // Add infants
        for (let i = 0; i < passengerCounts.infants; i++) {
            data[`infant${passengerIndex}`] = {
                title: '',
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                middleName: '',
                dateOfBirth: '',
                nationality: '',
                phoneNumber: '',
                passport: '',
                type: 'infant'
            };
            passengerIndex++;
        }
        return data;
    };
    
    // Create dynamic Yup validation schema
    const createValidationSchema = (passengerCounts) => {
        const passengerKeys = Object.keys(initializePassengerData(passengerCounts));
        const passengerSchema = {};
        
        passengerKeys.forEach(key => {
            passengerSchema[key] = Yup.object().shape({
                title: Yup.string().required('Title is required'),
                firstName: Yup.string().required('First name is required'),
                lastName: Yup.string().required('Last name is required'),
                email: Yup.string().email('Invalid email format').required('Email is required'),
                gender: Yup.string().required('Gender is required'),
                dateOfBirth: Yup.string().required('Date of birth is required'),
                nationality: Yup.string().required('Nationality is required'),
                
            });
        });
        
        return Yup.object().shape({
            passengers: Yup.object().shape(passengerSchema)
        });
    };

   
  const handleSubmit = async (values) => {
        try {
            // Show loading notification
            notifications.show({
                id: 'checkout-loading',
                title: "Processing Checkout",
                message: "Please wait while we process your booking...",
                color: "blue",
                position: 'top-right',
                loading: true,
                autoClose: false
            });
            
            // Transform data to API format
            const transformedFlight = transformFlightData(flight);
            const transformedTravelers = transformPassengerData(values.passengers, passengerCounts);
            
            // Prepare checkout payload
            const checkoutPayload = {
                flight: transformedFlight,
                Traveler: transformedTravelers
            };
            
            console.log('Checkout payload:', checkoutPayload);
            
            // Get auth token if user is logged in
            const authToken = user?.token || null;
            
            // Call checkout API
            const response = await createCheckout(checkoutPayload, authToken);
            
            // Dismiss loading notification
            notifications.hide('checkout-loading');
            
            console.log('response', response)
            if (response.status) {
                console.log('response.data', response.data.data)
                // Success - Check if we have a checkoutUrl for iframe
                if (response.data && response.data.data.checkoutUrl) {
                    console.log('Checkout response:', response.data.data.checkoutUrl);
                    
                    // Store checkout data and show iframe
                    setCheckoutData(response.data.data);
                    setShowPaymentIframe(true);
                    
                    notifications.show({
                        title: "Payment Required",
                        message: "Please complete your payment to finalize the booking.",
                        color: "blue",
                        position: 'top-right'
                    });
                } else {
                    // Fallback for responses without checkoutUrl
                    notifications.show({
                        title: "Checkout Successful!",
                        message: response.message || "Your booking has been processed successfully.",
                        color: "green",
                        position: 'top-right'
                    });
                }
            } else {
                // Error
                notifications.show({
                    title: "Checkout Failed",
                    message: response.message || "There was an error processing your booking. Please try again.",
                    color: "red",
                    position: 'top-right'
                });
            }
        } catch (error) {
            // Dismiss loading notification
            notifications.hide('checkout-loading');
            
            console.error('Checkout error:', error);
            notifications.show({
                title: "Checkout Error",
                message: "An unexpected error occurred. Please try again.",
                color: "red",
                position: 'top-right'
            });
        }
    };

    // Initialize Formik with proper dependencies
    const formik = useFormik({
        initialValues: {
            passengers: initializePassengerData(passengerCounts)
        },
        validationSchema: createValidationSchema(passengerCounts),
        onSubmit: handleSubmit,
        enableReinitialize: true // Reinitialize when passengerCounts change
    });

    // Update formik when passengerCounts change
    useEffect(() => {
        if (Object.keys(passengerCounts).length > 0) {
            formik.setValues({
                passengers: initializePassengerData(passengerCounts)
            });
        }
    }, [passengerCounts]);

    // Generate passenger forms dynamically using useMemo for optimization
    const generatePassengerForms = useMemo(() => {
        const forms = [];
        const passengerKeys = Object.keys(initializePassengerData(passengerCounts));
        
        passengerKeys.forEach((key, index) => {
            const passenger = initializePassengerData(passengerCounts)[key];
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
                    passengerKey={key} 
                    title={title}
                    formik={formik}
                />
            );
        });
        
        return forms;
    }, [passengerCounts, formik]);

    // Payment Iframe Component
    const PaymentIframe = () => {
        if (!showPaymentIframe || !checkoutData) return null;

        const handleCloseIframe = () => {
            setShowPaymentIframe(false);
            setCheckoutData(null);
        };

        const handlePaymentSuccess = () => {
            notifications.show({
                title: "Payment is in progress...",
                message: "Your booking has been confirmed. You will receive a confirmation email shortly.",
                color: "blue",
                position: 'top-right'
            });
            handleCloseIframe();
            navigate('/booking-confirmation', { 
                state: { 
                    checkoutData,
                    flightData: flight,
                    passengerData: formik.values.passengers
                } 
            });
        };

        // Listen for postMessage events from the payment gateway
        useEffect(() => {
            const handleMessage = (event) => {
                // Check if the message is from the payment gateway
                if (event.origin !== 'https://pay.hubtel.com') return;
                
                try {
                    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                    
                    // Handle different payment statuses
                    if (data.status === 'success' || data.status === 'completed') {
                        handlePaymentSuccess();
                    } else if (data.status === 'failed' || data.status === 'cancelled') {
                        notifications.show({
                            title: "Payment Failed",
                            message: data.message || "Payment was not completed. Please try again.",
                            color: "red",
                            position: 'top-right'
                        });
                    }
                } catch (error) {
                    console.error('Error parsing payment message:', error);
                }
            };

            window.addEventListener('message', handleMessage);
            return () => window.removeEventListener('message', handleMessage);
        }, []);

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Complete Payment</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Booking Reference: {checkoutData.bookingReference}
                            </p>
                        </div>
                        <button
                            onClick={handleCloseIframe}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Iframe Container */}
                    <div className="flex-1 p-6">
                        <iframe
                            src={checkoutData.checkoutUrl}
                            className="w-full h-full border-0 rounded-lg"
                            title="Payment Gateway"
                            sandbox="allow-scripts allow-forms allow-same-origin allow-top-navigation allow-popups"
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="text-sm text-gray-600">
                                <p>Status: <span className="font-medium text-blue-600">{checkoutData.status}</span></p>
                                <p>Secure payment powered by Hubtel</p>
                            </div>
                            <div className="flex flew-wrap space-x-3">
                                <button
                                    onClick={handleCloseIframe}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePaymentSuccess}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Payment Complete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const CartSummary = () => {
        const totalPassengers = passengerCounts.totalPassengers;
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
                    onClick={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {formik.isSubmitting ? 'Processing...' : 'Checkout'}
                </Button>
            </div>
        );
    };

    // Show loading state while data is being loaded
    if (isLoading) {
        return (
            <Container>
                <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading checkout...</p>
                        <p className="text-sm text-gray-500 mt-2">Please wait while we prepare your booking</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="md:min-h-screen">
                {/* Header */}
                <Header currentPage="flights" />

                <div className='relative'>
                    <div className="absolute md:-top-20 -top-12 left-0 w-full h-full z-[0]">
                        <img src="/contact-dots.svg" alt="stars" className="lg:hidden md:w-1/2 w-4/5 m-auto object-cover" />
                    </div>
                </div>

                <div className="md:min-h-screen md:py-8 py-1">
                    <div className="max-w-7xl mx-auto md:px-6 px-1">
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

                        <form onSubmit={formik.handleSubmit} className='z-10 relative'>
                            <div className="flex flex-wrap gap-4">
                                {/* Left Column - Flight Details and Forms */}
                                <div className="flex-1">

                                    <div className='mb-4 md:border md:rounded-[35px] md:bg-[#364A9C]'>
                                        <OneWayFlightResultCard
                                            key={flight.id || 'default'}
                                            flight={flight}
                                        // onBookNow={handleBookNow}
                                        // onViewDetails={handleViewDetails}
                                        />
                                    </div>

                                    {/* Dynamic Passenger Forms */}
                                    {generatePassengerForms}
                                </div>

                                {/* Right Column - Cart Summary */}
                                <div className="md:w-80 w-full">
                                    <CartSummary />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Payment Iframe Modal */}
            <PaymentIframe />
        </Container>
    );
};

export default CheckoutPage;
