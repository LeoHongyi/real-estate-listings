// types.ts
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

export interface PropertyListingItem {
  id: number;
  propertyName: string;
  address: Address;
  numberOfUnits: number;
  propertyManager: PropertyManager;
  monthlyRent: number;
  status: string;
}

export interface PropertyDetails extends PropertyListingItem {
  propertyDetails: {
    yearBuilt: number;
    unitTypes: string[];
    amenities: string[];
    petPolicy: string;
    description: string;
  };
}
