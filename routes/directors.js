const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
    const director = new Director(req.body);

    director.save((err, data) =>{
      if(err)
        res.json(err);
      
      res.json(data);
    });
});

router.get('/', (req, res) =>{
  Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'Movies'
      }
    },
    {
      $unwind: {
        path: '$Movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$Movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ], (err, data) =>{
    if(err)
      res.json(err);

    res.json(data);
  });
});

module.exports = router;
