import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
  fromUser: {
    type: String,
    required: true,
  },
  contentMessage: {
    type: String,
    required: true,
  },
  toUser: {
    type: String,
    required: true,
  },
});
export const messagesModel = mongoose.model("Messages", MessagesSchema);
