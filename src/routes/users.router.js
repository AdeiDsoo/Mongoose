import { Router } from "express";
import {
  createUser,
  findAllUsers,
  findByEmail,
  findUserById,
} from "../controllers/users.crontroller.js";

const router = Router();

router.get("/", findAllUsers);

// router.get("/:idUser", findUserById);

router.get("/:email", findByEmail);

router.post("/", createUser);

export default router;
