import express from 'express'; 
import { Router, json } from 'express'; 
import Party from './parties'; 


const partyRouter = express.Router();   

partyRouter.use(json());


partyRouter.post('/api/v1/parties/', Party.createParty);

partyRouter.get('/api/v1/parties/', Party.getAllParties);

partyRouter.get('/api/v1/parties/:id', Party.getOneParty);

partyRouter.patch('/api/v1/parties/:id', Party.updateParty);

partyRouter.delete('/api/v1/parties/:id', Party.deleteParty);


export default partyRouter;