module.exports = function () {

    var mongoose = require('mongoose');
    var MovieSchema = mongoose.Schema({
        movieId: Number,
        title: String,
        imageUrl: String
    }, {collection: 'bbb.movie'});
    return MovieSchema;

};