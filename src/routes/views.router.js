import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get("/createProduct", (req, res) => {
  res.render("createProduct");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/carts", (req, res) => {
  res.render("carts");
});

router.get("/all", (req, res) => {
  res.render("products");
});
router.get("/products", async (req, res) => {
  const products = await productsManager.findAllSimpleProducts();
  res.render("all", { products });
});

router.get("/oneProduct/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const productInfo = await productsManager.findById(idProduct);
  const { price, title, description, category, _id } =
    productInfo;
  res.render("oneProduct", {
    price,
    title,
    description,
    category,
    _id
  });
});

export default router;
