import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signUpValidator = (user) => {
    const schema = {
        firstname: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        lastname: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        middlename: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().regex(/^\S+$/).email().required(),
        phonenumber: Joi.number().required(),
        passport: Joi.string().uri(),
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
};


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
        'hdj%^&.)#', {
            expiresIn: '1d'
        });
    return giveToken;
};

export {
    signUpValidator,
    encryptPassword,
    tokenGenerator,
    validationMsgs
};