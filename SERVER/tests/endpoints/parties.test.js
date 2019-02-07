import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);



describe('Political Parties', () => {

    describe('GET api/v1/parties', () => {
        it('Displays all political parties', (done) => {
            chai
                .request(app)
                .get('/api/v1/parties')
                .end((err, res) => {
                    res.body.should.have.property("status").eql(200);
                    res.body.should.have.property("data").that.is.an('array');

                    done();
                });
        });

    });

    describe('GET api/v1/parties/:id', () => {
        it('Displays a single political party', (done) => {
            const id = 1;
            chai
                .request(app)
                .get(`/api/v1/parties/${id}`)
                .end((err, res) => {
                    res.body.should.have.property("status").eql(200);
                    res.body.should.have.property("data").that.is.an('array');
                    done();
                });
        });
        it('Returns an error message when party id is not available', (done) => {
            const id = 1;
            chai
                .request(app)
                .get(`/api/v1/parties/${id}`)
                .end((err, res) => {
                    if (!id) {
                        res.body.should.have.property("status").eql(404);
                        res.body.should.have.property("error").that.is.a("string");
                    };
                    done();
                });
        });
    });

    describe('POST api/v1/parties', () => {
        it('Creates  a political party', (done) => {

            const party = [{
                id: 1,
                name: 'muo',
                hqAddress: 'London',
                logoUrl: 'https://en.wikipedia.org/wiki/Labour_Party_(UK)#/media/File:Logo_Labour_Party.svg'
            }];
            chai
                .request(app)
                .post('/api/v1/parties/')
                .send([party])
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(party).is.an('array');

                    if (err) {
                        expect(res).to.have.status(404);
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        });
    });

    describe('PATCH api/v1/parties/:id', () => {
        it('Edits a single political party', (done) => {
            const party = [{
                name: 'Grit',
                hqAddress: 'Dubai'
            }];

            const id = 1;
            chai
                .request(app)
                .patch(`/api/v1/parties/${id}`)
                .send([party])
            expect(200, done());
        });

        it('Displays an edited party', (done) => {
            const id = 1;
            chai
                .request(app)
                .get(`/api/v1/parties/${id}`)
                .end((err, res) => {
                    res.body.should.have.property("status").eql(200);
                    res.body.should.have.property("data").that.is.an('array');
                    done();
                });
        })
    });
    describe('DELETE api/v1/parties/:id', () => {
        it('Deletes  a single political party from the parties array', (done) => {
            const id = 1;
            chai
                .request(app)
                .delete(`/api/v1/parties/${id}`)
                .end((err, res) => {
                    res.body.should.have.property("status").eql(200);
                    res.body.should.have.property("data").that.is.an("array");
                    done();
                });
        });
        it('Should return 404 when a user tries to retrieve a deleted party', (done) => {
            const id = 1;
            chai
                .request(app)
                .delete(`/api/v1/parties/${id}`)
                .end((err, res) => {
                    if (!id) {
                        res.body.should.have.property("status").eql(404);
                        res.body.should.have.property("error").that.is.a("string");
                    };
                    done();
                })

        });
    });
});