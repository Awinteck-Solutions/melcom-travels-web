import { Route, Routes } from 'react-router-dom';
import ContactPage from '../pages/Contact.pages';

const ContactRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ContactPage />} />
    </Routes>
  );
};

export default ContactRoutes;
