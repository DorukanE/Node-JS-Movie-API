const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

//Find Top10 Films by imbd score
router.get('/top10', (req, res) =>{
  Movie.find({}, (err, data) =>{
    if(!data)
    res.json({message: 'Maalesef aradığınız film bulunamadı.'});
    if(err)
      res.json(err);
    
    res.json(data);
  }).limit(10).sort({imdb_score: -1});
});

//List Films and Directors
router.get('/', (req, res) =>{
  Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: {
        path: '$director',
        preserveNullAndEmptyArrays: true
      }
    }
  ], (err, data) =>{
    if(err)
      res.json(err);

    res.json(data);
  })
});

//Find Films by Id
router.get('/:movie_id', (req, res) =>{
  Movie.findById(req.params.movie_id, (err, data) =>{
    if(!data)
      res.json({message: 'Maalesef aradığınız film bulunamadı.'});
    if(err)
      res.json(err);

    res.json(data);
  });
});

//Update Films by Id
router.put('/:movie_id', (req, res) =>{
  Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true}, (err, data) =>{
    if(!data)
      res.json({message: 'Maalesef aradığınız film bulunamadı.'});
    if(err)
      res.json(err);
    
    res.json(data);
  });
});

//Remove Films by Id
router.delete('/:movie_id', (req, res) =>{
  Movie.findByIdAndRemove(req.params.movie_id, (err, data) =>{
    if(!data)
      res.json({message: 'Maalesef aradığınız film bulunamadı.'});
    if(err)
      res.json(err);
    
    res.json(data);
  });
});

//Find Films between two dates
router.get('/between/:start_year/:end_year', (req, res) =>{
  const {start_year, end_year} = req.params;
  Movie.find({
    year: {
      "$gte": parseInt(start_year), "$lte": parseInt(end_year)
    }
  }, (err, data) =>{
    if(!data)
    res.json({message: 'Maalesef aradığınız film bulunamadı.'});
    if(err)
      res.json(err);

    res.json(data);
  });
});

//Add Films
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
