import { Route, Routes } from 'react-router-dom'
import HotelPage from '../pages/Hotel.pages'

const HotelRoutes = () => {

  return (
      <Routes>
          <Route path='Hotels'>
              <Route path='' element={<HotelPage />} />
          </Route>
         
      </Routes>
  )
}

export default HotelRoutes