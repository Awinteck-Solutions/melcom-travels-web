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
import { ScrollAnimationDemo } from './components/animations'

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
        <Route path='/' element={<FlightPage />} />
        <Route path='/flights/*' element={<FlightRoutes />} />
        <Route path='/contact/*' element={<ContactRoutes />} />
        <Route path='/blogs/*' element={<BlogRoutes />} />
        <Route path='/hotels/*' element={<HotelRoutes />} />
        <Route path='/cars/*' element={<CarRoutes />} />
        
        {/* Auth Routes */} 
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/bookings' element={<BookingsPage />} />
        <Route path='/booking/:bookingId' element={<FlightPreviewPage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/update-profile' element={<UpdateProfilePage />} />
        <Route path='/change-password' element={<ChangePasswordPage />} />
        <Route path='/faqs' element={<FAQsPage />} />
        <Route path='/checkout' element={<CheckoutPage key="checkout" />} />
        <Route path='/scroll-demo' element={<ScrollAnimationDemo />} />
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
