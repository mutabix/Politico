import express from 'express'; 
import offices from '../models/offices'; 


class Office{
    
    static getAllOffices(req, res){
        return res.send(offices);
    }
}


export default Office;