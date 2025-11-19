import { BASEURL } from "../../../constants/api.constant"

export const checkoutEndpoints = {
    // Checkout Endpoints
    CREATE_CHECKOUT: `${BASEURL}/api/checkout/create`,
    GET_CHECKOUT_STATUS: (id) => `${BASEURL}/api/checkout/status/${id}`,
    
    // Additional checkout endpoints can be added here
    // UPDATE_CHECKOUT: (id) => `${BASEURL}/api/checkout/${id}`,
    // CANCEL_CHECKOUT: (id) => `${BASEURL}/api/checkout/${id}/cancel`,
}
