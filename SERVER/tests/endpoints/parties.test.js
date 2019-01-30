import chai  from 'chai'; 
import chaiHttp from 'chai-http'; 
import app from '../../server' ;


const should = chai.should(); 
const expect = chai.expect;
chai.use(chaiHttp); 



describe('Political Parties', ()=>{

    // it('It shoud fail to display political parties', (done)=>{
    //     chai 
    //     .request(app) 
    //     .get('/api/v1/parties')
    //     .end((err, res) =>{
    //         res.body.should.have.property("success").eql(200); 
    //          res.body.should.have.property("data").that.is.an("object");
    //         done();
    //     });
    // });

    it('Displays all political parties', (done)=>{
        chai 
        .request(app) 
        .get('/api/v1/parties')
        .end((err, res) =>{
            res.body.should.have.property("status").eql(200);
            res.body.should.have.property("data").that.is.an('array');

            done();
        });
    });  


});