import { Router } from "express";
import { transporter } from "../utils/nodemailer.js";
import { usersService } from "../services/users.service.js";
import { generateResetToken } from "../utils/jwtToken.js";

const router = Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  const user = await usersService.findByEmail(email);

  const resetToken = generateResetToken(email);

  const resetPasswordLink = `http://localhost:8080/api/users/reset-password/${encodeURIComponent(resetToken)}`;
  const options = {
    from: "dsoocg@gmail.com",
    to: [email],
    subject: "Recuperación de contraseña",
    html: `<h1>OLVIDASTE TU CONTRASEÑA</h1>
           <p>Da click en el siguiente enlace para restablecer tu contraseña</p>
           <a href='${resetPasswordLink}'>link</a>
           <p>Tienes una hora antes de que el enlace expire</p>`,
  };

  await transporter.sendMail(options);
  res.send("Enviando email para recuperar contraseña. Revisa tu Bandeja de entrada");
});

export default router;
