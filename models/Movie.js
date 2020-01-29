const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        maxlength: [25, '{PATH} alanına maksimum {MAXLENGTH} değer girebilirsiniz.'],
        minlength: [1, '{PATH} alanına minimum {MINLENGTH} değer girebilirsiniz.']
    },
    category: {
        type: String,
        maxlength: [30, '{PATH} alanına maksimum {MAXLENGTH} değer girebilirsiniz.'],
        minlength: [1, '{PATH} alanına minimum {MINLENGTH} değer girebilirsiniz.']
    },
    country: {
        type: String,
        maxlength: [25, '{PATH} alanına maksimum {MAXLENGTH} değer girebilirsiniz.'],
        minlength: [1, '{PATH} alanına minimum {MINLENGTH} değer girebilirsiniz.']
    },
    year: {
        type: Number,
        max: 2020,
        min: 1910
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movies', MovieSchema);