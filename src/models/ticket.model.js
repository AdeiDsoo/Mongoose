import mongoose from "mongoose";

const TicketsSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
    default: false,
  },
});

export const ticketsModel = mongoose.model("Ticket", TicketsSchema);
