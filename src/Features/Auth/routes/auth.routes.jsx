import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/admin.login.pages'




const AuthRoutes = () => {

  return (
      <Routes>
          <Route path='admin/auth'>
              <Route path='' element={<AdminLoginPage />} />
          </Route>
      </Routes>
  )
}

export default AuthRoutes
