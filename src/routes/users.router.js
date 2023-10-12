import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";

const router = Router();

router.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All data is required" });
  }

  try {
    const createdUser = await usersManager.createOne(req.body);
    // res.status(200).json({ message: "user Created", user: createUser });
    res.redirect(`/home/${createdUser._id}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async(req, res)=>{
  try {
    const users= await usersManager.findAll()
    res.status(200).json({ message: "Users", users });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.delete('/:idUser', async(req, res)=>{
  const {idUser}= req.params
  try {
    const user= await usersManager.deleteOne(idUser)
    res.status(200).json({ message: "Delete User", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get('/:idUser', async(req, res)=>{
  const {idUser}= req.params
  try {
    const user= await usersManager.findById(idUser)
    res.status(200).json({ message: "User", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.put('/:idUser', async(req, res)=>{
  const {idUser}= req.params
  const{ body }=req.body
  console.log(req.body, 'update');
  try {
    const user= await usersManager.updateOne(idUser, body )
    res.status(200).json({ message: "Update User", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
export default router;
