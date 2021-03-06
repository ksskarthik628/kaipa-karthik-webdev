(function () {

    angular
        .module('BBBApp')
        .config(configuration);
    
    function configuration($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when("/details/", "/home/popular")
            .when("/home", "/home/popular")
            .otherwise("/home/popular");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "homeControllerModel",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state("home.result", {
                url: "/result/:movieTitle",
                templateUrl: "views/home/home-result.view.client.html",
                controller: "HomeResultController",
                controllerAs: "homeResultControllerModel",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state("home.popular", {
                url: "/popular",
                templateUrl: "views/home/home-popular.view.client.html",
                controller: "HomePopularController",
                controllerAs: "homePopularControllerModel",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state("details", {
                url: "/details/:movieId",
                templateUrl: "views/details/details.view.client.html",
                controller: "DetailsController",
                controllerAs: "detailsControllerModel",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state("login", {
                url: "/login",
                templateUrl: "views/user/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "loginControllerModel"
            })
            .state("register", {
                url: "/register",
                templateUrl: "views/user/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "registerControllerModel"
            })
            .state("profile", {
                url: "/profile",
                templateUrl: "views/user/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "profileControllerModel",
                params: {
                    userId: null
                },
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .state("profile.edit-profile", {
                url: "/:userId/edit-profile",
                templateUrl: "views/user/profile/edit-profile.view.client.html",
                controller: "EditProfileController",
                controllerAs: "editProfileControllerModel",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .state("profile.followers", {
                url: "/:userId/followers",
                templateUrl: "views/user/profile/followers.view.client.html",
                controller: "FollowersController",
                controllerAs: "followersControllerModel"
            })
            .state("profile.following", {
                url: "/:userId/following",
                templateUrl: "views/user/profile/following.view.client.html",
                controller: "FollowingController",
                controllerAs: "followingControllerModel"
            })
            .state("profile.reviews", {
                url: "/:userId/reviews",
                templateUrl: "views/user/profile/reviews.view.client.html",
                controller: "ReviewsController",
                controllerAs: "reviewsControllerModel"
            })
            .state("profile.likes", {
                url: "/:userId/likes",
                templateUrl: "views/user/profile/likes.view.client.html",
                controller: "LikesController",
                controllerAs: "likesControllerModel"
            })
            .state("admin", {
                url: "/admin",
                templateUrl: "views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "adminControllerModel",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })

    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                UserService.setCurrentUser(user);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $state) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                if (user) {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $state.go("home");
                }
            });
        return deferred.promise;
    }

    function checkAdmin(UserService, $q, $state) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;

                if (user) {
                    if (user != null && user.role == 'admin') {
                        UserService.setCurrentUser(user);
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                        $state.go("home");
                    }
                }
                else {
                    deferred.reject();
                    $state.go("home");
                }
            });

        return deferred.promise;
    }

})();