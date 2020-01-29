const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;
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
                    movieId = res.body._id;
                    done();
                });
        });
    });

    describe('List movie', () =>{
        it('(GET /) list movie by id', (done) =>{
            chai.request(server)
                .get('/api/movies/' + movieId)
                .send(movieId)
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
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

    describe('PUT movie', () =>{
        it('(PUT /) update movies', (done) =>{
            const movies = {
                title: 'Yahşi Batı',
                director_id: '5e30b3acbe85630d5040a574',
                category: 'Komedi',
                country: 'Türkiye',
                year: 2011,
                imdb_score: 7.4
            };
            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movies)
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movies.title);
                    res.body.should.have.property('director_id').eql(movies.director_id);
                    res.body.should.have.property('category').eql(movies.category);
                    res.body.should.have.property('country').eql(movies.country);
                    res.body.should.have.property('year').eql(movies.year);
                    res.body.should.have.property('imdb_score').eql(movies.imdb_score);
                    movieId = res.body._id;
                    done();
                });
        });
    });

    describe('DELETE movie', () =>{
        it('(DELETE /) movies by Id', (done) =>{
            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('1');
                    movieId = res.body._id;
                    done();
                });
        });
    });
});
