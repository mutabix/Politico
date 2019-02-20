import Joi from 'joi';

const loginValidator = (user) => {
    const schema = {
        email: Joi.string().regex(/^\S+$/).email().required(),
        passWord: Joi.string().regex(/^\S+$/).min(3).max(255).required(),

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

export default loginValidator;