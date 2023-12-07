import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  findAllMessages,
  findMessageById,
} from "../controllers/messages.controller.js";

const router = Router();

router.post("/", createMessage);

router.get("/", findAllMessages);
router.get("/:idMessage", findMessageById);
router.delete("/:idMessage", deleteMessage);

export default router;
