import axios from "axios";
import { FlightEndpoints } from "../endpoints/Flight.endpoints";

// Helper function to handle API responses
const handleApiResponse = (response) => {
    return {
        status: true,
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

// ==================== FLIGHT SEARCH SERVICES ====================

/**
 * Search for flights (One-way, Return, Multi-city)
 * @param {Object} searchParams - Flight search parameters
 * @returns {Promise<Object>} API response
 */
export const searchFlights = async (searchParams) => {
    try {
        const response = await axios.post(FlightEndpoints.SEARCH, searchParams);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Search for one-way flights
 * @param {Object} params - Search parameters
 * @returns {Promise<Object>} API response
 */
export const searchOneWayFlights = async (params) => {
    const searchParams = {
        ...params,
        tripType: 'oneway'
    };
    return searchFlights(searchParams);
};

/**
 * Search for return flights
 * @param {Object} params - Search parameters
 * @returns {Promise<Object>} API response
 */
export const searchReturnFlights = async (params) => {
    const searchParams = {
        ...params,
        tripType: 'return'
    };
    return searchFlights(searchParams);
};

/**
 * Search for multi-city flights
 * @param {Object} params - Search parameters
 * @returns {Promise<Object>} API response
 */
export const searchMultiCityFlights = async (params) => {
    const searchParams = {
        ...params,
        tripType: 'multicity'
    };
    return searchFlights(searchParams);
};

// ==================== FLIGHT DEALS SERVICES ====================

/**
 * Get all flight deals
 * @returns {Promise<Object>} API response
 */
export const getAllFlightDeals = async () => {
    try {
        const response = await axios.get(FlightEndpoints.DEALS);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get flight deal by ID
 * @param {string} dealId - Deal ID
 * @returns {Promise<Object>} API response
 */
export const getFlightDealById = async (dealId) => {
    try {
        const response = await axios.get(FlightEndpoints.DEAL_BY_ID(dealId));
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get flight deal categories
 * @returns {Promise<Object>} API response
 */
export const getFlightDealCategories = async () => {
    try {
        const response = await axios.get(FlightEndpoints.DEAL_CATEGORIES);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

// ==================== FLIGHT BOOKINGS SERVICES ====================

/**
 * Get all flight bookings (requires authentication)
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const getAllFlightBookings = async (authToken) => {
    try {
        const response = await axios.get(FlightEndpoints.BOOKINGS, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Create a new flight booking
 * @param {Object} bookingData - Booking data
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const createFlightBooking = async (bookingData, authToken) => {
    try {
        const response = await axios.post(FlightEndpoints.BOOKINGS, bookingData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get flight booking by ID
 * @param {string} bookingId - Booking ID
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const getFlightBookingById = async (bookingId, authToken) => {
    try {
        const response = await axios.get(FlightEndpoints.BOOKING_BY_ID(bookingId), {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

// ==================== UTILITIES SERVICES ====================

/**
 * Get all airports
 * @returns {Promise<Object>} API response
 */
export const getAllAirports = async () => {
    try {
        const response = await axios.get(FlightEndpoints.AIRPORTS);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Search airports by query
 * @param {string} query - Search query
 * @returns {Promise<Object>} API response
 */
export const searchAirports = async (query) => {
    try {
        const response = await axios.get(FlightEndpoints.AIRPORTS_SEARCH(query));
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};
