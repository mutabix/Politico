import users from '../../models/user'; 
import userValidator from '../../helpers/userValidator';



class User{

    static signUp(req, res){
        const {
            error
        } = userValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        })

        const user = {
            firstName: req.body.firstName.toLowerCase(),
            lastName: req.body.lastName.toLowerCase(),
            middleName: req.body.middleName.toLowerCase(),
            phoneNumber: req.body.phoneNumber,
            email: req.body.email, 
            passPort: req.body.passPort, 
            passWord: req.body.passWord
        };
        users.push(user);
        res.status(201).send({
            status: 201,
            data: [user]
        });
    }
}

export default User;