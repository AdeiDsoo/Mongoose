import passport from "passport";
import { Router } from "express";
import { usersService } from "../services/users.service.js";
import { lastConnection } from "../controllers/users.crontroller.js";
// import { checkRole } from "../middlewares/passport.middleware.js";

const router = Router();

router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/error" }),
	function (req, res) {
		req.session.user = req.user;
		console.log(req.session.user);
		res.redirect("/home");
	}
);

router.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
	"/github",
	passport.authenticate("github", {
		failureRedirect: "/error",
	}),
	(req, res) => {
		req.session.user = req.user;
		res.redirect("/home");
	}
);

// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });
router.get("/logout", async (req, res) => {
 await lastConnection(req, res);
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});


router.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/error",
	}),
	async (req, res) => {
		try {
			await lastConnection(req, res);

			if (req.user.role === "Admin") {
				res.redirect("/homeAdmin");
			} else if (req.user.role === "user" || req.user.role === "userPremium") {
				res.redirect("/home");
			} else {
				res.redirect("/error");
			}
		} catch (error) {
			console.log("Error:", error);
			res.redirect("/error");
		}
	}
);

router.post(
	"/signup",
	passport.authenticate("signup", {
		successRedirect: "/home",
		failureRedirect: "/error",
	}),
	async (req, res) => {
		await lastConnection(req, res);
	}
);


export default router;
