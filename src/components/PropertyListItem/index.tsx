import { Link } from 'react-router-dom';
import { PropertyListingItem } from '../../types';
import './index.css';

interface PropertyListItemProps {
  property: PropertyListingItem;
}

export const PropertyListItem: React.FC<PropertyListItemProps> = ({ property }) => {
  return (
    <div className="property-list-item">
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
