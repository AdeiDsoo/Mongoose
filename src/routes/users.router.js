import { Router } from "express";
import { createUser, findAllUsers, findByEmail, findUserById } from "../controllers/users.crontroller.js";
// import { compareData, hashData } from "../utils.js";
import passport from "passport";

const router = Router();

router.get("/", findAllUsers);

router.get("/:idUser", findUserById)

// router.get("/:email", findByEmail)

router.post("/", createUser)


// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/"); 
//   });
// });

// <-----------------------------------------------------------

// router.post(
//   "/login",
//   passport.authenticate("login", {
//     successRedirect: "/home",
//     failureRedirect: "/error",
//   })
// );

// router.post(
//   "/signup",
//   passport.authenticate("signup", {
//     successRedirect: "/home",
//     failureRedirect: "/error",
//   })
// );








export default router;