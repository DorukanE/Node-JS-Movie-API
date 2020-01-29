const express = require('express');
const router = express.Router();
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/authenticate', (req, res) =>{
  const {username, password} = req.body;

  User.findOne({
    username
  }, (err, user) =>{
    if(err)
      res.json(err);
    if(!user){
      res.json({status: false, message: 'Maalesef aradığınız kullanıcı bulunamadı.'});
    }
    else{
      bcrpyt.compare(password, user.password).then((result) =>{
        if(!result){
          res.json({status: false, message: 'Maalesef girdiğiniz şifre yanlış.'});
        }
        else{
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('secret_api_key'), {
            expiresIn: 720 //12 saat
          });
          
          res.json({status: 'true', token});
        }
      });
    }
  });
});

module.exports = router;
