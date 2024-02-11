import { ErrorMessages } from "../error/error.enum.js";
import CustomError from "../error/not-found.error.js";
import { usersService } from "../services/users.service.js";
import { logger } from "../utils/winston.js";
import { verifyResetToken } from "../utils/jwtToken.js";
import { transporter } from "../utils/nodemailer.js";

export const deleteInactiveUsers = async (req, res, next) => {
	try {
		const inactiveUsers = await getInactiveUsers();
		const options = {
			from: "dsoocg@gmail.com",
			subject: "Tu cuenta ha sido eliminada",
			html: `<h1>TU CUENTA HA SIDO ELIMINADA</h1>
         		   <p>Por inactividad mayor a dos días tu cuenta ha sido eliminada</p>`,
		};

		for (const user of inactiveUsers) {
				const optionsWithRecipient = { ...options, to: [user.email] };
				await transporter.sendMail(optionsWithRecipient);
				await usersService.deleteOne(user._id)
			}

			console.log('usuarios eliminados');
		res.send("Se han enviado los correos notificando su baja");

	} catch (error) {
		console.error("Error al enviar correos electrónicos:", error);
		next(error);
	}
};

export const twoDaysUsers = async (req, res, next) => {
	try {
		const result = await getInactiveUsers();

		res.status(200).json({ users: result });
	} catch (error) {
		next(error);
	}
};

export const getInactiveUsers = async () => {
	const result = await usersService.findAll();
	const twoDaysAgo = new Date();
	twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

	return result.filter((user) => {
		const lastConnection = new Date(user.last_connection);
		return lastConnection < twoDaysAgo;
	});
};
export const findAllUsers = async (req, res) => {
	try {
		const result = await usersService.findAll();

		const simpleUsers = result.map((user) => ({
			email: user.email,
			role: user.role,
			name: user.last_name
				? `${user.first_name} ${user.last_name}`
				: user.first_name,
		}));

		res.status(200).json({ users: simpleUsers });
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
	}
};

export const createUser = async (req, res, next) => {
	const { first_name, last_name, email, password, full_name } = req.body;

	try {
		if (!first_name || !last_name || !email || !password) {
			throw CustomError.createError(ErrorMessages.DATA_INSUFFICIENT);
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

export const deleteUserEmail = async (req, res) => {
	const { email } = req.params;
	try {
		const user = await usersService.findByEmail(email);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const deleteUser = await usersService.deleteOne(user._id);

		res.status(200).json({ message: "User delete", deleteUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateRole = async (req, res) => {
	try {
		const { uid } = req.params;

		const user = await usersService.findById(uid);

		if (user.role === "user") {
			const userDocuments = user.documents;

			const requiredDocuments = userDocuments.every((document) =>
				["identification", "proofAdress", "proofBank"].includes(document.name)
			);

			if (requiredDocuments) {
				await usersService.updateOne({
					id: uid,
					role: "userPremium",
				});
				res.status(200).send("Usuario actualizado a userPremium");
			} else {
				res
					.status(400)
					.send("El usuario no tiene todos los documentos requeridos");
			}
		} else if (user.role === "userPremium") {
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
		logger.info(resetToken, "token");
		if (!resetToken) {
			return res.redirect("/");
		}
		const userToken = verifyResetToken(resetToken);
		const result = await usersService.updatePassword(newPassword, resetToken);
		res.send("Contraseña actualizada");
	} catch (error) {
		logger.error(error);
	}
};

export const forgotPassword = (req, res) => {
	const { token } = req.params;
	const userToken = verifyResetToken(token);

	if (userToken && userToken.email) {
		res.render("resetPasswordForm", { token });
	} else {
		res.redirect("/forgot-password");
	}
};

export const lastConnection = async (req, res) => {
	try {
		const logoutTime = new Date();
		const handleLastConnection = await usersService.updateOne({
			id: req.user._id,
			last_connection: logoutTime,
		});
	} catch (error) {
		logger.error(error);
	}
};

export const uploadDocuments = async (req, res) => {
	try {
		const { idUser } = req.params;
		const fieldOrder = ["identification", "proofAdress", "proofBank"];
		const missingFields = fieldOrder.filter(
			(fieldName) => !req.files[fieldName]
		);

		if (missingFields.length > 0) {
			return res.status(400).json({
				status: "error",
				message: `Missing required fields: ${missingFields.join(", ")}`,
			});
		}

		const filesArray = fieldOrder.map((fieldName) => {
			const file = req.files[fieldName][0];
			const name = fieldName || "Unknown";

			return {
				name,
				reference: file.path,
			};
		});

		const documentsUser = await usersService.updateDocuments(
			idUser,
			filesArray
		);

		res.send("upload-success", {
			status: "success",
			message: "Files uploaded successfully",
			files: filesArray,
			documentsUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
