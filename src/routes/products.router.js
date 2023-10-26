import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.findAllProducts(req.query);
    res.status(200).json({ message: "products", products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
