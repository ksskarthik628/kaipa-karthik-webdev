(function () {
    
    angular
        .module('BBBApp')
        .controller('LikesController', LikesController);
    
    function LikesController($q, $stateParams, UserService, MovieService) {

        var vm = this;
        vm.navUserId = $stateParams.userId;

        vm.like = like;
        vm.unlike = unlike;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findAllLikedMovies(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var movies = response.data;
                    if (movies) {

                        isMovieLiked(movies);

                        UserService
                            .findUserById(vm.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navUser = user;
                                }
                            });
                    }
                });
        }
        init();
        
        function isMovieLiked(movies) {
            UserService
                .findUserById(vm.user._id)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;

                        movies.forEach(function (element, index, array) {
                            if (vm.user.likes.indexOf(element._id) > -1) {
                                element.isLiked = true;
                            }
                            else {
                                element.isLiked = false;
                            }
                        });

                        vm.movies = movies;
                    }
                });
        }

        function like(index) {
            var movieId = vm.movies[index]._id;
            UserService
                .like(vm.user._id, movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.movies[index].isLiked = true;
                });
        }

        function unlike(index) {
            var movieId = vm.movies[index]._id;
            UserService
                .unlike(vm.user._id, movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.movies[index].isLiked = false;
                });
        }

    }
    
})();