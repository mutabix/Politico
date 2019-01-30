import Joi from 'joi';
import parties from '../models/parties';

class Party {
    static deleteParty(req, res) {
      
    const party = parties.find(p => p.id === parseInt(req.params.id));
        if (!party) return res.send({
                status: 404, 
                error: `Party with ID ${req.params.id} is not found!`
            });
    
        const index = parties.indexOf(party);
        parties.splice(index, 1);
        res.send(party);
}

}

export default Party;