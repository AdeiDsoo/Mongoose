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
  products: [
    {
        idProduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        },
        qty: {
          type: Number,
      },
}]   
});

export const ticketsModel = mongoose.model("Ticket", TicketsSchema);
