(function () {

    angular
        .module('BBBApp')
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {

        var api = {
            addReview: addReview,
            deleteReview: deleteReview,
            findAllReviewsForMovieId: findAllReviewsForMovieId,
            findAllReviewsForUserId: findAllReviewsForUserId,
            updateReview: updateReview
        };
        return api;
        
        function addReview(userId, movieId, review) {
            var url = "/bbb/user/" + userId + "/movie/" + movieId;
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/bbb/review/" + reviewId;
            return $http.delete(url);
        }
        
        function findAllReviewsForMovieId(movieId) {
            var url = "/bbb/movie/" + movieId + "/reviews";
            return $http.get(url);
        }

        function findAllReviewsForUserId(userId) {
            var url = "/bbb/user/" + userId + "/reviews";
            return $http.get(url);
        }
        
        function updateReview(reviewId, review) {
            var url = "/bbb/review/" + reviewId;
            return $http.put(url, review);
        }

    }

})();