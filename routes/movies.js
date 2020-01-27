const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/:movie_id', (req, res) =>{
  Movie.findById(req.params.movie_id, (err, data) =>{
    if(!data)
      res.json({message: 'Maalesef aradığınız film bulunamadı.'});
    if(err)
      res.json(err);

    res.json(data);
  });
});

router.get('/', (req, res) =>{
  Movie.find({}, (err, data) =>{
    if(err)
      res.json(err);

    res.json(data);
  });
});

router.post('/', (req, res, next) => {
  /*const data = req.body.title;
  res.send(data);*/
  //const {title, category, country, year, imdb_score} = req.body;

  const movie = new Movie(req.body);

  movie.save((err, data) =>{
    if(err)
      res.json(err)

    res.json(data);
  });
});

module.exports = router;
