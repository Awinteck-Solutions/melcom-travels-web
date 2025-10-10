import axios from "axios";
import { CarEndpoints } from "../Car.endpoints";


// All POST request---------------------------------------------------- 
export const CarPost = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'SEND':
                response = await axios.post(CarEndpoints.SEND, payload);
                break;
            default:
                break;
        }

        return {
            status: true,
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
export const CarGet = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'FIND':
                response = await axios.get(CarEndpoints.FIND, payload);
                break;
        }

        return {
            status: true,
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

    // All PATCH request---------------------------------------------------- 
export const CarPatch = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'UPDATE':
                response = await axios.get(CarEndpoints.UPDATE, payload);
                break;
        }
        return {
            status: true,
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
