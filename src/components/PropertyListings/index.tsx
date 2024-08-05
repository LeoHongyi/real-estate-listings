import React, { useEffect, useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyListItem } from '../PropertyListItem';
import { PropertyListingSkeleton } from '../PropertyListingSkeleton';
import { useAsyncError } from '../../hooks/useAsyncError';

export const PropertyListings: React.FC = () => {
  useAsyncError();
  const {
    fetchProperties,
    currentPage,
    totalPages,
    properties,
    loading: contextLoading,
  } = usePropertyContext();

  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      setLocalLoading(true);
      try {
        await fetchProperties(currentPage);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLocalLoading(false);
      }
    };

    loadProperties();
  }, [currentPage, fetchProperties]);

  const isLoading = contextLoading || localLoading;

  if (isLoading) {
    return <PropertyListingSkeleton />;
  }

  if (!properties || properties.length === 0) {
    return <div>No properties found.</div>;
  }

  return (
    <div className="property-listings">
      <h1>Property Listings</h1>
      {properties.map((property) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
      <div className="pagination">
        <button onClick={() => fetchProperties(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => fetchProperties(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
