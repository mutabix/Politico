import officeValidator from '../helpers/officeValidator';
import db from '../db/dbIndex';


const Office = {
    async createOffice(req, res) {
       
        // Validation of  Data
        const {
            error
        } = officeValidator(req.body);

        if(error) return res.send({
            status: 404,
            error: error.details[0].message
        })

        const officeFinder = 'SELECT * FROM offices WHERE name=$1, id=$2';
        const result = await db.query(officeFinder, [req.body.name]);
        const officeDetails = result.rows;
        if (officeDetails[0]) {
            return res.status(409).send({
                status: 409,
                error: 'Political office name already taken',
            });
        }
        const text = 'INSERT INTO offices (type, id,  name) VALUES ($1, $2,$2)';
        const values = [
            req.body.id,
            req.body.type,
            req.body.name,
        ];
        try {
            await db.query(text, values);
            const response = {
                status: 201,
                data: [{
                    message: 'Office successfully created!',
                    type: req.body.type,
                    name: req.body.name,
                }],
            };
            return res.status(201).send(response);
        }catch(error) {
            return res.status(400).send({ status: 400, error: error});
        }
    },
    async allOffices(req, res) {
        const officesFinder = 'SELECT * FROM offices ORDER BY id DESC';
        try{
            const { rows } = await db.query(officesFinder);
            const results = {
                status: 200,
                data: rows,
            };
            return res.send(results);
        }catch(error) {
            return res.status(400).send({ status: 400, error });
        }
    },
    async getOneOffice(req, res) {
        const text = 'SELECT * FROM offices WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    status: 404,
                    error: `Office with ID${req.params.id} is not found!`,
                });
            }
            const response = {
                status: 200,
                data: rows[0],
            };
            return res.send(response);
        } catch (error) {
            return res.status(400).send({
                status: 400,
                error,
            });
        }
    },
    async registerCandidate(req, res) {
        // if (req.user.role !== 'admin') {
        //     return res.status(401).send({ status: 401, error: 'Unauthorized Access' });
        // }
        

        const officeFinder = 'SELECT * FROM offices WHERE id=$1';
        const result = await db.query(officeFinder, [req.params.id]);
        const officeDetails = result.rows;
        if (!officeDetails[0]) {
            return res.status(404).send({
                status: 404,
                error: `Office with  ID ${req.params.id} not found`,
            });
        }
        const userFinder = 'SELECT * FROM users WHERE id=$1';
        const userResult = await db.query(userFinder, [req.body.user]);
        const userDetails = userResult.rows;
        if (!userDetails[0]) {
            return res.status(404).send({
                status: 404,
                error: `User with ID ${req.params.id}  not found!`,
            });
        }
        const partyFinder = 'SELECT * FROM party WHERE id=$1';
        const partyResult = await db.query(partyFinder, [req.body.party]);
        const partyDetails = partyResult.rows;
        if (!partyDetails[0]) {
            return res.status(404).send({
                status: 404,
                error: `Party with  ID ${req.params.id}  not found`,
            });
        }
        const candidateFinder = 'SELECT * FROM candidates WHERE office=$1 AND candidate=$2';
        const candidateValues = [
            req.params.id,
            req.body.user,
        ];
        const candidateResult = await db.query(candidateFinder, candidateValues);
        const candidateDetails = candidateResult.rows;
        if(candidateDetails[0]) {
            return res.status(409).send({
                status: 409,
                error: ' Oohhps! The candidate already exist',
            });
        };
        const text = 'INSERT INTO candidates (office, party, candidate) VALUES($1, $2, $3)';
        const values = [
            req.params.id,
            req.body.party,
            req.body.user,
        ];
        try{
            await db.query(text, values);
            const response = {
                status: 201,
                data: [{
                    office: req.params.id,
                    user: req.body.user,
                }],
            };
            return res.status(201).send(response);
        }catch(errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
};

export default Office;