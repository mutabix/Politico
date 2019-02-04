import chai  from 'chai'; 
import chaiHttp from 'chai-http'; 
import app from '../../server' ;


const should = chai.should(); 
const expect = chai.expect;
chai.use(chaiHttp); 



describe('Offices', ()=>{

    it('Displays all Government Offices', (done)=>{
        chai 
        .request(app) 
        .get('/api/v1/offices')
        .end((err, res) =>{
            res.body.should.have.property("status").eql(200);
            res.body.should.have.property("data").that.is.an('array');

            done();
        });
    });  


});