import axios from "axios";
import { Product } from "../interfaces/product";

const API_URL = "https://dummyjson.com/products?limit=100&skip=0"; 

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    const { data } = await axios.get(API_URL); 
    const products: Product[] = data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      images: p.images,
      category: {
        id: p.category?.id,
        name: p.category?.name,
        image: p.category?.image,
      },
    }));
    return products;
  }
}
