import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.post("/", async (req, res) => {
    const { title, description, code, category, price, thumbnail, status, stock } = req.body;
    if (!title || !description || !code || !category || !price || !thumbnail || !status || !stock) {
      return res.status(400).json({ message: "All data is required" });
    }
  
    try {
      const createProduct = await productsManager.createOne(req.body);
      res.status(200).json({ message: "Product Created", product: createProduct });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
