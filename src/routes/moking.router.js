import { Router } from "express";
import { mockProducts } from "../mocks/products.mock.js";

const router = Router();

router.get("/mockproducts", (req, res) => {
    const products = mockProducts(100);
    res.json(products);
  });
export default router;
