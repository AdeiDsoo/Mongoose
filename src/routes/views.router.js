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
  res.render("home", {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
  });
});

router.get("/error", (req, res)=>{
  res.render("error")
})
export default router;
