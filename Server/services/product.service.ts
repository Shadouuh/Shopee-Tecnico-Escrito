import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../interfaces/product";

export const getAll = async (): Promise<Product[]> => {
    const productRepository = new ProductRepository();
    return productRepository.getAll();
}
