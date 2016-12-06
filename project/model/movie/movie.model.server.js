module.exports = function (mongoose) {

    var MovieSchema = require('./movie.schema.server')(mongoose);
    var BBBMovie = mongoose.model('BBBMovie', MovieSchema);

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
        movie.movieId = movie.id.toString();
        return BBBMovie.create(movie);
    }
    
    function findMovieById(id) {
        return BBBMovie.findById(id);
    }

    function findMovieByMovieId(movieId) {
        return BBBMovie.findOne({movieId: movieId});
    }
    
    function findAllLikedMovies(movieIds) {
        return BBBMovie.find({movieId: {$in: movieIds}});
    }

    function deleteMovieById(id) {
        return BBBMovie.remove({_id: id});
    }

    function deleteMovieByMovieId(movieId) {
        return BBBMovie.remove({movieId: movieId});
    }

};