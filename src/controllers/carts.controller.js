import { cartsService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";
import { v4 as uuidv4 } from "uuid";
import CustomError from "../error/not-found.error.js";
import { ErrorMessages } from "../error/error.enum.js";
import mongoose from "mongoose";

export const findCart = async (req, res) => {
  try {
    const result = await cartsService.findAll();
    res.status(200).json({ carts: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateThisCart = async (req, res) => {
  try {
    const result = await cartsService.updateThisCart();
    res.status(200).json({ cart: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findById = async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsService.findById(idCart);
    res.status(200).json({ message: "this Cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findCartById = async (req, res, next) => {
  const { idCart } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(idCart)) {
      throw CustomError.createError(ErrorMessages.ID_INVALID);
    }
    const cart = await cartsService.findById(idCart);
    if (!cart) {
      throw  CustomError.createError(ErrorMessages.CART_NOT_FOUND);
    }

    const infoThisCart = {
      idCart: req.user.cart._id,
      email: req.user.email,
      products: JSON.parse(JSON.stringify(cart.productsCart)),
    };

    res.render("thisCart", { infoThisCart });
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const newCart = { products: [] };
    const createdCart = await cartsService.createOne(newCart);
    if (!createdCart) {
      throw  CustomError.createError(ErrorMessages.UNABLE_CART);
    }

    res.status(200).json({ message: "Cart created", cart: createdCart });
  } catch (error) {
    next(error);
    
  }
};

export const addProductToCart = async (req, res, next) => {
  const { idProduct, idCart } = req.params;
  const qtyClientProduct = parseInt(req.body.qty, 10);
  try {
    const cart = await cartsService.findById(idCart);
    if (!cart) {
      throw CustomError.createError(ErrorMessages.CART_NOT_FOUND);
      // return res.status(404).json({ message: "cart not found" });
    }
    const product = await cartsService.productFindById(idProduct);
    if (!product) {
      throw new CustomError.createError(ErrorMessages.PRODUCT_NOT_FOUND);
      // return res.status(404).json({ message: "product not found" });
    }

    if (req.user.cart.id === idCart) {
      const productIndex = cart.productsCart.findIndex((p) =>
        p.idProduct.equals(idProduct)
      );

      if (productIndex === -1) {
        cart.productsCart.push({ idProduct: idProduct, qty: qtyClientProduct });
      } else {
        cart.productsCart[productIndex].qty += qtyClientProduct;
      }

      await cart.save();
    }

    res.status(200).json({ message: "product added" });
  } catch (error) {
    next(error);
    // console.error(error);
    // res.status(500).json({ message: error.message });
  }
};

export const updateCartAllProducts = async (req, res, next) => {
  try {
    if (!req.user || !req.user.cart) {
      return res
        .status(401)
        .send("User not authenticated or user cart not found");
    }

    const idCart = req.user.cart._id;
    const cart = await cartsService.findById(idCart);

    if (!cart || !cart.productsCart) {
      throw CustomError.createError(ErrorMessages.CART_NOT_FOUND)
      // return res.status(404).send("Cart or cart products not found");
    }

    let totalAmount = 0;

    let ticketInfo = {
      code: uuidv4(),
      amount: 0,
      purchaser: req.user.email,
      productsInsufficient: [],
      productsSufficient: [],
    };

    for (let product of cart.productsCart) {
      const stock = product.idProduct.stock;
      const qty = product.qty;

      if (qty < stock) {
        let id = product.idProduct._id;

        let qtyProductDB = product.idProduct.stock;

        let price = product.idProduct.price;

        const productUpdate = await productsService.updateOne({
          id,

          stock: qtyProductDB - qty,
        });

        const subtotal = qty * price;

        totalAmount += subtotal;

        ticketInfo.productsSufficient.push({
          id,
          title: product.idProduct.title,
          price: product.idProduct.price,
          qty,
          subtotal,
        });
      } else {
        ticketInfo.productsInsufficient.push({
          id: product.idProduct._id,
          price: product.idProduct.price,
          title: product.idProduct.title,
          qty: product.qty,
        });
      }
    }

    if (
      !ticketInfo.productsInsufficient ||
      !Array.isArray(ticketInfo.productsInsufficient)
    ) {
      return res
        .status(500)
        .send("Unexpected error: productsInsufficient is not an array");
    }
    ticketInfo.amount = totalAmount;

    const productsInsufficientInfo = ticketInfo.productsInsufficient.map(
      (product) => ({
        idProduct: product.id,
        qty: product.qty,
      })
    );

    const idCartString = idCart.toString("hex");

  
    await cartsService.updateCartProducts(
      idCartString,
      productsInsufficientInfo
    );
    res.render("ticket", {
      cart_id: req.user.cart._id,
      ticket: ticketInfo,
    });
  } catch (error) {
    next(error);
    // console.error(error);
    // res.status(500).send("An error occurred");
  }
};
