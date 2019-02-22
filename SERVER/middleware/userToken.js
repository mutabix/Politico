import jwt from 'jsonwebtoken';
import dbKeys from '../db/dbKeys';


const userToken =  (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; 
    if(!token){
        return res.status(401).send({
            status: 401, 
            message: 'Access  Denied. No Token Provided.'
        });
    }

    try{
        const decryptedToken = jwt.verify(token, dbKeys.secretWord);
        req.user = decryptedToken; 
        return next();

    }catch(error){

        return res.status(400).send({
            status: 400, 
            error: 'Sorry! Invalid Token.'
        });
    }
}

export default userToken;
