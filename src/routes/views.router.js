import { Router } from "express";

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
router.get("/home", (req, res) => {
  const { first_name, last_name, email } = req.session;
  res.render("home", { email, first_name, last_name });
});
export default router;
