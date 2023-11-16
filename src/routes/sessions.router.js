import passport from "passport";
import { Router } from "express";

const router=Router()
//de mi app el signup con google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
//a donde se va a volver aentrar despues de signup
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/home');
  });

  router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  
  router.get(
    "/github",
    passport.authenticate("github", {
      failureRedirect: "/error",
    }),
    (req, res)=> {
      req.session.user=req.user;
      res.redirect("/home");
    }
  );
  
  

 

export default router