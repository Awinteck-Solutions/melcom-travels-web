import { BASEURL } from "../../../constants/api.constant"

export const checkoutEndpoints = {
    // Checkout Endpoints
    CREATE_CHECKOUT: `${BASEURL}/api/checkout/create`,
    
    // Additional checkout endpoints can be added here
    // GET_CHECKOUT_STATUS: (id) => `${BASEURL}/api/checkout/${id}`,
    // UPDATE_CHECKOUT: (id) => `${BASEURL}/api/checkout/${id}`,
    // CANCEL_CHECKOUT: (id) => `${BASEURL}/api/checkout/${id}/cancel`,
}
