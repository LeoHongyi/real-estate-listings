export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PropertyManager {
  name: string;
  contact: string;
}

export interface PropertyDetails {
  yearBuilt: number;
  unitTypes: string[];
  amenities: string[];
  petPolicy: string;
  description: string;
}

export interface Property {
  id: number;
  propertyName: string;
  address: Address;
  numberOfUnits: number;
  propertyManager: PropertyManager;
  monthlyRent: number;
  status: string;
  propertyDetails: PropertyDetails;
  del?: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
