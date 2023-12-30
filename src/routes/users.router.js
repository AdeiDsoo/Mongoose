import { Router } from "express";
import {
	createUser,
	findAllUsers,
	findByEmail,
	findUserById,
	updatePassword,
	updateRole,
	forgotPassword
} from "../controllers/users.crontroller.js";
// import { hashData } from "../utils.js";
// import { usersMongo } from "../DAO's/memDAO/users.mongo.js";
// import { verifyResetToken } from "../jwtToken.js";
// import { usersService } from "../services/users.service.js";
// import { logger } from "../winston.js";
const router = Router();

router.get("/", findAllUsers);

router.get("/reset-password/:token", forgotPassword);

router.post("/reset-password/:token", updatePassword);

router.post("/", createUser);

router.get("/premium/:uid", updateRole);

export default router;
