import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './Features/trial/home.pages'
import AuthRoutes from './Features/Auth/routes/auth.routes'
import FlightRoutes from './Features/Main/Flight/routes/Flight.routes'
import HotelRoutes from './Features/Main/Hotel/routes/Hotel.routes'
import CarRoutes from './Features/Main/Car/routes/Car.routes'
import FlightPage from './Features/Main/Flight/pages/Flight.pages'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<FlightPage />} />
       
      </Routes>

      {/* <AuthRoutes /> */}
      <FlightRoutes />
      {/* <HotelRoutes />
      <CarRoutes /> */}

    </Router>
  )
}

export default App
