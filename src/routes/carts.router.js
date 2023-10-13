import { Router } from "express";
import {cartsManager} from "../managers/cartsManager.js"

const router = Router();

router.post("/", async (req, res) => {
    const { idProduct, qty, total } = req.body;
    if (!idProduct || !qty || !total ) {
      return res.status(400).json({ message: "All data is required" });
    }
  
    try {
      const createCart = await cartsManager.createOne(req.body);
      res.status(200).json({ message: "Cart Created", product: createCart });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
