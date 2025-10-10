import { Route, Routes } from 'react-router-dom'
import CarPage from '../pages/Car.pages'

const CarRoutes = () => {

  return (
      <Routes>
          <Route path='rides'>
              <Route path='' element={<CarPage />} />
          </Route>
         
      </Routes>
  )
}

export default CarRoutes