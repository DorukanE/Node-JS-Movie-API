const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, director_id;
describe('/api/directors test', () =>{
    before((done) =>{
        chai.request(server)
            .post('/authenticate')
            .send({username: 'doruk', password: '12345'})
            .end((err, res) =>{
                token = res.body.token
                done();
            });
    });

    describe('POST add director', () =>{
        it('(POST /) director test', (done) =>{
            const directors = {
                name: 'ahmetcan',
                surname: 'varlı',
                bio: 'lorem ipsum'
            }
            chai.request(server)
                .post('/api/directors')
                .send(directors)
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(directors.name);
                    res.body.should.have.property('surname').eql(directors.surname);
                    res.body.should.have.property('bio').eql(directors.bio);
                    director_id = res.body._id;
                    done();
                });
        });
    });

    describe('GET list directors', () =>{
        it('(GET / ) list directors and their films', (done) =>{
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('GET list directors', () =>{
        it('(GET /) list directors by Id', (done) =>{
            chai.request(server)
                .get('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('PUT director', () =>{
        it('(PUT /) update directors', (done) =>{
            const director = {
                name: 'Dorukan',
                surname: 'Eskiçeri',
                bio: 'HFTTF'
            };
            chai.request(server)
                .put('/api/directors/' + director_id)
                .send(director)
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    director_id = res.body._id;
                    done();
                });
        });
    });

    describe('DELETE director', () =>{
        it('(DELETE /) directors by Id', (done) =>{
            chai.request(server)
                .delete('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('1');
                    done();
                });
        });
    });
});

