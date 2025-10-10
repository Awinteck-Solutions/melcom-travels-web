import axios from "axios";
import { authEndpoints } from "../auth.endpoints";


// All POST request---------------------------------------------------- 
export const authPost = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'LOGIN':
                response = await axios.post(authEndpoints.LOGIN, payload);
                break;
            case 'REGISTER':
                response = await axios.post(authEndpoints.REGISTER, payload);
                break;
            case 'FORGOT-PASSWORD':
                response = await axios.post(authEndpoints.FORGOT_PASSWORD, payload);
                break;
            case 'RESET-PASSWORD':
                response = await axios.post(authEndpoints.RESET_PASSWORD, payload);
        }

        return {
            status: true,
            message: '',
            data: response.data,
        };

    } catch (error) {
        if (error.response.status == 500) {
            return {
                status: false,
                message: 'Something went wrong, Please try again'
            };
        } else {
            return {
                status: false,
                message: error.response.data.message
            };
        }
    }
}

// All GET request---------------------------------------------------- 
export const authGet = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'PROFILE':
                response = await axios.get(authEndpoints.LOGIN, payload);
                break;
        }

        return {
            status: true,
            message: '',
            data: response.data,
        };

    } catch (error) {
        if (error.response.status == 500) {
            return {
                status: false,
                message: 'Something went wrong, Please try again'
            };
        } else {
            return {
                status: false,
                message: error.response.data.message
            };
        }
    }
}