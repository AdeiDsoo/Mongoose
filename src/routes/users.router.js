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

router.get(":idUser", async (req, res)=>{
  const {idUser}= req.params
  try {
    const user = await userManager.findById(idUser)
    res.status(200).json({message: "User", user})
  } catch (error) {
    res.status(500).json({error:err.message})
  }
})

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/"); 
  });
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
