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

// router.get(":idUser", async (req, res)=>{
//   const {idUser}= req.params
//   try {
//     const user = await userManager.findById(idUser)
//     res.status(200).json({message: "User", user})
//   } catch (err) {
//     res.status(500).json({error:err.message})
//   }
// })

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




// router.get("/:email", async (req, res)=>{
//   const {email}= req.params
//   try {
//     const user = await userManager.findByEmail(email)
//     res.status(200).json({message: "User", user})
//   } catch (err) {
//     res.status(500).json({error:err.message})
//   }
// })



export default router;