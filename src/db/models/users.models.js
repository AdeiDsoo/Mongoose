import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});



export const usersModel = mongoose.model("Users", usersSchema);
