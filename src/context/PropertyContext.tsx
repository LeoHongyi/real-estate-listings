import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { PropertyListingItem, PropertyDetails } from '../types';
import { usePropertyDetails, usePropertyListings } from '../hooks/usePropertyHooks';

interface PropertyContextType {
  listings: PropertyListingItem[] | null | undefined;
  listingsLoading: boolean;
  listingsError: Error | null;
  fetchListings: (forceRefresh?: boolean) => void;
  propertyDetails: PropertyDetails | null | undefined;
  detailsLoading: boolean;
  detailsError: Error | null;
  fetchPropertyDetails: (id: string, forceRefresh?: boolean) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    listings,
    isLoading: listingsLoading,
    error: listingsError,
    fetchListings,
  } = usePropertyListings();
  const {
    propertyDetails,
    isLoading: detailsLoading,
    error: detailsError,
    fetchPropertyDetails,
  } = usePropertyDetails();

  const fetchListingsWrapper = useCallback(
    (forceRefresh = false) => {
      fetchListings(forceRefresh);
    },
    [fetchListings],
  );

  const fetchPropertyDetailsWrapper = useCallback(
    (id: string, forceRefresh = false) => {
      fetchPropertyDetails(id, forceRefresh);
    },
    [fetchPropertyDetails],
  );

  return (
    <PropertyContext.Provider
      value={{
        listings,
        listingsLoading,
        listingsError,
        fetchListings: fetchListingsWrapper,
        propertyDetails,
        detailsLoading,
        detailsError,
        fetchPropertyDetails: fetchPropertyDetailsWrapper,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
