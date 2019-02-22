import express from 'express'; 
import {Router, json} from 'express'; 
import Office from '../../../controllers/officeCtrl';
import adminAuth from '../../../middleware/adminAuth';

const{createOffice, allOffices, getOneOffice, registerUser} = Office;


const officeRouter = express.Router(); 

officeRouter.use(json());


officeRouter.post('/api/v1/offices',createOffice);
officeRouter.get('/api/v1/offices', allOffices);
officeRouter.get('/api/v1/offices/:id', getOneOffice);
officeRouter.post('/api/v1/offices/:id/register', registerUser);


export default officeRouter;