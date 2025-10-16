import { BASEURL } from "../../constants/api.constant"

export const authEndpoints = {
    // Authentication Endpoints
    REGISTER: `${BASEURL}/auth/register`,
    LOGIN: `${BASEURL}/auth/login`,
    GOOGLE_AUTH: `${BASEURL}/auth/google`,
    FORGET_PASSWORD: `${BASEURL}/auth/forget-password`,
    CHANGE_PASSWORD: `${BASEURL}/auth/change-password`,
    
    // Profile Management Endpoints
    PROFILE: `${BASEURL}/auth/profile`,
    // Notifications Endpoints
    NOTIFICATION_ALERTS: `${BASEURL}/auth/notification-alerts`,
    NOTIFICATION_ALERT_BY_ID: (id) => `${BASEURL}/auth/notification-alerts/${id}`,

    // FAQs Endpoints
    GET_ALL_FAQS: `${BASEURL}/faqs`,
    
    
}