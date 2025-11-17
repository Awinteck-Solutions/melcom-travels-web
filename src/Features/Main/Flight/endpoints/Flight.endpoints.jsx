import { BASEURL } from "../../../../constants/api.constant"

export const FlightEndpoints = {
    // Flight Search Endpoints
    SEARCH: `${BASEURL}/flights/search`,
    
    // Flight Deals Endpoints
    DEALS: `${BASEURL}/special-deals`,
    DEAL_BY_ID: (id) => `${BASEURL}/special-deals/${id}`,
    DEAL_CATEGORIES: `${BASEURL}/special-deals-categories`,
    DEALS_BY_CATEGORY: (categoryId) => `${BASEURL}/special-deals?category=${categoryId}`,
    
    // Flight Bookings Endpoints
    BOOKINGS: `${BASEURL}/flight-bookings`,
    BOOKING_BY_ID: (id) => `${BASEURL}/flight-bookings/${id}`,
    
    // Utilities Endpoints
    AIRPORTS: `${BASEURL}/airports`,
    AIRPORTS_SEARCH: (query) => `${BASEURL}/airports?search=${query}`,
    
    // Country List Endpoints
    COUNTRY_LIST_CATEGORIES: `${BASEURL}/country-list-categories`,
    COUNTRY_LIST: `${BASEURL}/country-list`,
    COUNTRY_LIST_BY_CATEGORY: (categoryId) => `${BASEURL}/country-list?category=${categoryId}`,
 
}
      