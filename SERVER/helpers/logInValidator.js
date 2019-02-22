import Joi from 'joi';
import bcrypt from 'bcryptjs';

const loginValidator = (user) => {
    const schema = {
        email: Joi.string().regex(/^\S+$/).email().required(),
        password: Joi.string().regex(/^\S+$/).min(3).max(255).required(),

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

const comparePassword = (passwordHash, password) => {
    const comparedPassword = bcrypt.compareSync(password, passwordHash);
    return comparedPassword;
};
export default {loginValidator, comparePassword};