import Joi from 'joi';

const userValidator = (user) => {
    const schema = {
        firstName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        lastName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        middleName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().regex(/^\S+$/).email().required(),
        phoneNumber: Joi.number().required(),
        passWord: Joi.string().regex(/^\S+$/).min(3).max(16).required()
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

    return Joi.validate(user, schema, options);
}

export default userValidator;