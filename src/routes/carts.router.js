import { Router } from "express";
import { addProductToCart, createCart, findById, findCartById } from "../controllers/carts.controller.js";
import { checkRole } from "../middlewares/passport.middleware.js";

const router = Router();

router.get("/:idCart", findById);
router.get("/:idCart/view", findCartById);

router.post("/:idCart/products/:idProduct", checkRole('user'),  addProductToCart);

export default router;
