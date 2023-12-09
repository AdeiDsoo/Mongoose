import { Router } from "express";
import { createTicket, deleteTicket, findAllTickets, updateTicket } from "../controllers/tickets.controller.js";

const router= Router()

router.get("/", findAllTickets)

router.post("/", createTicket)

router.post("/:idTicket", updateTicket )

router.delete("/:idProduct", deleteTicket)

export default router;