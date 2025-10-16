import { BASEURL } from "../../../../constants/api.constant"

export const FlightEndpoints = {
    // Flight Search Endpoints
    SEARCH: `${BASEURL}/flights/search`,
    
    // Flight Deals Endpoints
    DEALS: `${BASEURL}/flight-deals`,
    DEAL_BY_ID: (id) => `${BASEURL}/flight-deals/${id}`,
    DEAL_CATEGORIES: `${BASEURL}/flight-deals-categories`,
    
    // Flight Bookings Endpoints
    BOOKINGS: `${BASEURL}/flight-bookings`,
    BOOKING_BY_ID: (id) => `${BASEURL}/flight-bookings/${id}`,
    
    // Utilities Endpoints
    AIRPORTS: `${BASEURL}/airports`,
    AIRPORTS_SEARCH: (query) => `${BASEURL}/airports?search=${query}`,
 
}
      