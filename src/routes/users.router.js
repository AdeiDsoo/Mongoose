import { Router } from "express";
import {
	createUser,
	findAllUsers,
	updatePassword,
	updateRole,
	forgotPassword,
	deleteUserEmail,
	uploadDocuments,
	twoDaysUsers,
	deleteInactiveUsers,
	findAll,
} from "../controllers/users.crontroller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.get("/", findAllUsers);

router.get("/allUsers", findAll );

router.get("/reset-password/:token", forgotPassword);

router.post("/reset-password/:token", updatePassword);

router.post("/", createUser);

router.get("/premium/:uid", updateRole);

router.delete("/delete/:email", deleteUserEmail);

router.delete("/delete", deleteInactiveUsers);


router.get("/usersTwoDays", twoDaysUsers);

router.get("/:idUser/documents", (req, res) => {
	res.render("documents", {
		id:req.params.idUser,
	});
});

const fieldOrder = ["identification", "proofAdress", "proofBank"];

router.post(
	"/:idUser/documents",
	upload.fields(fieldOrder.map((field) => ({ name: field, maxCount: 1 }))),
	uploadDocuments
);


export default router;
