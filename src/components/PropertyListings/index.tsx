import { useEffect } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyListItem } from '../PropertyListItem';
import { PropertyListingSkeleton } from '../PropertyListingSkeleton';
import { useAsyncError } from '../../hooks/useAsyncError';

export const PropertyListings: React.FC = () => {
  useAsyncError();
  const { listings, listingsLoading, listingsError, fetchListings } = usePropertyContext();

  useEffect(() => {
    fetchListings();
  }, []);

  if (listingsLoading) {
    return <PropertyListingSkeleton />;
  }

  if (listingsError) {
    return <div>Error: {listingsError.message}</div>;
  }
  return (
    <div className="property-listings">
      <h1>Property Listings</h1>
      {listings?.map((property) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
    </div>
  );
};
