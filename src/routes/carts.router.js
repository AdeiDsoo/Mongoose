import { Router } from "express";
import { addProductToCart, createCart, findCartById } from "../controllers/carts.controller.js";

const router = Router();

router.get("/:idCart", findCartById);

router.post("/", createCart);

router.post("/:idCart/products/:idProduct", addProductToCart);

export default router;
