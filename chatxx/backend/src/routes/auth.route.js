import express from 'express';
import dotenv from 'dotenv'; 
import { protectRoute } from '../middleware/auth.middleware.js';   
import { login, logout, signup,onboard } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);
router.post('/logout', logout);



//your profile :
router.post('/onboarding',protectRoute,onboard);

// Check if user is logged in 
router.get("/me",protectRoute,(req,res) =>{
    res.status(200).json({
        success:true,
        user:req.user
    })
})



export default router;