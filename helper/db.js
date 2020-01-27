const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb+srv://dorukan:2931207@movie-api-ocvwn.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connection.on('open', () =>{
        console.log("MongoDB bağlantısı kuruldu.");
    });

    mongoose.connection.on('error', (err) =>{
        console.log("MongoDB bağlantısı başarısız", err);
    });
}