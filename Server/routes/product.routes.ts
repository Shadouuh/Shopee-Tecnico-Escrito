import { Router } from "express";
import { getAllProducts } from "../controller/product.controller";

const router = Router();

router.get("/", getAllProducts);    

export default router