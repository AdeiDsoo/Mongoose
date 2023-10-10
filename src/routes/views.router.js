import { Router } from "express";

const router = Router();

router.get('/signup', (req, res)=>{
    res.render("signup")
})
export default router;
