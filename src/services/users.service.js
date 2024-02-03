// import { usersManager } from "../DAO's/factory.js";
import { usersMongo } from "../DAO's/memDAO/users.mongo.js";
import { hashData, compareData } from "../utils.js";
import UserDTO from "../DTO/user.dto.js";
import { transporter } from "../nodemailer.js";
import { verifyResetToken } from "../jwtToken.js";

class UsersService {
	async findAll() {
		const response = await usersMongo.findAll();
		return response;
	}

	async findById(id) {
		const response = await usersMongo.findById(id);
		return response;
	}

	async createOne(obj) {
		const { password } = obj;
		const hashedPassword = await hashData(password);
		const userDTO = new UserDTO({ ...obj, password: hashedPassword });

		const response = await usersMongo.createOne(userDTO);

		return response;
	}
	async updateOne(obj) {
		const { id, ...userInfo } = obj;
		const response = await usersMongo.updateOne(id, userInfo);
		return response;
	}
	 async updateDocuments(id, documents) {
    const response = await usersMongo.updateOne(id, { documents });
    return response;
 
};

	async deleteOne(id) {
		const response = await usersMongo.deleteOne(id);
		return response;
	}
	async findByEmail(email) {
		const response = await usersMongo.findByEmail(email);
		return response;
	}
	async findByPassword(password) {
		const response = await usersMongo.findByPassword(password);
		return response;
	}

	async updatePassword(resetToken, newPassword) {
		const userToken = verifyResetToken(resetToken);

		if (userToken && userToken.email) {
			const email = userToken.email;
			const hashedPassword = await hashData(newPassword);
			const userDB = await usersMongo.findByEmail(email);

			const updateUser = await usersMongo.updateOne(userDB._id, {
				...userDB.toObject(),
				password: hashedPassword,
			});
		}
	}
}

export const usersService = new UsersService();
