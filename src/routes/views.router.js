import { Router } from "express";
import { checkRole } from "../middlewares/passport.middleware.js";
import { productsService } from "../services/products.service.js";
import { findCartById, updateCartProducts } from "../controllers/carts.controller.js";
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
  
  try {
    if (!req.user || !req.user.cart) {
      return res
        .status(401)
        .send("User not authenticated or user cart not found");
    }

    const idCart = req.user.cart._id;
    const cart = await cartsService.findById(idCart);

    if (!cart || !cart.productsCart) {
      return res.status(404).send("Cart or cart products not found");
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
          price:product.idProduct.price,
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

    const productsInsufficientInfo = ticketInfo.productsInsufficient.map((product) => ({
      idProduct: product.id,
      qty: product.qty,
    }));
   
    const idCartString = idCart.toString("hex");

    await updateCartProducts({ idCart: idCartString, productsCart: productsInsufficientInfo });

    res.render("ticket", {
      cart_id: req.user.cart._id,
      ticket: ticketInfo,
    });
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});
export default router;
