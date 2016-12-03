module.exports = function (app, models) {

    var movieModel = models.movieModel;

    app.post('/bbb/movie', addMovie);
    app.delete('/bbb/movie/mid/:mid', deleteMovieById);
    app.delete('/bbb/movie/:movieId', deleteMovieByMovieId);

    function addMovie(req, res) {
        var movie = req.body;
        movieModel
            .addMovie(movie)
            .then(function (movie) {
                res.json(movie);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function deleteMovieById(req, res) {
        var mid = req.params['mid'];
        movieModel
            .deleteMovieById(mid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }

    function deleteMovieByMovieId(req, res) {
        var movieId = req.params['movieId'];
        movieModel
            .deleteMovieByMovieId(movieId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }

};