import { useEffect, useState, useCallback } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { Link, useParams } from 'react-router-dom';
import { PropertyDetailsSkeleton } from '../PropertyDetailsSkeleton';
import { useAsyncError } from '../../hooks/useAsyncError';
import './index.css';

export const PropertyDetails: React.FC = () => {
  useAsyncError();
  const { id } = useParams<{ id: string }>();
  const { detailsLoading, detailsError, propertyDetails, fetchPropertyDetails } =
    usePropertyContext();
  const [localDetails, setLocalDetails] = useState(propertyDetails);

  const fetchDetails = useCallback(() => {
    if (id) {
      fetchPropertyDetails(id);
    }
  }, [id, fetchPropertyDetails]);

  useEffect(() => {
    if (!propertyDetails && id) {
      fetchDetails();
    } else {
      setLocalDetails(propertyDetails);
    }
  }, [id, propertyDetails, fetchDetails]);

  if (detailsLoading && !localDetails) {
    return <PropertyDetailsSkeleton />;
  }

  if (detailsError) {
    return <div className="property-details error">Error: {detailsError.message}</div>;
  }

  if (!localDetails) {
    return <div className="property-details not-found">No property details found.</div>;
  }

  return (
    <div className="property-details">
      <h1>{localDetails.propertyName}</h1>
      <p className="address">
        {localDetails.address.street}, {localDetails.address.city}, {localDetails.address.state}{' '}
        {localDetails.address.zipCode}
      </p>
      <div className="info-grid">
        <p>
          Monthly Rent: <span>${localDetails.monthlyRent}</span>
        </p>
        <p>
          Status: <span>{localDetails.status}</span>
        </p>
        <p>
          Year Built: <span>{localDetails.propertyDetails.yearBuilt}</span>
        </p>
        <p>
          Unit Types: <span>{localDetails.propertyDetails.unitTypes.join(', ')}</span>
        </p>
      </div>
      <p className="amenities">Amenities: {localDetails.propertyDetails.amenities.join(', ')}</p>
      <p className="pet-policy">Pet Policy: {localDetails.propertyDetails.petPolicy}</p>
      <p className="description">Description: {localDetails.propertyDetails.description}</p>
      <Link to="/" className="back-link">
        Back to listings
      </Link>
    </div>
  );
};
