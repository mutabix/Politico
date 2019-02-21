import {Pool} from 'pg'; 
import dbKeys from './dbKeys';


const pool = new Pool({
connectionString: dbKeys.dataBasePath,
});

const queryOp =

         `CREATE TABLE IF NOT EXISTS 
         offices(
             id PRIMARY KEY, 
             type VARCHAR(50) NOT NULL, 
             name VARCHAR(50) NOT NULL, 
         )`; 

         pool.query(queryOp)
         .then((result)=>{
             console.log(result);
         })
         .catch((err) =>{res.status(400).send(err); 
            pool.end();
        });

pool.on('connect', ()=>{
    console.log('Connected to DB');
});

import  makeRunnable from 'make-runnable';

export default {pool, queryOp};