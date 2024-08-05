import { Link, useNavigate } from 'react-router-dom';
import { Property } from '../../types';
import './index.css';

interface PropertyListItemProps {
  property: Property;
}

export const PropertyListItem: React.FC<PropertyListItemProps> = ({ property }) => {
  const navigate = useNavigate();
  return (
    <div
      className="property-list-item"
      onClick={() => {
        navigate(`/property/${property.id}`);
      }}
    >
      <h2>{property.propertyName}</h2>
      <p>
        {property.address.street}, {property.address.city}, {property.address.state}{' '}
        {property.address.zipCode}
      </p>
      <p className="rent">Monthly Rent: ${property.monthlyRent}</p>
      <p className={`status ${property.status.toLowerCase()}`}>Status: {property.status}</p>
      <Link to={`/property/${property.id}`}>View Details</Link>
    </div>
  );
};
