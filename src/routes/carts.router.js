import { cartsMongo } from "../daos/carts.mongo.js";
import { Router } from "express";
import { productsMongo } from "../daos/products.mongo.js";

const router = Router();

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsMongo.findById(idCart);

    res.status(200).json({ message: "Cart Found", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  
  try {
    const newCart = { products: [] };

    const createCart = await cartsMongo.createOne(newCart);
    res.status(200).json({ message: "Cart created", cart: createCart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:idCart/products/:idProduct", async (req, res) => {
  const { idProduct, idCart } = req.params;
  try {
    const cart = await cartsMongo.findById(idCart);
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    const product = await productsMongo.findById(idProduct);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    //ver si existe el producto dentro del carro
    const productIndex = cart.productsCart.findIndex((p) =>
      p.idProduct.equals(idProduct)
    );

    if (productIndex === -1) {
      cart.productsCart.push({ idProduct: idProduct, qty: 1 });
    } else {
      cart.productsCart[productIndex].qty++;
    }

await cart.save()
res.status(200).json({message:"product added" })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
