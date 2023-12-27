import { ErrorMessages } from "../error/error.enum.js";
import CustomError from "../error/not-found.error.js";
import { UserNotFoundError } from "../services/user-not-found.error.js";
import { usersService } from "../services/users.service.js";
import { logger } from "../winston.js";
import { verifyResetToken } from "../jwtToken.js";


export const findAllUsers = async (req, res) => {
	try {
		const result = await usersService.findAll();
		res.status(200).json({ users: result });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const findUserById = async (req, res, next) => {
	const { idUser } = req.params;
	try {
		const user = await usersService.findById(idUser);
		if (!user) {
			throw CustomError.createError(ErrorMessages.USER_NOT_FOUND);
		}
		res.status(200).json({ user: user });
	} catch (error) {
		next(error);
		// res.status(500).json({ message: error.message });
	}
};

export const createUser = async (req, res, next) => {
	const { first_name, last_name, email, password, full_name } = req.body;

	try {
		if (!first_name || !last_name || !email || !password) {
			throw CustomError.createError(ErrorMessages.DATA_INSUFFICIENT);
			// return res.status(400).json({ message: "All fields are required" });
		}

		const createdUser = await usersService.createOne(req.body);
		if (!createUser) {
			throw CustomError.createError(ErrorMessages.UNABLE_USER);
		}

		res.status(200).json({ message: "User created", user: createdUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const findByEmail = async (req, res) => {
	const { email } = req.params;
	try {
		const user = await usersService.findByEmail(email);
		res.status(200).json({ message: "User", user });
	} catch (error) {
		next(error);
		// res.status(500).json({ message: error.message });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.body;
	try {
		const user = await usersService.deleteOne(id);
		res.status(200).json({ message: "User delete", user });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateRole = async (req, res) => {
	try {
		const { uid } = req.params;

		const user = await usersService.findById(uid);

		if (user.role === "user") {
			await usersService.updateOne({
				id: uid,
				role: "userPremium",
			});
			res.status(400).send("Usuario actualizado a userPremium");
		}
		if (user.role === "userPremium") {
			await usersService.updateOne({
				id: uid,
				role: "user",
			});
			res.status(400).send("Usuario actualizado a user");
		} else {
			res.status(400).send("El usuario tiene un rol:", user.role);
			return;
		}
	} catch (error) {
		logger.error(error);
	}
};

export const updatePassword = async (req, res) => {
	try {
		const newPassword = req.body.password;
		const resetToken = req.params.token;
logger.info(resetToken, 'token')
		if (!resetToken) {
			return res.redirect("/");
		}

		const userToken = verifyResetToken(resetToken);

		const result = await usersService.updatePassword(newPassword, resetToken);
		res.send("Contraseña actualizada");
	} catch (error) {
		logger.error(error);
		// res.redirect("/");
	}
};
