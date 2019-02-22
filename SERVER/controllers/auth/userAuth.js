import {tokenGenerator, validationMsgs, encryptPassword} from '../../helpers/signUpValidator'; 
import signUpValidator from '../../helpers/signUpValidator';
import loginValidator from '../../helpers/logInValidator'; 

import db from '../../db/dbIndex';

const User = {
    async userSignup(req, res) {
        
        
        const nameFinder = 'SELECT * FROM users WHERE middlename=$1';
        const userResult = await db.query(nameFinder, [req.body.middlename]);
        const userData = userResult.rows;
        if (userData[0]) {
            return res.status(400).send({
                status: 400,
                error: 'User exists',
            });
        }

        const emailFinder = 'SELECT * FROM users WHERE email=$1';
        const emailResult = await db.query(emailFinder, [req.body.email]);
        const emailData = emailResult.rows;
        if (emailData[0]) {
            return res.status(400).send({
                status: 400,
                error: 'Email already taken',
            });
        }

        const encryptedPassword = encryptPassword(req.body.password);

        const text = 'INSERT INTO users (firstname, lastname, middlename,phonenumber,email,passport,password,isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*';
        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.middlename,
            req.body.phonenumber,
            req.body.email,
            req.body.passport,
            encryptedPassword,
            req.body.isadmin,
        ];
        try {
            const { rows } = await db.query(text, values);


            const giveToken = tokenGenerator({
            
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                middlename: rows[0].middlename,
                email: rows[0].email,
                phonenumber: rows[0].phonenumber,
    
            });

            const response = {
                status: 201,
                token: giveToken,
                user: [{ rows }],
            };
            return res.status(201).send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
    async userLogin(req, res) {
        // Validate Data
       
        const {
            error
        } = loginValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        })

        const usersFinder = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
        try {
            const { rows } = await db.query(usersFinder, [req.body.username]);
            if (!rows[0]) {
                return res.status(401).send({
                    status: 401,
                    error: 'Invalid email or password',
                });
            }
            if (!comparePassword(rows[0].password, req.body.password)) {
                return res.status(401).send({
                    status: 401,
                    error: 'Invalid email or password',
                });
            }
            const giveToken = tokenGenerator({
        
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                middlename: rows[0].othername,
                email: rows[0].email,
                phonenumber: rows[0].phonenumber,
            });

            const response = {
                status: 201,
                data: [{ giveToken }],
            };
            return res.send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
};

export default User;