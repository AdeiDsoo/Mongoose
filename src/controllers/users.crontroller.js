import { UserNotFoundError } from "../services/user-not-found.error.js";
import { usersService } from "../services/users.service.js";

export const findAllUsers = async (req, res) => {
  try {
    const result = await usersService.findAll();
    res.status(200).json({ users: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findUserById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const result = await usersService.findById(idUser);
    res.status(200).json({ user: result });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { first_name, last_name, email, password, full_name } = req.body;
console.log(req.body, 'reqBody');
  try {

    if (!first_name || !last_name || !email || !password) {
     
      return res.status(400).json({ message: "All fields are required" });
    }
   
    const createdUser = await usersService.createOne(req.body);
 
    res.status(200).json({ message: "User created", user: createdUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await usersService.findByEmail(email);
    res.status(200).json({ message: "User", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res)=>{
  const {id}= req.body
  try {
    const user = await usersService.deleteOne(id)
    res.status(200).json({ message: "User delete", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
