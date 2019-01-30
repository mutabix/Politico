import Joi from 'joi';
import parties from '../models/parties';
class Party {

    // Create a party
    static createParty(req, res) {

        const {error} = partyValidator(req.body); 

        if(error)return res.send({
            status: 404, 
            error: error.details[0].message
        })

        const party = {
            id: parties.length + 1,
            name: req.body.name,
            hqAddress: req.body.hqAddress,
            logoUrl: req.body.logoUrl
        };
        parties.push(party);
        res.send({
            status: 200, 
            data: parties
        });
    }

    // Get all Parties 

    static getAllParties(req, res) {
        res.send(parties);
    }

}

function partyValidator(party){

    const schema = {
        name: Joi.string().min(3).max(10).required(),
        hqAddress: Joi.string().min(3).max(10).required(),
        logoUrl: Joi.string().required()
    }

    const options = {
        language: {
            key: '{{key}} '
        }
    }
    return Joi.validate(party, schema, options);
}

export default Party;