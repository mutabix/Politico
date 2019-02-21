import express from 'express'; 
import { Router, json } from 'express'; 
import User from '../../controllers/auth/userAuth';
import userToken from '../../middleware/userToken';


const userRouter = express.Router();  

userRouter.use(json());

userRouter.post('/auth/signup', User.signUp);
userRouter.post('/auth/login', User.logIn);



export default userRouter;



