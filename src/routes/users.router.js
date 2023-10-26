import { Router } from "express";
import { userManager } from "../managers/usersManager.js";
import { compareData, hashData } from "../utils.js";

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
  const { email, password } = req.body;
  const userDB = await userManager.findByEmail(email);

  if (!userDB) {
    return res.json({ error: "invalid credentials" });
  }
  const comparePassword = await compareData(password, userDB.password);
  if (!comparePassword) {
    return res.json({ error: "invalid credentials" });
  }
  req.session["email"] = email;
  req.session["first_name"] = userDB.first_name;
  req.session["last_name"] = userDB.last_name;
  req.session["isAdmin"] =
    email === "adminCoder@coder.com" && password === "coder12345"
      ? true
      : false;

  res.redirect("/home");
});

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All data is required" });
  }

  try {
    const hashedPassword = await hashData(password);
    const createUser = await userManager.createOne({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User Created", message: createUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logout', (req, res)=>{
  req.session.destroy(()=>{
    res.redirect("/")
  })
})
export default router;
