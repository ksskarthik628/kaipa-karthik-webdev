module.exports = function (app, models) {

    var movieModel = models.movieModel;
    var reviewModel = models.reviewModel;

    var bluebird = require('bluebird');

    app.post('/bbb/user/:uid/movie/:mid', addReview);
    app.get('/bbb/movie/:mid/reviews', findAllReviewsForMovieId);
    app.get('/bbb/user/:uid/reviews', findAllReviewsForUserId);
    app.put('/bbb/review/:rid', updateReview);
    app.delete('/bbb/review/:rid', deleteReview);

    function addReview(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        var review = req.body;
        reviewModel
            .addReview(userId, mid, review)
            .then(function (review) {
                res.json(review);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllReviewsForMovieId(req, res) {
        var mid = req.params['mid'];
        reviewModel
            .findAllReviewsForMovieId(mid)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllReviewsForUserId(req, res) {
        var userId = req.params['uid'];
        reviewModel
            .findAllReviewsForUserId(userId)
            .then(function (reviews) {
                var promiseArray = [];
                var result = [];
                reviews.forEach(function (review, index, array) {
                    promiseArray
                        .push(movieModel
                            .findMovieByMovieId(review.movieId)
                            .then(function (movie) {
                                if (movie) {
                                    review.movie = movie;
                                    result.push(review);
                                }
                            }, function (err) {
                                console.log(err);
                            }));
                });
                bluebird
                    .all(promiseArray)
                    .then(function () {
                        res.json(result);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params['rid'];
        var review = req.body;
        reviewModel
            .updateReview(reviewId, review)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params['rid'];
        reviewModel
            .deleteReview(reviewId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }

};