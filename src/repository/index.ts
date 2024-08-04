import { PropertyListingItem, PropertyDetails } from '../types';
import propertyList from '../data/propertyList.json';
import propertyDetails from '../data/propertyDetails.json';

const mockListings: PropertyListingItem[] = propertyList;
const mockDetails: PropertyDetails[] = propertyDetails;

export const PropertyRepository = {
  getListings: (): Promise<PropertyListingItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockListings), 500);
    });
  },

  getDetails: (id: string): Promise<PropertyDetails | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDetails.find((detail) => detail.id === Number(id))), 500);
    });
  },
};
