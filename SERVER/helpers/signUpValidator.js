import Joi from 'joi';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs';

const signUpValidator = (user) => {
    const schema = {
        firstName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        lastName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        middleName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().regex(/^\S+$/).email().required(),
        phoneNumber: Joi.number().required(),
        passPort: Joi.string().uri(),
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


const validationMsgs = (res, error) => {
    const errorMessage = error.details.map(d => d.message);
    return res.status(400).send({
        status: 400,
        error: errorMessage
    });
};
const encryptPassword = (password) => {
    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    return encryptedPassword;
};


const tokenGenerator = (userinfo) => {
    const giveToken = jwt.sign(userinfo,
        'hdj%^&.)#', { expiresIn: '1d' });
    return giveToken;
    }

export default {signUpValidator, encryptPassword, tokenGenerator, validationMsgs};