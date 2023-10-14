import { Router } from "express";

const router = Router();

router.get('/createProduct', (req, res) => {
    res.render("createProduct")
})

router.get('/chat', (req, res) => {
    res.render("chat")
})

router.get('/carts', (req, res) => {
    res.render("carts")
})

export default router;
