module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var MovieSchema = require('./movie.schema.server')();
    var Movie = mongoose.model('Movie', MovieSchema);

    var api = {
        addMovie: addMovie,
        findMovieById: findMovieById,
        findMovieByMovieId: findMovieByMovieId,
        findAllLikedMovies: findAllLikedMovies,
        deleteMovieById: deleteMovieById,
        deleteMovieByMovieId: deleteMovieByMovieId
    };
    return api;

    function addMovie(movie) {
        return Movie.create(movie);
    }
    
    function findMovieById(id) {
        return Movie.findById(id);
    }

    function findMovieByMovieId(movieId) {
        return Movie.findOne({movieId: movieId});
    }
    
    function findAllLikedMovies(movieIds) {
        return Movie.find({movieId: {$in: movieIds}});
    }

    function deleteMovieById(id) {
        return Movie.remove({_id: id});
    }

    function deleteMovieByMovieId(movieId) {
        return Movie.remove({movieId: movieId});
    }

};