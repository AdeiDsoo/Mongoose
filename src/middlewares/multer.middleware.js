import multer from "multer";
import { __dirname } from "../utils.js";


const destination = (req, file, cb) => {
	const { category } = req.body;

	const folders = {
		profile: "profile/",
		documents: "documents/",
		products: "products/",
		default: "uploads/",
	};

	const folder = folders[category] || folders.default;

	cb(null, __dirname + "/public/" + folder);
};

const storage = multer.diskStorage({
	destination: destination,
	filename: (req, file, cb) => {
		cb(null, file.originalname); 
	},
});


export const upload = multer({ storage: storage });
