import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/admin.login.pages'
import LoginPage from '../pages/Login.pages'
import SignupPage from '../pages/Signup.pages'
import ProfilePage from '../pages/Profile.pages'
import BookingsPage from '../pages/Bookings.pages'
import FlightPreviewPage from '../pages/FlightPreview.pages'
import NotificationsPage from '../pages/Notifications.pages'
import FAQsPage from '../pages/FAQs.pages'
import ChangePasswordPage from '../pages/ChangePassword.pages'
import UpdateProfilePage from '../pages/UpdateProfile.pages'
import CheckoutPage from '../pages/Checkout.pages'




const AuthRoutes = () => {

  return (
      <Routes>
          <Route path='admin/auth'>
              <Route path='' element={<AdminLoginPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/bookings' element={<BookingsPage />} />
          <Route path='/booking/:bookingId' element={<FlightPreviewPage />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/update-profile' element={<UpdateProfilePage />} />
          <Route path='/change-password' element={<ChangePasswordPage />} />
          <Route path='/faqs' element={<FAQsPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>
  )
}

export default AuthRoutes
