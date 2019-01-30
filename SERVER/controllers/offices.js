
import express from 'express'; 
import offices from '../models/offices'; 


class Office{
    
    static getAllOffices(req, res){
        return res.send(offices);
    }

    static getOneOffice(req, res){
        const office = offices.find(of => of.id === parseInt(req.params.id)); 
        if(!office){
            return res.status(404).send('Office not found');
        }

        res.send(office);
    }

}


export default Office;

