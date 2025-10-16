import axios from "axios";
import { ContactEndpoints } from "../Contact.endpoints";

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

// ==================== CONTACT SERVICES ====================

/**
 * Submit contact form
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} API response
 */
export const submitContactForm = async (contactData) => {
    try {
        const response = await axios.post(ContactEndpoints.CONTACT_FORM, contactData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get contact information
 * @returns {Promise<Object>} API response
 */
export const getContactInfo = async () => {
    try {
        const response = await axios.get(ContactEndpoints.CONTACT_INFO);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

