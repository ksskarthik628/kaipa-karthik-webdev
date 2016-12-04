(function () {

    angular
        .module('BBBApp')
        .factory('UserService', UserService);

    function UserService($rootScope, $http) {

        var api = {
            createUserByAdmin: createUserByAdmin,
            deleteUserByAdmin: deleteUserByAdmin,
            findAllUsersForAdmin: findAllUsersForAdmin,
            updateUserByAdmin: updateUserByAdmin,

            deleteUserById: deleteUserById,
            findAllFollowingUsers: findAllFollowingUsers,
            findAllFollowers: findAllFollowers,
            findAllLikedMovies: findAllLikedMovies,
            findUserById: findUserById,
            follow: follow,
            getCurrentUser: getCurrentUser,
            isFollowing: isFollowing,
            isLiked: isLiked,
            like: like,
            login: login,
            logout: logout,
            register: register,
            setCurrentUser: setCurrentUser,
            unfollow: unfollow,
            unlike: unlike,
            updateUser: updateUser
        };
        return api;
        
        function createUserByAdmin(user) {
            var url = "/bbb/admin/user";
            return $http.post(url, user);
        }

        function deleteUserByAdmin(userId) {
            var url = "/bbb/admin/user/" + userId;
            return $http.delete(url);
        }

        function findAllUsersForAdmin() {
            var url = "/bbb/admin/users";
            return $http.get(url);
        }

        function updateUserByAdmin(userId, user) {
            var url = "/bbb/admin/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUserById(userId) {
            var url = "/bbb/user/" + userId;
            return $http.delete(url);
        }

        function findAllFollowingUsers(userId) {
            var url = "/bbb/user/" + userId + "/following";
            return $http.get(url);
        }

        function findAllFollowers(userId) {
            var url = "/bbb/user/" + userId + "/followers";
            return $http.get(url);
        }

        function findAllLikedMovies(userId) {
            var url = "/bbb/user/" + userId + "/likes";
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/bbb/user/" + userId;
            return $http.get(url);
        }

        function follow(userId, followId) {
            var url = "/bbb/user/" + userId + "/follow/" + followId;
            return $http.put(url);
        }

        function getCurrentUser() {
            var url = "/bbb/loggedin";
            return $http.get(url);
        }
        
        function isFollowing(userId, followId) {
            var url = "/bbb/user/" + userId + "/isfollowing/" + followId;
            return $http.get(url);
        }
        
        function isLiked(userId, movieId) {
            var url = "/bbb/user/" + userId + "/movie/" + movieId + "/isLiked";
            return $http.get(url);
        }
        
        function like(userId, movieId) {
            var url = "/bbb/user/" + userId + "/movie/" + movieId + "/like";
            return $http.put(url);
        }
        
        function login(user) {
            var url = "/bbb/login";
            return $http.post(url, user);
        }
        
        function logout() {
            var url = "/bbb/logout";
            return $http.post(url);
        }
        
        function register(user) {
            var url = "/bbb/register";
            return $http.post(url, user);
        }
        
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function unfollow(userId, unfollowId) {
            var url = "/bbb/user/" + userId + "/unfollow/" + unfollowId;
            return $http.put(url);
        }

        function unlike(userId, movieId) {
            var url = "/bbb/user/" + userId + "/movie/" + movieId + "/unlike";
            return $http.put(url);
        }

        function updateUser(userId, user) {
            var url = "/bbb/user/" + userId;
            return $http.put(url, user);
        }

    }

})();