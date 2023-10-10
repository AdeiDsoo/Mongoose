import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";

const router = Router();

router.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All data is required" });
  }

  try {
    const createUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: "user Created", user: createUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
