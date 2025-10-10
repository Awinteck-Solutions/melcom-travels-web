import { Route, Routes } from 'react-router-dom'
import FlightPage from '../pages/Flight.pages'
import SearchPage from '../pages/Search.pages'

const FlightRoutes = () => {

  return (
      <Routes>
          <Route path='flights'>
              <Route path='' element={<FlightPage />} />
              <Route path='search' element={<SearchPage />} />
          </Route>
         
      </Routes>
  )
}

export default FlightRoutes