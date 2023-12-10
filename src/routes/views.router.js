import { Router } from "express";
import { checkRole } from "../middlewares/passport.middleware.js";
import { productsService } from "../services/products.service.js";
import { findCartById } from "../controllers/carts.controller.js";
import { cartsService } from "../services/carts.service.js";
import { ticketsService } from "../services/tickets.service.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/home", checkRole("user"), (req, res) => {
  console.log(req.user);
  console.log("cart", req.user.cart._id);
  res.render("home", {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    cart: req.user.cart._id,
  });
});

router.get("/error", (req, res) => {
  res.render("error");
});

router.get("/google", (req, res) => {
  res.render("google");
});
router.get("/createProduct", checkRole("admin"), (req, res) => {
  res.render("createProduct");
});
router.get("/homeAdmin", checkRole("admin"), (req, res) => {
  res.render("homeAdmin");
});

router.get("/chat", checkRole("user"), (req, res) => {
  res.render("chat");
});

router.get("/oneProduct/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const productInfo = await productsService.findById(idProduct);
  const { price, title, description, category, _id } = productInfo;

  res.render("oneProduct", {
    price,
    title,
    description,
    category,
    _id,
    cart_id: req.user.cart._id,
    email: req.user.email,
  });
});



router.get("/ticket", async (req, res) => {
  
  const idCart = req.user.cart._id;
  const cart = await cartsService.findById(idCart);

  let productsCart = cart.productsCart;

  let totalAmount = 0;
  let ticketInfo; 

  for (const product of productsCart) {
    const stock = product.idProduct.stock;
    const qty = product.qty;
  
console.log(stock, product.idProduct.title);
    if (qty > stock) {
      console.log(
        product.idProduct.title,
        "este producto no tiene suficiente stock"
      );
    }

    if (qty < stock) {
      console.log(
        product.idProduct.title,
        "este producto sí tiene suficiente stock :D"
      );
      let id = product.idProduct._id;
      let qtyProductDB = product.idProduct.stock;
      let price = product.idProduct.price;

      const productUpdate = await productsService.updateOne({
        id,
        stock: qtyProductDB - product.qty,
      });

      const subtotal = qty * price;
      totalAmount += subtotal;

      const uniqueCode = uuidv4();
     
      ticketInfo = { 
        code: uniqueCode,
        amount: totalAmount,
        purchaser: req.user.email,
        products: JSON.parse(JSON.stringify(cart.productsCart)),
      };

      const createdTicket = await ticketsService.createOne(ticketInfo);

      cart.productsCart = cart.productsCart.filter(
        (p) => p.idProduct._id !== id
      );
    }

    await cartsService.updateOne({
      id: idCart,
      productsCart: cart.productsCart,
    });
  }

  res.render("ticket", {
    cart_id: req.user.cart._id,
    ticket: ticketInfo,
    productsCart
  });
});

export default router;
