import { PaginatedResult, Property } from '../types';
import propertyDetails from '../data/propertyDetails.json';

export class PropertyDatabase {
  private properties: Property[] = propertyDetails;
  private nextId: number = 1;
  getAllProperties(): Promise<Property[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.properties.filter((it) => !it.del)), 500);
    });
  }

  getDetailsById(id: number): Promise<Property> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const property = this.properties.find((p) => p.id === id);
        if (property) {
          resolve(property);
        } else {
          reject(new Error(`Property with ID ${id} not found`));
        }
      }, 500);
    });
  }

  addProperty(property: Omit<Property, 'id'>): Property {
    const newProperty = { ...property, id: this.nextId++ };
    this.properties.push(newProperty);
    return newProperty;
  }

  updateProperty(id: number, updatedProperty: Partial<Property>): Property | null {
    const index = this.properties.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.properties[index] = { ...this.properties[index], ...updatedProperty };
      return this.properties[index];
    }
    return null;
  }

  deleteProperty(id: number): boolean {
    const initialLength = this.properties.length;
    this.properties = this.properties.map((p) => (p.id === id ? { ...p, del: true } : p));
    return this.properties.length < initialLength;
  }

  getPropertiesPaginated(page: number, pageSize: number): Promise<PaginatedResult<Property>> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = this.properties.slice(startIndex, endIndex);
    const totalProperties = this.properties.length;
    const totalPages = Math.ceil(totalProperties / pageSize);

    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ data: paginatedData, total: totalProperties, page, pageSize, totalPages }),
        500,
      );
    });
  }
}
