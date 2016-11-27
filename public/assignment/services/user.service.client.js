(function () {
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);

    function UserService($http) {

        var url = "/api/user";

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register
        };
        return api;

        function createUser(user) {
            return $http.post(url, user);
        }

        function findUserById(userId) {
            return $http.get(url + "/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get(url + "?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get(url + "?username=" + username + "&password=" + password);
        }

        function updateUser(userId, user) {
            return $http.put(url + "/" + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete(url + "/" + userId);
        }

        function login(user) {
            var url = "/api/login";
            return $http.post(url, user);
        }
        
        function logout() {
            var url = "/api/logout";
            return $http.post(url);
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }

    }
})();