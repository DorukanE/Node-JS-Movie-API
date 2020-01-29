const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

//Add new Director
router.post('/', (req, res, next) => {
    const director = new Director(req.body);

    director.save((err, data) =>{
      if(err)
        res.json(err);
      
      res.json(data);
    });
});

//List Directors and their Films
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

//List Directors and their Films by Director Id
router.get('/:director_id', (req, res) =>{
  Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
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

//Update Directors by Id
router.put('/:director_id', (req, res) =>{
  Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true}, (err, data) =>{
    if(!data)
      res.json({message: 'Maalesef aradığınız yönetmen bulunamadı.'});
    if(err)
      res.json(err);
    
    res.json(data);
  });
});

//Remove Directors by Id
router.delete('/:director_id', (req, res) =>{
  Director.findByIdAndRemove(req.params.director_id, (err, data) =>{
    if(!data)
      res.json({message: 'Maalesef aradığınız film bulunamadı.'});
    if(err)
      res.json(err);
    
    res.json(data);
  });
});

module.exports = router;
