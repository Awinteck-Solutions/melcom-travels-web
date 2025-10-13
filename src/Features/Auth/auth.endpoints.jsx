import { BASEURL } from "../../constants/api.constant"


export const authEndpoints = {
    LOGIN: `${BASEURL}/auth/admin/login`,
    REGISTER: `${BASEURL}/auth/admin/register`,
    FORGOT_PASSWORD: `${BASEURL}/auth/admin/forgot-password`,
    VERIFY_OTP: `${BASEURL}/auth/admin/verify-otp`,
    RESET_PASSWORD: `${BASEURL}/auth/admin/reset-password`
}