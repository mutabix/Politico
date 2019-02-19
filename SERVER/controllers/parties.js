import Joi from 'joi';
import parties from '../models/party';

class Party {
 
    // Create a party
    static createParty(req, res){
        const {
            error
        } = partyValidator(req.body);

        if (error) return res.send({
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
        res.status(201).send({
            status: 201,
            data: party
        });
    }

    // Get all Parties 

    static getAllParties(req, res) {
        res.send({
            status: 200,
            data: parties

        });
    }


    // Get one party

     static getOneParty(req, res){
        const party = parties.find(p => p.id === parseInt(req.params.id));
        if (!party) return res.send({
            status: 404,
            error: `Party with ID ${req.params.id} is not found!`
        });
        res.send({
            status: 200,
            data: [party]
        });
    }


    static updateParty(req, res) {

        const party = parties.find(p => p.id === parseInt(req.params.id));

        if (!party) {
            return res.send({
                status: 404,
                error: `Party with  id ${req.params.id} is not found!`
            });
        }

        //Update Party

        const {
            error
        } = partyValidator(req.body);
        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        })

        party.name = req.body.name;
        party.hqAddress = req.body.hqAddress;
        party.logoUrl = req.body.logoUrl;

        res.send({
            status: 200,
            data: [party]
        });
    }

    static deleteParty(req, res) {

        const party = parties.find(p => p.id === parseInt(req.params.id));
        if (!party) return res.send({
            status: 404,
            error: `Party with ID ${req.params.id} is not found!`
        });

        const index = parties.indexOf(party);
        parties.splice(index, 1);
        res.send({
            status: 200,
            data: [{
                message: `${party.name}  of ID  ${req.params.id} is successfully deleted!`
            }]
        });
    }


}

function partyValidator(party) {
    const schema = {
        name: Joi.string().regex(/^\S+$/).min(3).max(10).required(),
        hqAddress: Joi.string().regex(/^\S+$/).min(3).max(10).required(),
        logoUrl: Joi.string().uri().required()
    };

    const options = {
        language: {
            key: '{{key}} ', 
            string: {
                regex: {
                    base: 'must not have empty spaces'
                }
            }
        }
    }

    return Joi.validate(party, schema, options);
}

export default Party;