import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateResetToken = (email) => {
	const payload = {
		email: email,
		exp: Math.floor(Date.now() / 1000) + 60 * 60,
	};

	return jwt.sign(payload, config.jwt_secret);
};

export const verifyResetToken = (token) => {
	try {
		const decoded = jwt.verify(token, config.jwt_secret);
		return decoded;
	} catch (err) {
		return null;
	}
};
