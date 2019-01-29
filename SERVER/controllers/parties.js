import Joi from 'joi';
import parties from '../models/parties'; 

class Party{
    static createParty(req, res){

        const party = {
            id: parties.length +1, 
            name: req.body.name, 
            hqAddress: req.body.hqAddress, 
            logoUrl: req.body.logoUrl
        };
        parties.push(party);
        res.send(parties);
    }

    static getAllParties(req, res){
        res.send(parties);
    }


    static getOneParty(req, res){
        const party = parties.find(p => p.id === parseInt(req.param.id)); 

        if(!party){
            return res.status(404).send('Party not found');
        };
    }

    
}

export default Party;