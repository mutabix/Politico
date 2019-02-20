import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import signUpValidator from '../../helpers/signUpValidator';
import logInValidator from '../../helpers/logInValidator';
import resetValidator from '../../helpers/resetValidator';

import pool from '../../db/dbConnect';
import dbKeys from '../../db/dbKeys';



class User {

    static signUp(req, res) {
        const {
            error
        } = signUpValidator(req.body);

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
                                .then((savedUser) => {
                                    if (savedUser) {
                                        const payLoad = {
                                            id: savedUser.rows[0].id,
                                            firstName: savedUser.rows[0].firstName,
                                            lastName: savedUser.rows[0].lastName,
                                            email: savedUser.rows[0].email
                                        };
                                        jwt.sign(payLoad, dbKeys.secretWord, {
                                            expiresIn: 3600
                                        }, (err, token) => {
                                            return res.status(201).send({
                                                status: 201,
                                                message: 'Account Successfully Created!',
                                                data: [{
                                                    token: token,
                                                    user: savedUser.rows[0]
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



    static logIn(req, res){
        const {
            error
        } = logInValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        pool.query("SELECT * FROM users WHERE email=$1", [req.body.email.toLowerCase()])
        .then((user)=>{
                bcrypt.compare(req.body.passWord, user.rows[0].password)
                .then((isSame) =>{
                    
                    if(!isSame){
                        return res.status(400).send({
                            status: 400, 
                            error: 'Email and Password didn\'t match'
                        })
                    };

                    const payLoad = {
                        id: user.rows[0].id, 
                        email: user.rows[0].email,
                        password: user.rows[0].password
                    }; 

                    jwt.sign(payLoad, dbKeys.secretWord, {expiresIn: 3600}, (error, token) =>{

                        if(error) return res.status(400).send(error); 
            
                        return res.status(200).send({
                            status: 200, 
                            message: 'Successfuly logged in', 
                            data: [{
                                token: token, 
                                user: payLoad

                            }]

                        })
                    })
                })
                .catch(err =>{res.status(400).send({
                    status: 400, 
                    error: err
                })})
        })
        .catch(err =>res.status(400).send(err));

    }

    static resetPassword(req, res){

        const {
            error
        } = resetValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        pool.query("SELECT * FROM users WHERE email=$1", [req.body.email.toLowerCase()])
        .then((user)=>{
            
        })
        .catch()
        

    }
}


export default User;