import { ticketsService } from "../services/tickets.service.js";

export const findAllTickets = async (req, res) => {
  try {
    const result = await ticketsService.findAll();
    res.status(200).json({ tickets: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findTicketById = async (req, res) => {
  const { idTicket } = req.params;

  try {
    const result = await ticketsService.findById(idTicket);
    res.status(200).json({ Ticket: result });
  } catch (error) {
  
    res.status(500).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  
  try {

    const createdTicket = await ticketsService.createOne(req.body);
 
    res.status(200).json({ message: "Ticket created", Ticket: createdTicket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 export const updateTicket=async (req, res)=>{

  const {idTicket}=req.body
  try {
    const result= await ticketsService.updateTicket(idTicket)
    res.status(200).json({ message: "Ticket update", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 }

export const deleteTicket = async (req, res)=>{
  const {id}= req.body
  try {
    const result = await ticketsService.deleteOne(id)
    res.status(200).json({ message: "Ticket delete", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
