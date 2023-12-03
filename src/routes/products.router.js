import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  findAll,
  findAllProducts,
  findProductById,
  updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", findAllProducts);

router.post("/", createProduct);

router.get("/:idProduct", findProductById);

router.delete("/:idProduct", deleteProduct);

router.put("/:idProduct", updateProduct);

export default router;
