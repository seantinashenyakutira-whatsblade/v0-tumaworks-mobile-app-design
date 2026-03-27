import { mockServices, ServiceCategory, ServiceItem } from './serviceData';

class ServiceService {
  // Replace with API call in production
  public async getAllServices({ page = 1, limit = 50 }: { page?: number, limit?: number } = {}): Promise<ServiceItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        resolve(mockServices.slice(start, start + limit));
      }, 100);
    });
  }

  // Replace with API call in production 
  public async getServicesByCategory(category: ServiceCategory, { page = 1, limit = 50 }: { page?: number, limit?: number } = {}): Promise<ServiceItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = category === 'All Services' 
          ? mockServices 
          : mockServices.filter(s => s.category === category);
        const start = (page - 1) * limit;
        resolve(filtered.slice(start, start + limit));
      }, 100);
    });
  }

  // Replace with API call in production
  public async searchServices(query: string, category: ServiceCategory, { page = 1, limit = 50 }: { page?: number, limit?: number } = {}): Promise<ServiceItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const filtered = mockServices.filter(s => {
          const matchCategory = category === 'All Services' || s.category === category;
          const matchQuery = s.name.toLowerCase().includes(lowerQuery) || 
                             s.shortDescription.toLowerCase().includes(lowerQuery) ||
                             s.tags.some(t => t.toLowerCase().includes(lowerQuery));
          return matchCategory && matchQuery;
        });
        const start = (page - 1) * limit;
        resolve(filtered.slice(start, start + limit));
      }, 150);
    });
  }

  // Replace with API call in production
  public async getPopularServices(limit: number = 10): Promise<ServiceItem[]> {
    return new Promise((resolve) => {
       const sorted = [...mockServices].sort((a, b) => ((b.rating || 0) * (b.reviews || 0)) - ((a.rating || 0) * (a.reviews || 0)));
       resolve(sorted.slice(0, limit));
    });
  }
}

export const serviceAPI = new ServiceService();
