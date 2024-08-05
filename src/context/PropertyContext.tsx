import React, { createContext, useState, useContext, useCallback, useRef } from 'react';
import { Property, PaginatedResult } from '../types';
import { PropertyDatabase } from '../repository';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  fetchProperties: (page?: number) => Promise<void>;
  propertyDetails: Property | null;
  propertyDetailsLoading: boolean;
  propertyDetailsError: Error | null;
  fetchPropertyDetails: (id: number) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);

  const [propertyDetails, setPropertyDetails] = useState<Property | null>(null);
  const [propertyDetailsLoading, setPropertyDetailsLoading] = useState(false);
  const [propertyDetailsError, setPropertyDetailsError] = useState<Error | null>(null);

  const propertyDatabase = new PropertyDatabase();

  const propertiesCache = useRef<Record<number, Property[]>>({});
  const propertyDetailsCache = useRef<Record<number, Property>>({}); // Cache property details by ID

  const fetchProperties = useCallback(
    async (page: number = 1) => {
      if (propertiesCache.current[page]) {
        setProperties(propertiesCache.current[page]);
        setCurrentPage(page);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result: PaginatedResult<Property> = await propertyDatabase.getPropertiesPaginated(
          page,
          pageSize,
        );
        setProperties(result.data);
        setTotalPages(result.totalPages);
        setCurrentPage(result.page);
        propertiesCache.current[page] = result.data;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An error occurred while fetching properties'),
        );
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  const fetchPropertyDetails = useCallback(async (id: number) => {
    if (propertyDetailsCache.current[id]) {
      setPropertyDetails(propertyDetailsCache.current[id]);
      return;
    }
    setPropertyDetailsLoading(true);
    setPropertyDetailsError(null);
    try {
      const details = await propertyDatabase.getDetailsById(id);
      setPropertyDetails(details);
      propertyDetailsCache.current[id] = details;
    } catch (error) {
      setPropertyDetailsError(error instanceof Error ? error : new Error('An error occurred'));
    } finally {
      setPropertyDetailsLoading(false);
    }
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        totalPages,
        currentPage,
        pageSize,
        fetchProperties,
        propertyDetails,
        propertyDetailsLoading,
        propertyDetailsError,
        fetchPropertyDetails,
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
