import axios from "axios";
import { FlightEndpoints } from "../Flight.endpoints";


// All POST request---------------------------------------------------- 
export const FlightPost = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'SEND':
                response = await axios.post(FlightEndpoints.SEND, payload);
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
export const FlightGet = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'FIND':
                response = await axios.get(FlightEndpoints.FIND, payload);
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
export const FlightPatch = async (action, payload) => {
    try {
        let response;

        switch (action) {
            case 'UPDATE':
                response = await axios.get(FlightEndpoints.UPDATE, payload);
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
