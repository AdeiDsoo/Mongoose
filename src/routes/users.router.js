import { Router } from "express";
import {
	createUser,
	findAllUsers,
	findByEmail,
	findUserById,
	updatePassword,
	updateRole,
} from "../controllers/users.crontroller.js";
import { hashData } from "../utils.js";
import { usersMongo } from "../DAO's/memDAO/users.mongo.js";
import { verifyResetToken } from "../jwtToken.js";
import { usersService } from "../services/users.service.js";
import { logger } from "../winston.js";
const router = Router();

router.get("/", findAllUsers);

router.get("/reset-password/:token", (req, res) => {
	const { token } = req.params;
	const userToken = verifyResetToken(token);

	if (userToken && userToken.email) {
		res.render("resetPasswordForm", { token });
	} else {
		res.redirect("/forgot-password");
	}
});

router.post("/reset-password/:token", 
// async (req, res) => {
// 	const newPassword = req.body.password;
// 	const resetToken = req.params.token;

// 	if (!resetToken) {
// 		return res.redirect("/forgot-password");
// 	}

// 	const userToken = verifyResetToken(resetToken);

// 	if (userToken && userToken.email) {
// 		const email = userToken.email;
// 		const hashedPassword = await hashData(newPassword);
// 		const userDB = await usersMongo.findByEmail(email);

// 		const updateUser = await usersMongo.updateOne(userDB._id, {
// 			...userDB.toObject(),
// 			password: hashedPassword,
// 		});
// 		res.send("Contraseña actualizada correctamente");
// 	} else {
// 		res.redirect("/forgot-password");
// 	}
// }
updatePassword);



router.post("/", createUser);

router.get("/premium/:uid", updateRole);

export default router;
