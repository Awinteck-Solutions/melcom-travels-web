import axios from "axios";
import { BlogEndpoints } from "../endpoints/Blog.endpoints";

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

// ==================== BLOG SERVICES ====================

/**
 * Get all blogs
 * @returns {Promise<Object>} API response
 */
export const getAllBlogs = async () => {
    try {
        const response = await axios.get(BlogEndpoints.BLOGS);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get blog by ID
 * @param {string} blogId - Blog ID
 * @returns {Promise<Object>} API response
 */
export const getBlogById = async (blogId) => {
    try {
        const response = await axios.get(BlogEndpoints.BLOG_BY_ID(blogId));
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get blog categories
 * @returns {Promise<Object>} API response
 */
export const getBlogCategories = async () => {
    try {
        const response = await axios.get(BlogEndpoints.BLOG_CATEGORIES);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

