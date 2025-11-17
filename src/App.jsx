import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './Features/trial/home.pages'
import FlightRoutes from './Features/Main/Flight/routes/Flight.routes'
import HotelRoutes from './Features/Main/Hotel/routes/Hotel.routes'
import CarRoutes from './Features/Main/Car/routes/Car.routes'
import ContactRoutes from './Features/Main/Contact/routes/Contact.routes'
import BlogRoutes from './Features/Main/Blog/routes/Blog.routes'
import FlightPage from './Features/Main/Flight/pages/Flight.pages'
import PageTransition from './components/animations/PageTransition'

// Import Auth components directly 
import LoginPage from './Features/Auth/pages/Login.pages'
import SignupPage from './Features/Auth/pages/Signup.pages'
import ProfilePage from './Features/Auth/pages/Profile.pages'
import BookingsPage from './Features/Auth/pages/Bookings.pages'
import FlightPreviewPage from './Features/Auth/pages/FlightPreview.pages'
import NotificationsPage from './Features/Auth/pages/Notifications.pages'
import FAQsPage from './Features/Auth/pages/FAQs.pages'
import ChangePasswordPage from './Features/Auth/pages/ChangePassword.pages'
import UpdateProfilePage from './Features/Auth/pages/UpdateProfile.pages'
import CheckoutPage from './Features/Auth/pages/Checkout.pages'
import BookingConfirmationPage from './Features/Auth/pages/BookingConfirmation.pages'
import TermsAndConditionsPage from './Features/Main/Contact/pages/TermsAndConditions.pages'
import PrivacyPolicyPage from './Features/Main/Contact/pages/PrivacyPolicy.pages'
import { ScrollAnimationDemo } from './components/animations'
import withScrollToTop from './components/withScrollToTop'
import { CheckPage } from './Features/Auth/pages/Check.pages'

// Component to handle page transitions
function AnimatedRoutes() {
  const location = useLocation();
  
  // Apply earth animation to ALL routes
  const useEarthAnimation = true;
  
  return (
    <PageTransition 
      location={location.pathname} 
      useEarthAnimation={useEarthAnimation}
    >
      <Routes location={location}>
        <Route path='/' element={withScrollToTop(FlightPage)()} />
        <Route path='/flights/*' element={<FlightRoutes />} />
        <Route path='/contact/*' element={<ContactRoutes />} />
        <Route path='/blogs/*' element={<BlogRoutes />} />
        <Route path='/hotels/*' element={<HotelRoutes />} />
        <Route path='/cars/*' element={<CarRoutes />} />
        
        {/* Auth Routes */} 
        <Route path='/login' element={withScrollToTop(LoginPage)()} />
        <Route path='/signup' element={withScrollToTop(SignupPage)()} />
        <Route path='/profile' element={withScrollToTop(ProfilePage)()} />
        <Route path='/bookings' element={withScrollToTop(BookingsPage)()} />
        <Route path='/booking/:bookingId' element={withScrollToTop(FlightPreviewPage)()} />
        <Route path='/notifications' element={withScrollToTop(NotificationsPage)()} />
        <Route path='/update-profile' element={withScrollToTop(UpdateProfilePage)()} />
        <Route path='/change-password' element={withScrollToTop(ChangePasswordPage)()} />
        <Route path='/faqs' element={withScrollToTop(FAQsPage)()} />
        <Route path='/terms' element={withScrollToTop(TermsAndConditionsPage)()} />
        <Route path='/privacy' element={withScrollToTop(PrivacyPolicyPage)()} />
        <Route path='/checkout' element={withScrollToTop(CheckoutPage)()} />
        {/* <Route path='/checkout' element={withScrollToTop(CheckPage)()} /> */}
        <Route path='/booking-confirmation' element={withScrollToTop(BookingConfirmationPage)()} />
        <Route path='/scroll-demo' element={withScrollToTop(ScrollAnimationDemo)()} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
