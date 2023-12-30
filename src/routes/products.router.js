import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  findAll,
  findAllProducts,
  findProductById,
  updateProduct,
} from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/passport.middleware.js";


const router = Router();

router.get("/", findAllProducts);

router.post("/", checkRole(["userPremium", "Admin"]), createProduct);

router.get("/:idProduct", findProductById);

router.delete("/:idProduct", checkRole(["userPremium", "Admin"]), deleteProduct);

router.put("/:idProduct",checkRole(["userPremium", "Admin"]), updateProduct);

export default router;
