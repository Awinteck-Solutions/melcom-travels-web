import axios from "axios";
import { checkoutEndpoints } from "../endpoints/checkout.endpoints";

// Helper function to handle API responses
const handleApiResponse = (response) => {
    return {
        status: true,
        message: response.data?.message || 'Request processed successfully',
        data: response.data,
    };
};

// Helper function to handle API errors
const handleApiError = (error) => {
    if (error.response?.status === 500) {
        return {
            status: false,
            message: 'Something went wrong, Please try again'
        };
    } else {
        return {
            status: false,
            message: error.response?.data?.message || error.message || 'An error occurred'
        };
    }
};

// ==================== CHECKOUT SERVICES ====================

/**
 * Create checkout session
 * @param {Object} checkoutData - Checkout data including flight and traveler information
 * @param {string} authToken - Authentication token (optional)
 * @returns {Promise<Object>} API response
 */
export const createCheckout = async (checkoutData, authToken = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        // Add authorization header if token is provided
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        
        const response = await axios.post(checkoutEndpoints.CREATE_CHECKOUT, checkoutData, {
            headers
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get checkout status by ID
 * @param {string} checkoutId - Checkout ID
 * @param {string} authToken - Authentication token (optional)
 * @returns {Promise<Object>} API response
 */
export const getCheckoutStatus = async (checkoutId, authToken = null) => {
    try {
        const headers = {};
        
        // Add authorization header if token is provided
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        
        const response = await axios.get(checkoutEndpoints.GET_CHECKOUT_STATUS(checkoutId), {
            headers
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Transform passenger data to API format
 * @param {Object} passengerData - Raw passenger data from form
 * @param {Object} passengerCounts - Passenger counts
 * @returns {Array} Transformed traveler data
 */
export const transformPassengerData = (passengerData, passengerCounts) => {
    const travelers = [];
    const passengerKeys = Object.keys(passengerData);
    
    passengerKeys.forEach((key) => {
        const passenger = passengerData[key];
        
        // Determine passenger type based on passenger type
        let passengerType = 'ADT'; // Adult
        if (passenger.type === 'child') {
            passengerType = 'CHD'; // Child
        } else if (passenger.type === 'infant') {
            passengerType = 'INF'; // Infant
        }
        
        // Format birth date
        const birthDate = passenger.dateOfBirth 
            ? new Date(passenger.dateOfBirth).toISOString().split('T')[0]
            : null;
        
        // Format phone number (remove any non-digit characters except +)
        const phoneNumber = passenger.phoneNumber 
            ? passenger.phoneNumber.replace(/[^\d+]/g, '')
            : '';
        
        travelers.push({
            PassengerType: passengerType,
            BirthDate: birthDate,
            Passport: passenger.passport || '',
            LoyaltyProgram: '',
            Gender: passenger.gender,
            NamePrefix: passenger.title,
            GivenName: passenger.firstName,
            Surname: passenger.lastName,
            email: passenger.email,
            phone: phoneNumber
        });
    });
    
    return travelers;
};

/**
 * Transform flight data to API format
 * @param {Object} flight - Flight data
 * @returns {Object} Transformed flight data
 */
export const transformFlightData = (flight) => {
    return {
        id: flight.id || 1,
        from: flight.from || '',
        fromCode: flight.fromCode || '',
        to: flight.to || '',
        toCode: flight.toCode || '',
        airlineLogo: flight.airlineLogo || '',
        departure: flight.departure ? new Date(flight.departure).toISOString() : null,
        arrival: flight.arrival ? new Date(flight.arrival).toISOString() : null,
        airline: flight.airline || '',
        planeType: flight.planeType || '',
        flightType: flight.flightType || 'one-way',
        returnDate: flight.returnDate ? new Date(flight.returnDate).toISOString() : null,
        price: flight.price || 0,
        duration: flight.duration || '',
        stops: flight.stops || 0,
        flightNumber: flight.flightNumber || '',
        class: flight.class || 'Economy',
        segment: flight.segment || null,
        bookingReference: flight.bookingReference || 'PD001',
        currency: flight.currency || 'GHS',
        perPassenger: flight.perPassenger || flight.price || 0,
        segments: flight.segments || flight.segment || [],
        totalSegments: flight.totalSegments || 1,
        firstAirline: flight.firstAirline || flight.airline || '',
        firstAirlineCode: flight.firstAirlineCode || 'AW'
    };
};
