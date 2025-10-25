import { Route, Routes } from 'react-router-dom'
import FlightPage from '../pages/Flight.pages'
import SearchPage from '../pages/Search.pages'
import withScrollToTop from '../../../../components/withScrollToTop'

const FlightRoutes = () => {

  return (
      <Routes>
          <Route path='' element={withScrollToTop(FlightPage)()} />
          <Route path='search' element={withScrollToTop(SearchPage)()} />
      </Routes>
  )
}

export default FlightRoutes