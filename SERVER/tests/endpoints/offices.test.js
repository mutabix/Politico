import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);



describe('Offices', () => {

    describe('POST api/v1/offices', () => {
        it('Creates  a government office', (done) => {

            const office = {
                type: 'state',
                name: 'Secretary',
            };

            chai
                .request(app)
                .post('/api/v1/offices')
                .send(office)
                .end((err, res) => {
                    res.body.status.should.be.eql(201);
                    expect(office).is.an('object');

                    if (err) {
                        expect(res).to.have.status(404)
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        });
    });

    describe('GET /api/v1/offices', () => {
        it('Displays all Government Offices', (done) => {
            chai
                .request(app)
                .get('/api/v1/offices')
                .end((err, res) => {
                    res.body.should.have.property("status").eql(200);
                    res.body.should.have.property("data").that.is.an('array');
                    done();
                });
        });
    });

    describe('GET /api/v1/offices/:id', () => {
        it('Displays a single Government Offices', (done) => {
            const id = 1;
            chai
                .request(app)
                .get(`/api/v1/offices/${id}`)
                .end((err, res) => {
                    res.body.should.have.property("status").eql(200);
                    res.body.should.have.property("data").that.is.an('array');

                    done();
                });
        });

        it('Returns an error message when there\'s no office id', (done) => {
            const id = 1;
            chai
                .request(app)
                .get(`/api/v1/offices/${id}`)
                .end((err, res) => {
                    if (!id) {
                        res.body.should.have.property("status").eql(404);
                        res.body.should.have.property("error").that.is.a("string");
                    }
                    done();
                });
        });
    });

    describe('Send GET request to wrong path', () => {
        it('Should notify the client when the path is incorrect', (done) => {

            chai
                .request(app)
                .get('/*')
                .end((err, res) => {
                    expect(res.body.status).to.be.eql(404);
                    expect(res.body.message).to.be.eql('Wrong Url or HTTP Request!');
                    done();
                });

        });
    });

});