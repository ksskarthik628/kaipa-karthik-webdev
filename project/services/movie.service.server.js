module.exports = function (app, models) {

    var movieModel = models.movieModel;

    app.post('/bbb/movie', addMovie);

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

};