import offices from '../models/offices';

class Office {
    static createOffice(req, res) {

        const office = {
            id: offices.length + 1,
            type: req.body.type,
            name: req.body.name,
            
        };
        offices.push(office);
        res.send(offices);
    }


    static getAllOffices(req, res){
        return res.status(200).send(offices);
    };
    
}

export default Office;
