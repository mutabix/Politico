import Joi from 'joi'; 

function partyValidator(party) {
    const schema = {
        name: Joi.string().regex(/^\S+$/).min(3).max(50).required(),
        hqAddress: Joi.string().regex(/^\S+$/).min(3).max(50).required(),
        logoUrl: Joi.string().uri().max(255).required()
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

export default partyValidator;