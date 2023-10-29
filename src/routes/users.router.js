import { Router } from "express";
import { userManager } from "../managers/usersManager.js";
import { compareData, hashData } from "../utils.js";
import passport from "passport";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userManager.findAll();
    res.status(200).json({ message: "users", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//HELP POR ACÁ!! <-----------------------------------------------------------

// router.get("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/");
//   });
// });

//version para passport
router.get("/logout", (req, res) => {
  req.logout(); 
  res.redirect("/");
});


// <-----------------------------------------------------------

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/error",
  })
);

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/home",
    failureRedirect: "/error",
  })
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
  (req, res)=> {
    req.session.user=req.user;
    res.redirect("/home");
  }
);
export default router;
