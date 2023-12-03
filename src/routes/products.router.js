import { Router } from "express";
import { productsMongo } from "../daos/products.mongo.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsMongo.findAllProducts(req.query);
    res.status(200).json({ message: "products", products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    category,
    price,
    thumbnail,
    status,
    stock,
  } = req.body;
  if (
    !title ||
    !description ||
    !code ||
    !category ||
    !price ||
    !thumbnail ||
    !status ||
    !stock
  ) {
    return res.status(400).json({ message: "All data is required" });
  }

  try {
    const createProduct = await productsMongo.createOne(req.body);
    res
      .status(200)
      .json({ message: "Product Created", product: createProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await productsMongo.findById(idProduct);
    res.status(200).json({ message: "Product", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await productsMongo.deleteOne(idProduct);
    res.status(200).json({ message: "deleted Product", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const body = req.body;
  try {
    const product = await productsMongo.updateOne(idProduct, body);
    res.status(200).json({ message: "update Product", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
