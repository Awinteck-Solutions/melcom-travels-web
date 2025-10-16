import axios from "axios";
import { authEndpoints } from "../auth.endpoints";

// Helper function to handle API responses
const handleApiResponse = (response) => {
    return {
        status: true,
        message: '',
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

// ==================== AUTHENTICATION SERVICES ====================

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} API response
 */
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(authEndpoints.REGISTER, userData, {
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
 * Login user
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} API response
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(authEndpoints.LOGIN, credentials, {
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
 * Google authentication
 * @param {Object} googleData - Google token data
 * @returns {Promise<Object>} API response
 */
export const googleAuth = async (googleData) => {
    try {
        const response = await axios.post(authEndpoints.GOOGLE_AUTH, googleData, {
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
 * Request password reset
 * @param {Object} emailData - Email for password reset
 * @returns {Promise<Object>} API response
 */
export const forgetPassword = async (emailData) => {
    try {
        const response = await axios.post(authEndpoints.FORGET_PASSWORD, emailData, {
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
 * Change password (authenticated user)
 * @param {Object} passwordData - Password change data
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const changePassword = async (passwordData, authToken) => {
    try {
        const response = await axios.post(authEndpoints.CHANGE_PASSWORD, passwordData, {
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

// ==================== PROFILE MANAGEMENT SERVICES ====================

/**
 * Get user profile
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const getProfile = async (authToken) => {
    try {
        const response = await axios.get(authEndpoints.PROFILE, {
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
 * Update profile (text only)
 * @param {Object} profileData - Profile data
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const updateProfile = async (profileData, authToken) => {
    try {
        const response = await axios.put(authEndpoints.PROFILE, profileData, {
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
 * Update profile with image
 * @param {FormData} formData - Form data including image
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const updateProfileWithImage = async (formData, authToken) => {
    try {
        const response = await axios.put(authEndpoints.PROFILE, formData, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

// ==================== NOTIFICATIONS SERVICES ====================

/**
 * Get notification alerts
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const getNotificationAlerts = async (authToken) => {
    try {
        const response = await axios.get(authEndpoints.NOTIFICATION_ALERTS, {
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
 * Update notification status
 * @param {Object} statusData - Status data
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} API response
 */
export const updateNotificationStatus = async ( statusData, authToken) => {
    try {
        const response = await axios.put(authEndpoints.NOTIFICATION_ALERTS, statusData, {
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


// faq get all faqs
export const getAllFAQs = async () => {
    try {
        const response = await axios.get(authEndpoints.GET_ALL_FAQS);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};