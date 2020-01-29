const express = require('express');
const router = express.Router();
const bcrpyt = require('bcryptjs');

//Models
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const {username, password} = req.body;

  bcrpyt.hash(password, 10).then((hash) =>{
    const user = new User({
      username,
      password: hash
    });
  
    user.save((err, data) =>{
      if(err)
        res.json(err);
  
      res.json(data);
    });
  });
});
module.exports = router;
