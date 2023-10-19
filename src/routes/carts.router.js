import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.post("/", async (req, res) => {
  const { idProduct, qty } = req.body;
  console.log(req.body);
  if (!idProduct || !qty) {
    return res.status(400).json({ message: "idProduct or qty are required" });
  }

  const obj = {
    productsCart: [
      {
        idProduct,
        qty,
      },
    ],
  };

  try {
    const createCart = await cartsManager.createOne(obj);
    res.status(200).json({ message: "Cart Created", cart: createCart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {

  try {
    const carts = await cartsManager.findAllCarts(req.query);
    res.status(200).json({ message: "Carts", carts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/allCarts", async (req, res) => {
  try {
    const carts = await cartsManager.findAllSimple();
    res.status(200).json({ message: "Carts", carts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsManager.updateOne(
      { _id: idCart },
      { $set: { productsCart: [] } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Deleted Products from Cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;

  try {
    const result = await cartsManager.updateOne(
      { _id: idCart },
      { $pull: { productsCart: { idProduct: idProduct } } }
    );

    if (result.nModified === 0) {
      res.status(404).json({ message: "No found idCart o idProduct" });
    } else {
      res.json({ message: "deleted product", result });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cartInfo = await cartsManager.findInfoProducts(idCart);
    // res.status(200).json({ message: "Cart", cart });
    res.render("thisCart", { cartInfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const body = req.body;
  try {
    const cart = await cartsManager.updateOne(idCart, body);
    res.status(200).json({ message: "update Cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  const cleanedProductId = idProduct.trim();
  const { qty } = req.body;
  try {
    const cart = await cartsManager.findInfoProducts(idCart);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const productFound = cart.productsCart.some((p) => {
      const cleanedCartProductId = p.idProduct._id.toString().trim();
      const isMatching = cleanedCartProductId === cleanedProductId;
      return isMatching;
    });
    if (!productFound) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    const productIndex = cart.productsCart.findIndex((p) => {
      if (!p.idProduct) return false;
      const cleanedCartProductId = p.idProduct._id.toString().trim();
      return cleanedCartProductId === cleanedProductId;
    });

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    const updateField = `productsCart.${productIndex}.qty`;
    const updateResult = await cartsManager.updateOne(
      { _id: idCart },
      { $set: { [updateField]: qty } },
      { new: true }
    );

    if (!updateResult) {
      return res
        .status(500)
        .json({ error: "Failed to update product quantity in cart" });
    }

    res.status(200).json({
      message: "Updated Product Quantity in Cart",
      cart: updateResult,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
