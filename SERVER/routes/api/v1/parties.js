import express from 'express';
import {
    Router,
    json
} from 'express';
import Party from '../../../controllers/partiesCtrl';

const {
    createParty,
    getAllParties,
    getOneParty,
    updateParty,
    deleteParty
} = Party;


const partyRouter = express.Router();

partyRouter.use(json());


partyRouter.post('/api/v1/parties/', createParty);

partyRouter.get('/api/v1/parties/', getAllParties);

partyRouter.get('/api/v1/parties/:id', getOneParty);

partyRouter.patch('/api/v1/parties/:id', updateParty);

partyRouter.delete('/api/v1/parties/:id', deleteParty);


export default partyRouter;