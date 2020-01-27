const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

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
