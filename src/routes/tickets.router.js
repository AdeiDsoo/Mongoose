import { Router } from "express";
import { createTicket, deleteTicket, findAllTickets, findTicketById, updateTicket } from "../controllers/tickets.controller.js";

const router= Router()

router.get("/", findAllTickets)

router.get("/:idTicket", findTicketById)
router.post("/", createTicket)

router.post("/:idTicket", updateTicket )

router.delete("/:idTicket", deleteTicket)

export default router;