import { Router } from "express";
import {
  createUser,
  findAllUsers,
  findByEmail,
  findUserById,
} from "../controllers/users.crontroller.js";
import { usersService } from "../services/users.service.js";

import { cartsMongo } from "../DAO's/memDAO/carts.mongo.js";
import { hashData } from "../utils.js";
import { usersMongo } from "../DAO's/memDAO/users.mongo.js";
import { verifyResetToken } from "../jwtToken.js";
const router = Router();

router.get("/", findAllUsers);

// router.get("/:email/password", async (req, res) => {
//  res.render("restorePassword");
// });

// router.post("/:email/password", async (req, res) => {
//   const { email } = req.params;
//   const newPassword = req.body.password; 


//     try {
    
//       const userDB = await usersMongo.findByEmail(email);
   
//       const hashedPassword = await hashData(newPassword);
//       const updateUser = await usersMongo.updateOne(userDB._id, {
//         ...userDB.toObject(),    password: hashedPassword,
//       });
//     res.send("Contraseña actualizada correctamente", updateUser); 
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error al actualizar la contraseña");
//   }
// });

router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const userToken = verifyResetToken(token);

  if (userToken && userToken.email) {
   
    res.render("resetPasswordForm", { token });
  } else {

    res.redirect("/forgot-password");
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const newPassword = req.body.password;
  const resetToken = req.params.token;

  if (!resetToken) {
    return res.redirect("/forgot-password");
  }

  const userToken = verifyResetToken(resetToken);

  if (userToken && userToken.email) {
   
    const email = userToken.email;
    const hashedPassword = await hashData(newPassword);
    const userDB = await usersMongo.findByEmail(email);
 
          const updateUser = await usersMongo.updateOne(userDB._id, {
            ...userDB.toObject(),    password: hashedPassword,
          });
        res.send("Contraseña actualizada correctamente"); 
  } else {
   
    res.redirect("/forgot-password");
  }
});


// router.get("/:email", findByEmail);

router.post("/", createUser);

export default router;
