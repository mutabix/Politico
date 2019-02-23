import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('User Authentication', () => {
    describe('Signup a new user', () => {
        it('Should sign up a new user', (done) => {
            const user = {
                firstname: 'moise',
                lastname: 'rwibutso', 
                middlename: 'moy', 
                phonenumber: '087889977',
                email: 'moise.rwibu@gmail.com',
                passport:'https://images-na.ssl-images-amazon.com/images/I/616ng1eIi1L._SX466_.jpg', 
                password: '5555555',
                isadmin: true,
            };
            chai
                .request(app)
                .post('/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.body.status.should.be.eql(201);
                    expect(user).is.an('object');

                    if (err) {
                        expect(res).to.have.status(404);
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        })
    }); 

    describe('Send GET request to wrong Url', () => {
        it('Should notify the client when the path is incorrect', (done) => {

            chai
                .request(app)
                .get('/fxd/hy')
                .end((err, res) => {
                    expect(res.body.status).to.be.eql(404);
                    expect(res.body.message).to.be.eql('Wrong Url or HTTP Request!');
                    done();
                });

        });
    });



})