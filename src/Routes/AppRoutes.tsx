import { Routes, Route } from 'react-router-dom';
import { PropertyDetails } from '../components/PropertyDetails';
import { PropertyListings } from '../components/PropertyListings';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyListings />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
};

export default AppRoutes;
