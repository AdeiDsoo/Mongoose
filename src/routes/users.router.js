import { Router } from "express";
import {
	createUser,
	findAllUsers,
	updatePassword,
	updateRole,
	forgotPassword,
	deleteUserEmail,
	uploadDocuments,
	twoDaysDeleteUsers,
	twoDaysUsers,
} from "../controllers/users.crontroller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { transporter } from "../utils/nodemailer.js";
import { usersService } from "../services/users.service.js";


const router = Router();

router.get("/", findAllUsers);

router.get("/reset-password/:token", forgotPassword);

router.post("/reset-password/:token", updatePassword);

router.post("/", createUser);

router.get("/premium/:uid", updateRole);

router.delete("/delete/:email", deleteUserEmail);

router.delete("/delete", async(req, res)=>{
	twoDaysDeleteUsers;
 const options = {
    from: "dsoocg@gmail.com",
    to: [email],
    subject: "Tu cuenta ha sido eliminada",
    html: `<h1>TU CUENTA HA SIDO ELIMNADA</h1>
           <p>Por inactividad mayor  a dos dias tu cuenta ha sido elimnada</p>
          `,
  };

  await transporter.sendMail(options);
  res.send("Enviando email para recuperar contraseña. Revisa tu Bandeja de entrada");
});


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
