/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(token)
    {
        jwt.verify(token, req.app.get('secret_api_key'), (err, decoded) =>{
            if(err)
                res.json({status: false, message: 'Maalesef girdiğiniz token geçerli değil.'});
            else
            {
                req.decoded = decoded;
                next();
            }
        });
    }
    else
    {
        res.json({status: false, message: 'Maalesef kullanıcı tokeni bulunamadı.'});
    }
}*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(token)
    {
        jwt.verify(token, req.app.get('secret_api_key'), (err, decoded) =>{
            if(err)
                res.json({status: false, message: 'Maalesef girdiğiniz token geçerli değil.'});
            else
            {
                req.decoded = decoded;
                next();
            }
        });
    }
    else
    {
        res.json({status: false, message: 'Maalesef kullanıcı tokeni bulunamadı.'});
    }
};