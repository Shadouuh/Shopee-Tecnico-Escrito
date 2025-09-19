import { getAll } from "../services/product.service";
import { Response, Request } from "express";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    const Products = await getAll();
    res.json(Products);
}