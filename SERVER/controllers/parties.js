import Joi from 'joi';
import parties from '../models/parties';
class Party {

    // Create a party
    static createParty(req, res) {

        const party = {
            id: parties.length + 1,
            name: req.body.name,
            hqAddress: req.body.hqAddress,
            logoUrl: req.body.logoUrl
        };
        parties.push(party);
        res.send(parties);
    }

    // Get all Parties 

    static getAllParties(req, res) {
        res.send(parties);
    }


    // Get one party
    static getOneParty(req, res) {
        const party = parties.find(p => p.id === parseInt(req.params.id));
        if (!party) {
            return res.status(404).send('Party not found');
        }

        res.send(party);
    }


    static updateParty(req, res) {

        const party = parties.find(p => p.id === parseInt(req.params.id));
        if (!party) {
            return res.status(400).send('Party not found');
        }

        //Update Party

        party.name = req.body.name;
        party.hqAddress = req.body.hqAddress;
        party.logoUrl = req.body.logoUrl;

        res.send(party);
    }


    // Delete Party

    static deleteParty(req, res) {
        const party = parties.find(p => p.id === parseInt(req.params.id));
        if (!party) {
            return res.status(400).send('Party not found');
        };
    
        const index = parties.indexOf(party);
        parties.splice(index, 1);
        res.send(party);
    }
}

export default Party;