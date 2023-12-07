
import { messagesService } from "../services/messages.service.js";

export const findAllMessages = async (req, res) => {
  try {
    const result = await messagesService.findAll();
    res.status(200).json({ messages: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findMessageById = async (req, res) => {
  const { idMessage } = req.params;
  try {
    const result = await messagesService.findById(idMessage);
    res.status(200).json({ message: result });
  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
};

export const createMessage = async (req, res) => {
  const { fromUser, contentMessage, toUser } = req.body;
  try {

    if (!fromUser || !contentMessage || !toUser ) {
        return res.status(400).json({ message: "All data is required" });
      }
   
    const createdMessage = await messagesService.createOne(req.body);
 
    // res.status(200).json({ message: "message created", message: createdMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteMessage = async (req, res)=>{
  const {id}= req.body
  try {
    const result = await messagesService.deleteOne(id)
    res.status(200).json({ message: "message delete", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
