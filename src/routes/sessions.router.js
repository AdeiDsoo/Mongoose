import passport from "passport";
import { Router } from "express";
import { checkRole } from "../middlewares/passport.middleware.js";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    req.session.user = req.user;
    console.log(req.session.user); 
    res.redirect("/home");
  }
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github",
  passport.authenticate("github", {
    failureRedirect: "/error",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/error",
  }),
  (req, res) => {
 
    if (req.user.role === "Admin") {
      res.redirect("/homeAdmin");
    }
    if (req.user.role === "user") {
      res.redirect("/home");
    } 
     if (req.user.role === "userPremium") {
				res.redirect("/homeAdmin");
			} else {
				res.redirect("/error");
			}
  }
);

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/home",
    failureRedirect: "/error",
  })
);
// router.post(
//   "/current",
//   passport.authenticate("signup", {
//     successRedirect: "/home",
//     failureRedirect: "/error",
//   })
// );

export default router;
