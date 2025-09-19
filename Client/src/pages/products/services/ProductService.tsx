export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export interface Product extends ApiProduct {
  rating: number;
  reviews: number;
  stock: number;
}

class ProductService {
  private baseUrl = 'http://localhost:3000/api';

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP Porque: ${response.status}`);
      }
      
      const apiProducts: ApiProduct[] = await response.json();
      
      const enrichedProducts: Product[] = apiProducts.map(product => ({
        ...product,
        rating: this.generateRating(),
        reviews: this.generateReviews(),
        stock: this.generateStock()
      }));
      
      return enrichedProducts;
    } catch (error) {
      console.error('Error en Fetch:', error);
      throw new Error('NO hizo fetch');
    }
  }

  private generateRating(): number {
    return Math.round((Math.random() * 2 + 3) * 10) / 10;
  }

  private generateReviews(): number {
    return Math.floor(Math.random() * 950) + 50;
  }

  private generateStock(): number {
    return Math.floor(Math.random() * 50) + 1;
  }
}

export const productService = new ProductService();