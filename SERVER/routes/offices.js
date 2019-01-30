import express from 'express'; 
import {Router, json} from 'express'; 
import Office from '../controllers/offices';


const officeRouter = express.Router(); 

officeRouter.use(json());

officeRouter.get('/api/v1/offices', Office.getAllOffices);
officeRouter.get('/api/v1/offices/:id', Office.getOneOffice);


export default officeRouter;