import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userValidator from '../../helpers/userValidator';
import pool from '../../db/dbConnect';
import dbKeys from '../../db/dbKeys';



class User {

    static signUp(req, res) {
        const {
            error
        } = userValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        pool.query("SELECT * FROM users WHERE email=$1", [req.body.email.toLowerCase()])
            .then((email) => {
                if (email.rows.length === 0) {
                    // Create a new user 
                    const newUser = {
                        firstName: req.body.firstName.toLowerCase(),
                        lastName: req.body.lastName.toLowerCase(),
                        middleName: req.body.middleName.toLowerCase(),
                        phoneNumber: req.body.phoneNumber,
                        email: req.body.email,
                        passPort: req.body.passPort,
                        passWord: req.body.passWord,
                        isAdmin: (req.body.isAdmin) ? req.body.isAdmin : false
                    };

                    // Encrypting the password 
                    bcrypt.genSalt(12, (error, salt) => {
                        if (error) res.status(400).send(error);
                        bcrypt.hash(newUser.passWord, salt, (hashError, hash) => {
                            if (hashError) res.status(400).send({
                                error: 'Check your password and try again!'
                            });
                            newUser.passWord = hash;
                            // Save the password in the DB 

                            pool.query("INSERT INTO users(firstname,lastname,middlename,phonenumber,passport,password,email,isadmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*",
                                    [
                                        newUser.firstName,
                                        newUser.lastName,
                                        newUser.middleName,
                                        newUser.phoneNumber,
                                        newUser.passPort,
                                        newUser.passWord,
                                        newUser.email,
                                        newUser.isAdmin
                                    ])
                                .then((saved) => {
                                    if (saved) {
                                        const payLoad = {
                                            id: saved.rows[0].id,
                                            firstName: saved.rows[0].firstName,
                                            lastName: saved.rows[0].lastName,
                                            email: saved.rows[0].email
                                        };
                                        jwt.sign(payLoad, dbKeys.secretWord, {
                                            expiresIn: 3600
                                        }, (err, token) => {
                                            return res.status(201).send({
                                                status: 201,
                                                message: 'Account Successfully Created!',
                                                data: [{
                                                    token: token,
                                                    user: saved.rows[0]
                                                }]
                                            });

                                        });
                                    }
                                })
                                .catch(err => res.status(400).send(err));
                        });
                    });

                } else {
                    return res.status(400).send({
                        status: 400,
                        message: 'Email address already taken!'
                    })
                }
            })
    }
}

export default User;