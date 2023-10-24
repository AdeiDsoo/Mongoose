import { Router } from "express";
import { userManager } from "../managers/usersManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await userManager.findAll();
        res.status(200).json({ message: "users", users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const userDB = await userManager.findByEmail(email)
    // const passwordDB=await userManager.findByPassword(password)
    if (!userDB) {
        return res.json({ error: "invalid credentials" })
    }
    req.session["email"] = email;
    req.session["first_name"] = userDB.first_name
    req.session["last_name"] = userDB.last_name
    if(email=== 'adminCoder@coder.com' && password==="coder12345"){
        req.session["isAdmin"] = true;
    }

    res.redirect("/home")
});

router.post("/signup", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All data is required" });
    }

    try {
        const createUser = await userManager.createOne(req.body)
        res.status(200).json({ message: "User Created", message: createUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;