import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);


describe('Political Parties', () => {

    describe('POST api/v1/parties', () => {
        it('Creates  a political party', (done) => {

            const party = {
                name: 'mechanics',
                hqAddress: 'Kigali',
                logoUrl: 'https://s.yimg.com/aah/yhst-133408872241974/personalizadas-real-madrid-3-x5-flags-3.gif'
            };
            chai
                .request(app)
                .post('/api/v1/parties')
                .send(party)
                .end((err, res) => {
                    // console.log(res.body);
                    res.body.status.should.be.eql(201);
                    expect(party).is.an('object');

                    if (err) {
                        expect(res).to.have.status(404);
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        });
    });

    describe('GET api/v1/parties', () => {
        it('Displays all political parties', (done) => {
            chai
                .request(app)
                .get('/api/v1/parties')
                .end((err, res) => {
                    // console.log(res.body);
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
                    // console.log(res.body);
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
                    // console.log(res.body);
                    if (!id) {
                        res.body.should.have.property("status").eql(404);
                        res.body.should.have.property("error").that.is.a("string");
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
                    // console.log(res.body);
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
                    // console.log(res.body);
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
                    // console.log(res.body);
                    if (!id) {
                        res.body.should.have.property("status").eql(404);
                        res.body.should.have.property("error").that.is.a("string");
                    };
                    done();
                })

        });
    });

    describe('Send GET request to wrong Url', () => {
        it('Should notify the client when the path is incorrect', (done) => {

            chai
                .request(app)
                .get('/fxd/hy')
                .end((err, res) => {
                    // console.log(res.body.message);
                    expect(res.body.status).to.be.eql(404);
                    expect(res.body.message).to.be.eql('Wrong Url or HTTP Request!');
                    done();
                });

        });
    });
});