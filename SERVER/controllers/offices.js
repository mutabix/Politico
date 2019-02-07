
import Joi from 'joi'; 
import offices from '../models/office'; 


class Office{
    
    // Create office
    static createOffice(req, res) {

        const {
            error
        } = officeValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        })

        const office = [{
            id: offices.length + 1,
            type: req.body.type,
            name: req.body.name
        }];
        offices.push(office);
        res.send({
            status: 200,
            data: [office]
        });
    }

    static getAllOffices(req, res){
        return res.send({
            status: 200, 
            data: offices
        });
    }

    static getOneOffice(req, res){
        const office = offices.find(of => of.id === parseInt(req.params.id)); 
        if(!office){
            return res.send({
                status: 404, 
                error: `Office with ID  ${req.params.id} is not found!`
            });
        }

        res.send({
            status: 200, 
            data: [office]
        });
    }

}

function officeValidator(office) {
    const schema = {
        type: Joi.string().max(10).required(),
        name: Joi.string().max(10).required(),
    };

    const options = {
        language: {
            key: '{{key}} '
        }
    }

    return Joi.validate(office, schema, options);
}


export default Office;

