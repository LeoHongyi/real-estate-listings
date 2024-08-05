import { useEffect, useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { Link, useParams } from 'react-router-dom';
import { PropertyDetailsSkeleton } from '../PropertyDetailsSkeleton';
import { useAsyncError } from '../../hooks/useAsyncError';
import './index.css';

export const PropertyDetails: React.FC = () => {
  useAsyncError();
  const { id } = useParams<{ id: string }>();
  const { propertyDetails, propertyDetailsLoading, propertyDetailsError, fetchPropertyDetails } =
    usePropertyContext();

  useEffect(() => {
    if (id) {
      fetchPropertyDetails(parseInt(id, 10));
    }
  }, [id, fetchPropertyDetails]);

  if (!propertyDetails || propertyDetailsLoading) {
    return <PropertyDetailsSkeleton />;
  }

  if (propertyDetailsError) {
    return <div className="property-details error">Error: {propertyDetailsError?.message}</div>;
  }

  if (!propertyDetails) {
    return <div className="property-details">No property details available</div>;
  }

  return (
    <div className="property-details">
      <h1>{propertyDetails.propertyName}</h1>
      <p className="address">
        {propertyDetails.address.street}, {propertyDetails.address.city},{' '}
        {propertyDetails.address.state} {propertyDetails.address.zipCode}
      </p>
      <div className="info-grid">
        <p>
          Monthly Rent: <span>${propertyDetails.monthlyRent}</span>
        </p>
        <p>
          Status: <span>{propertyDetails.status}</span>
        </p>
        <p>
          Year Built: <span>{propertyDetails.propertyDetails?.yearBuilt}</span>
        </p>
        <p>
          Unit Types: <span>{propertyDetails.propertyDetails?.unitTypes.join(', ')}</span>
        </p>
      </div>
      <p className="amenities">
        Amenities: {propertyDetails.propertyDetails?.amenities.join(', ')}
      </p>
      <p className="pet-policy">Pet Policy: {propertyDetails.propertyDetails?.petPolicy}</p>
      <p className="description">Description: {propertyDetails.propertyDetails?.description}</p>
      <Link to="/" className="back-link">
        Back to listings
      </Link>
    </div>
  );
};
