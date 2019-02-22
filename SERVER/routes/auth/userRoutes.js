import express from 'express'; 
import { Router, json } from 'express'; 
import User from '../../controllers/auth/userAuth';

const {userSignup, userLogin} = User;

const userRouter = express.Router();  

userRouter.use(json());

userRouter.post('/auth/signup', userSignup);
userRouter.post('/auth/login', userLogin);

export default userRouter;



