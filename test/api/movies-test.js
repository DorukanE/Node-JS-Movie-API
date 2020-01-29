const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;
describe('/api/movies tests', () =>{
    before((done) =>{
        chai.request(server)
            .post('/authenticate')
            .send({username: 'doruk', password: '12345'})
            .end((err, res) =>{
                token = res.body.token;
                done();
            })
    });
    describe('/movies test', () =>{
        it('(GET /) movies', (done) =>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('POST movie', () =>{
        it('(POST /) add movies', (done) =>{
            const movies = {
                title: 'Udemy',
                director_id: '5e30b3acbe85630d5040a584',
                category: 'Komedi',
                country: 'Türkiye',
                year: 1996,
                imdb_score: 8.5
            };
            chai.request(server)
                .post('/api/movies')
                .send(movies)
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    done();
                });
        });
    });
});
