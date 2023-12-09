import { Router } from "express";
import { addProductToCart, createCart, findCartById } from "../controllers/carts.controller.js";
import { checkRole } from "../middlewares/passport.middleware.js";

const router = Router();

router.get("/:idCart", findCartById);

// router.post("/", createCart);

router.post("/:idCart/products/:idProduct", checkRole('user'),  addProductToCart
    // res.redirect('/ticket');
);

export default router;
