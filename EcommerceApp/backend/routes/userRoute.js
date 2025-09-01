import express from 'express'
import { loginUser,registerUser,adminLogin, getUserProfile,updateUserProfile } from '../controllers/userController.js'
import { userAuth } from '../middleware/userauth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',adminLogin);

userRouter.get('/profile', userAuth, getUserProfile);
userRouter.put('/profile', userAuth, updateUserProfile)


export default userRouter;