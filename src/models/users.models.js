import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const usersSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
	},
	full_name: {
		type: String,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	from_github: {
		type: Boolean,
		default: false,
	},
	from_google: {
		type: Boolean,
		default: false,
	},
	cart: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Carts",
	},
	role: {
		type: String,
		enum: ["user", "userPremium", "Admin"],
		default: "user",
	},
	documents: {
		type: [
			{
				name: {
					type: String,
				},
				reference: {
					type: String,
				},
			},
		],
		_id: false,
	},
	last_connection: {
		type: Date,
	},
});

export const usersModel = mongoose.model("Users", usersSchema);
