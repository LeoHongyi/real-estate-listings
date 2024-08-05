// import { useFetch } from './useFetch';
// import { PropertyListingItem, PropertyDetails } from '../types';
// import { PropertyRepository } from '../repository';

// export function usePropertyListings() {
//   const {
//     data: listings,
//     isLoading,
//     error,
//     execute,
//   } = useFetch<PropertyListingItem[]>('propertyListings');

//   const fetchListings = (forceRefresh = false) => {
//     execute(PropertyRepository.getListings(), forceRefresh);
//   };

//   return { listings, isLoading, error, fetchListings };
// }

// export function usePropertyDetails() {
//   const {
//     data: propertyDetails,
//     isLoading,
//     error,
//     execute,
//   } = useFetch<PropertyDetails>('propertyDetails');

//   const fetchPropertyDetails = (id: string, forceRefresh = false) => {
//     execute(PropertyRepository.getDetails(id), forceRefresh);
//   };

//   return { propertyDetails, isLoading, error, fetchPropertyDetails };
// }
