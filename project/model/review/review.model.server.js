module.exports = function (mongoose) {

    var ReviewSchema = require('./review.schema.server')(mongoose);
    var BBBReview = mongoose.model('BBBReview', ReviewSchema);

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

    function addReview(userId, mid, review) {
        review._user = userId;
        review.movieId = mid;
        return BBBReview.create(review);
    }

    function findAllReviewsForMovieId(movieId) {
        return BBBReview.find({movieId: movieId});
    }
    
    function findAllReviewsForId(mid) {
        return BBBReview.find({movieId: mid});
    }
    
    function findAllReviewsForUserId(userId) {
        return BBBReview.find({_user: userId});
    }
    
    function findReviewById(reviewId) {
        return BBBReview.findById(reviewId);
    }
    
    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = Date.now();
        return BBBReview.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return BBBReview.remove({_id: reviewId});
    }

};