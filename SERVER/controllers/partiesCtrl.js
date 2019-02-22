import partyValidator from '../helpers/partyValidator';


const Party = {
    async createParty(req, res) {


        // Validating Party  Data

        const {
            error
        } = partyValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        })

        const partyFinder = 'SELECT * FROM parties WHERE name=$1';
        const partyResult = await db.query(partyFinder, [req.body.name]);
        const partyDetails = partyResult.rows;
        if (partyDetails[0]) {
            return res.status(409).send({
                status: 409,
                error: 'Sorry, Political party name already taken',
            });
        }
        const text = 'INSERT INTO parties (name, hqaddress, logourl) VALUES ($1, $2, $3)';
        const values = [
            req.body.name,
            req.body.hqaddress,
            req.body.logourl,
        ];
        try {
            await db.query(text, values);
            const party = {
                status: 201,
                data: [{
                    name: req.body.name,
                    hqaddress: req.body.hqaddress,
                    logourl: req.body.logourl,
                }],
            };
            return res.status(201).send(party);
        } catch (errorMessage) {
            return res.status(400).send({
                status: 400,
                error: errorMessage
            });
        }
    },
    async getAllParties(req, res) {
        const partiesFinder = 'SELECT * FROM parties ORDER BY id DESC';
        try {
            const {
                rows
            } = await db.query(partiesFinder);
            const allParties = {
                status: 200,
                data: rows,
            };
            return res.send(getAllParties);
        } catch (error) {
            return res.status(400).send({
                status: 400,
                error
            });
        }
    },
    async getOneParty(req, res) {
        const text = 'SELECT * FROM parties  WHERE id = $1';
        try {
            const {
                rows
            } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({
                    status: 404,
                    error: `Party with ID ${req.params.id} is not found!`,
                });
            }
            const sinnglParty = {
                status: 200,
                data: rows[0],
            };
            return res.send(singleParty);
        } catch (error) {
            return res.status(400).send({
                status: 400,
                error,
            });
        }
    },
    async updateParty(req, res) {
        
         // Validation of  Data
         const {
            error
        } = partyValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        })
        const partyFinder = 'SELECT * FROM parties WHERE name=$1';
        const partyResult = await db.query(partyFinder, [req.body.name]);
        const partyData = partyResult.rows;
        if (partyData[0]) {
            return res.status(409).send({
                status: 409,
                error: 'Political party name already used',
            });
        }
        const text = 'UPDATE party SET name = $1';
        const values = [
            req.body.name,
        ];
        try {
            const partyFinder = 'SELECT * FROM party WHERE id=$1';
            const singlepartyResult = await db.query(partyFinder, [req.params.id]);
            const singlepartyData = singlepartyResult.rows;
            if (!singlepartyData[0]) {
                return res.status(404).send({
                    status: 404,
                    error: 'Party with given ID was not found',
                });
            }

            await db.query(text, values);
            const response = {
                status: 200,
                data: [{
                    name: req.body.name,
                    hqaddress: singlepartyData[0].hqaddress,
                    logourl: singlepartyData[0].logourl,
                }],
            };
            return res.send(response);
        } catch (errorMessage) {
            return res.status(400).send({
                status: 400,
                error: errorMessage,
            });
        }
    },
    async deleteParty(req, res) {


        const text = 'DELETE FROM parties WHERE id = $1;';
        try {
            const partyFinder = 'SELECT * FROM parties WHERE id=$1';
            const singlepartyResult = await db.query(partyFinder, [req.params.id]);
            const singlepartyData = singlepartyResult.rows;
            if (!singlepartyData[0]) {
                return res.status(404).send({
                    status: 404,
                    error: `Party with that ID ${req.params.id} not found!`,
                });
            }
            await db.query(text, [req.params.id]);
            const response = {
                status: 200,
                message: 'Party was deleted successfully!',
            };
            return res.send(response);
        } catch (errorMessage) {
            return res.status(400).send({
                status: 400,
                error: errorMessage,
            });
        }
    },
};

export default Party;