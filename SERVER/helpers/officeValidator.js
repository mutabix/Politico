import Joi from 'joi'; 

function officeValidator(office) {
    const schema = {
        type: Joi.string().regex(/^\S+$/).valid(['federal', 'state', 'local government', 'legislative']).min(3).max(50).required(),
        name: Joi.string().regex(/^\S+$/).min(3).max(50).required(),
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

    return Joi.validate(office, schema, options);
}

export default officeValidator;