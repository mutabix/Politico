import express from 'express'; 
import {Router, json} from 'express'; 
import Office from '../../../controllers/offices';
import adminAuth from '../../../middleware/adminAuth';


const officeRouter = express.Router(); 

officeRouter.use(json());


officeRouter.get('/api/v1/offices', Office.getAllOffices);
officeRouter.get('/api/v1/offices/:id', Office.getOneOffice);
officeRouter.post('/api/v1/offices', Office.createOffice);
officeRouter.post('/api/v1/offices/:id/register', Office.registerUser);


export default officeRouter;