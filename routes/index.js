const express = require('express');
const router = express.Router();

//Models
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const {username, password} = req.body;
  const user = new User({
    username,
    password
  });

  user.save((err, data) =>{
    if(err)
      res.json(err);

    res.json(data);
  });
});

module.exports = router;
