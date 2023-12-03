import { productsService } from "../services/products.service.js";

export const findProducts = async (req, res) => {
  try {
    const result = await productsService.findAll();
    res.status(200).json({ products: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findProductById = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const result = await productsService.findById(idProduct);
    res.status(200).json({ message: "Product", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
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

  try {
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
    const createdProduct = await productsService.createOne(req.body);
    res
      .status(200)
      .json({ message: "Product Created", product: createdProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await productsService.deleteOne(idProduct);
    res.status(200).json({ message: "deleted Product", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { idProduct } = req.params;
  const body = req.body;
  try {
    const product = await productsService.updateOne(idProduct, body);
    res.status(200).json({ message: "update Product", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
