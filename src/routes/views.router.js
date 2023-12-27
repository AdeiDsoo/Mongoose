import { Router } from "express";
import { checkRole } from "../middlewares/passport.middleware.js";
import { productsService } from "../services/products.service.js";
import { updateCartAllProducts } from "../controllers/carts.controller.js";
import { logger } from "../winston.js";

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
	logger.http(req.user);
	logger.info("cart", req.user.cart._id);
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

router.get("/ticket", updateCartAllProducts);

router.get("/handlePassword", (req, res) => {
	res.render("handlePassword");
});
router.get("/resetPasswordForm", (req, res) => {
	res.render("resetPasswordForm");
});
export default router;
