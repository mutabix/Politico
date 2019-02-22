import {Pool} from 'pg';
import dbKeys from './dbKeys';


class DBSetter {
    constructor(){

        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL || dbKeys.dataBasePath,
        });
        this.pool.on('connect', () => {
            console.log('Connected to DB');
        });

        this.makeTables();
    }

    makeTables() {

        const users =
            `CREATE TABLE IF NOT EXISTS users(
             id serial PRIMARY KEY, 
             firstname VARCHAR(50), 
             lastname  VARCHAR(50), 
             middlename VARCHAR(50), 
             phonenumber VARCHAR(50), 
             email VARCHAR(250), 
             passport VARCHAR(250), 
             password VARCHAR(250), 
             isadmin boolean 
         )`;

        this.pool.query(users)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });

        const parties =
            `CREATE TABLE IF NOT EXISTS parties(
             id serial PRIMARY KEY, 
             name VARCHAR(50),
             qhaddress VARCHAR(50), 
             logourl VARCHAR(250)
         )`;
        this.pool.query(parties)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });

        const offices =
            `CREATE TABLE IF NOT EXISTS offices( 
             id serial PRIMARY KEY, 
             type  VARCHAR(50), 
             name VARCHAR(50)
         )`;

        this.pool.query(offices)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });

        const uservotes =
            `CREATE TABLE IF NOT EXISTS votes(
             id serial PRIMARY KEY,  
             createdon DATE, 
             createdby INT, 
             candidate INT
            )`;
        this.pool.query(uservotes)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });
    };

}

new DBSetter();