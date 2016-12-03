module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var ReviewSchema = require('./review.schema.server')();
    var Review = mongoose.model('Review', ReviewSchema);

    var api = {
        addReview: addReview,
        findAllReviewsForMovieId: findAllReviewsForMovieId,
        findAllReviewsForId: findAllReviewsForId,
        findAllReviewsForUserId: findAllReviewsForUserId,
        FindReviewById: findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function addReview(userId, mid, movieId, review) {
        review._user = userId;
        review._movie = mid;
        review.movieId = movieId;
        return Review.create(review);
    }

    function findAllReviewsForMovieId(movieId) {
        return Review.find({movieId: movieId});
    }
    
    function findAllReviewsForId(mid) {
        return Review.find({_movie: mid});
    }
    
    function findAllReviewsForUserId(userId) {
        return Review.find({_user: userId});
    }
    
    function findReviewById(reviewId) {
        return Review.findById(reviewId);
    }
    
    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = Date.now();
        return Review.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return Review.remove({_id: reviewId});
    }

};